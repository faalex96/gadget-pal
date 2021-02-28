import { useState } from "react";
import "./App.css";
import "./components/gContainer.css";
import "react-calendar/dist/Calendar.css";
import GadgetContainer from "./components/gadgetContainer";
import WheatherComponent from "./components/weatherApp/wheaterComponent";
import Calculator from "./components/currencyApp/currencyComponent";
import BirthdayComponent from "./components/birthdayApp/birthdayComponent";
import QuoteComponent from "./components/quoteApp/quoteComponent";
import WatterIntake from "./components/watterApp/watterComponent";
import ToDoComponent from "./components/todoApp/todoComponent";
import Banner from "./components/banner";
import BurgerMenu from "./components/burgerMenu/burgerMenu";
import SideBar from "./components/sideBar/sideBar";

const apps = [
  {
    birthday: <BirthdayComponent />,
    title: "Birthday",
    note: "Congratulate birthday to your friends",
    id: "birthday",
  },
  {
    weather: <WheatherComponent />,
    title: "Weather",
    note: "Check out the weather",
    id: "weather",
  },
  {
    currency: <Calculator />,
    title: "Currency",
    note: "Should you invest?r",
    id: "currency",
  },
  {
    quote: <QuoteComponent />,
    title: "Inspiring Quote",
    note: "Get inspired",
    id: "quote",
  },
  {
    water: <WatterIntake />,
    title: "Water Intake",
    note: "Track your water intake",
    id: "water",
  },
  {
    todo: <ToDoComponent />,
    title: "Todo ",
    note: "Write down your chores",
    id: "todo",
  },
];

function App() {
  const [clickBurger, setClickBurger] = useState("");
  const [app, setApp] = useState("birthday");

  const handleClickBurger = () => {
    setClickBurger("acitve");
  };

  const handleClick = (e) => {
    setApp(e.target.id);
  };

  const handleClose = () => {
    setClickBurger("");
  };

  const currentApp = apps.find((item) => {
    return item.id === app;
  });

  return (
    <div className="App">
      <Banner purpose={"header"} />
      <BurgerMenu handleClick={handleClickBurger} />
      <GadgetContainer
        title={currentApp["title"]}
        note={currentApp["note"]}
        apps={apps}
        handleClick={handleClick}
        activity={clickBurger}
      >
        {currentApp[app]}
      </GadgetContainer>

      <Banner purpose={"footer"} />
    </div>
  );
}

export default App;
