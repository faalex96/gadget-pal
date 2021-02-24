import { useEffect } from "react";
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

function App() {
  return (
    <div className="App">
      <Banner purpose={"header"} />
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
      <Banner purpose={"footer"} />
    </div>
  );
}

export default App;
