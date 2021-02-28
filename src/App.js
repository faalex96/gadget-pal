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
    title: "Birthday reminder",
    note: "Congratulate birthday to your friends",
    id: "birthday",
  },
  {
    weather: <WheatherComponent />,
    title: "Weather App",
    note: "Check out the weather",
    id: "weather",
  },
  {
    currency: <Calculator />,
    title: "Currency Exchange",
    note: "Should you invest?r",
    id: "currency",
  },
  {
    quote: <QuoteComponent />,
    title: "Quote of the day",
    note: "Get inspired",
    id: "quote",
  },
  {
    water: <WatterIntake />,
    title: "Water app",
    note: "Track your water intake",
    id: "water",
  },
  {
    todo: <ToDoComponent />,
    title: "Todo app",
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
      <SideBar
        apps={apps}
        handleClick={handleClick}
        activity={clickBurger}
        handleClose={handleClose}
      />
      <GadgetContainer title={currentApp["title"]} note={currentApp["note"]}>
        {currentApp[app]}
      </GadgetContainer>

      <Banner purpose={"footer"} />
    </div>
  );
}

export default App;

/*
<GadgetContainer
title={"Birthday reminder"}
note={"Congratulate your friends birthday."}
>
<BirthdayComponent />
</GadgetContainer>
<GadgetContainer title={"Weather App"} note={"Check out the weather"}>
<WheatherComponent />
</GadgetContainer>
<GadgetContainer title={"Currency Exchange"} note={"Should you invest?"}>
<Calculator />
</GadgetContainer>
<GadgetContainer title={"Quote of the day"} note={"Get inspired"}>
<QuoteComponent />
</GadgetContainer>
<GadgetContainer title={"Water app"} note={"Track your water intake"}>
<WatterIntake />
</GadgetContainer>
<GadgetContainer title={"Todo app"} note={"Write down your chores"}>
<ToDoComponent />
</GadgetContainer>
*/
