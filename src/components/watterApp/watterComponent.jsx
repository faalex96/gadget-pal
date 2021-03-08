import { useEffect, useState } from "react";
import { checkItem } from "../birthdayApp/birthdayComponent";
import { Bar } from "react-chartjs-2";
import "./waterApp.css";

// function retrives data from localStorage
// this data is used for bar chart
function retriveData() {
  let dataSet = [];
  let dataLabels = [];
  if (!checkItem("watterData")) {
    const wData = JSON.parse(window.localStorage.getItem("watterData"));
    for (let item of wData) {
      dataSet.push(item["glassesNum"]);
      dataLabels.push(item["date"]);
    }
    if (dataSet.length <= 5) {
      return [dataSet, dataLabels];
    } else {
      return [dataSet.slice(-5), dataLabels.slice(-5)];
    }
  }
  return [null, null];
}

// Function for creating data and push new item
// to array if its a new day
function manipulateData(manipulationType) {
  let watterItem = {
    glassesNum: 0,
    date: new Date().toDateString(),
    id: new Date().getTime(),
  };

  let watterData;

  switch (manipulationType) {
    case "update":
      watterData = JSON.parse(window.localStorage.getItem("watterData"));
      watterData.push(watterItem);
      break;
    case "create":
      watterData = [watterItem];
      break;
  }
  window.localStorage.setItem("watterData", JSON.stringify(watterData));
}

// WatterIntake is a component which when it gets mounted
// check if there is an array watterData in localStorage
// if there isn't it will create one otherwise
// it will update existing array
function WatterIntake() {
  const [glassesNum, setGlassesNum] = useState(0);
  const today = new Date().toDateString();

  useEffect(() => {
    let lastItem;
    if (checkItem("watterData")) {
      manipulateData("create");
    } else {
      let wd = JSON.parse(window.localStorage.getItem("watterData"));
      lastItem = wd[wd.length - 1];
      if (lastItem.date !== today) {
        manipulateData("update");
        setGlassesNum(0);
      } else {
        setGlassesNum(lastItem.glassesNum);
      }
    }
  }, []);

  // Handles clicking + and - buttons for glass number
  const handleGlassesNum = (e) => {
    let watterData;
    if (!checkItem("watterData")) {
      watterData = JSON.parse(window.localStorage.getItem("watterData"));

      let lastItem = watterData[watterData.length - 1];

      if (lastItem.date === today) {
        if (e.target.id === "add-glass") {
          lastItem.glassesNum++;
          setGlassesNum(lastItem.glassesNum);
        } else {
          if (lastItem.glassesNum > 0) {
            lastItem.glassesNum--;
            setGlassesNum(lastItem.glassesNum);
          }
        }
      }
      window.localStorage.setItem("watterData", JSON.stringify(watterData));
    }
  };

  return (
    <div className="watter-app">
      <div className="watter-intake">
        <p>Water</p>
        <p>Glasses {glassesNum}</p>
        <button type="button" id="add-glass" onClick={handleGlassesNum}>
          +
        </button>
        <button type="button" id="sub-glass" onClick={handleGlassesNum}>
          -
        </button>
      </div>
      <div className="chart">
        <div className="wrapper">
          <Bar
            data={{
              datasets: [
                {
                  data: retriveData()[0],
                  backgroundColor: "rgba(124, 190, 235,1)",
                  label: "glasses",
                },
              ],
              labels: retriveData()[1],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              title: {
                display: true,
                text: "Water intake",
                fontSize: 20,
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      suggestedMin: 0,
                      suggestedMax: 10,
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WatterIntake;
