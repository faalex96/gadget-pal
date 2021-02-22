import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";

// configuration for confetti
const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 1500,
  stagger: 3,
  decay: 0.87,
};

// Check if there is an item in localStorage
function checkItem(itemKey) {
  return window.localStorage.getItem(itemKey) === null;
}

// Component that renders inputs for first and last name
// and date selection calendar
function AddBirthday(props) {
  const handleSubmit = (e) => {
    props.handleSubmitForm(e);
  };

  return (
    <div
      className="add-birhtday"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          First name:
          <input
            type="text"
            value={props.firstName}
            id="first-name"
            onChange={props.handleNChange}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            value={props.lastName}
            id="last-name"
            onChange={props.handleNChange}
          />
        </label>
        <Calendar onChange={props.handleCalendarChange} value={props.value} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

// Displays todays birthdays
function DisplayBirthday(props) {
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    setConfetti(true);
  }, []);

  return (
    <div className="birthday-display">
      <p>Congratulate birthday to:</p>
      <p>
        {props.firstName} {props.lastName}
      </p>
      <Confetti active={confetti} config={config} />
    </div>
  );
}

function BirthdayComponent() {
  const birthdays = JSON.parse(window.localStorage.getItem("birthdays"));
  const today = `${new Date().getMonth()}/${new Date().getDate()}`;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [value, onChange] = useState(new Date());

  // This function handles birthday submision if there is no
  // birthdays array in localStorage it will create one
  // otherwise it will push new birthday object to existing array
  const handleSubmit = (e) => {
    e.preventDefault();
    const bd = {
      firstName: firstName,
      lastName: lastName,
      birthday: `${value.getMonth()}/${value.getDate()}`,
      id: `${new Date().getTime()}`,
    };
    let birthdays;
    if (checkItem("birthdays")) {
      birthdays = [bd];
    } else {
      birthdays = JSON.parse(window.localStorage.getItem("birthdays"));
      birthdays.push(bd);
    }
    window.localStorage.setItem("birthdays", JSON.stringify(birthdays));
    setFirstName("");
    setLastName("");
  };

  // handles change when writing to input
  // making input fields have a single source of truth
  const handleNameChange = (e) => {
    if (e.target.id == "first-name") {
      setFirstName(e.target.value);
    } else {
      setLastName(e.target.value);
    }
  };

  // div congratiulations check if there is something in array birthdays
  // if there is it will map all the birthdays that have todays date
  // and show them
  return (
    <div className="birthday-app" style={{ display: "flex" }}>
      <AddBirthday
        handleSubmitForm={handleSubmit}
        handleNChange={handleNameChange}
        firstName={firstName}
        lastName={lastName}
        value={value}
        handleCalendarChange={onChange}
      />
      <div className="congratiulations">
        {birthdays &&
          birthdays.map((birthday) => {
            if (today === birthday["birthday"]) {
              return (
                <DisplayBirthday
                  firstName={birthday.firstName}
                  lastName={birthday.lastName}
                  key={birthday.id}
                  activate={"yes"}
                />
              );
            }
          })}
      </div>
    </div>
  );
}

export default BirthdayComponent;
