import { useEffect } from "react";
import "./App.css";
import "./components/gContainer.css";
import "react-calendar/dist/Calendar.css";
import Header from "./components/header";
import GadgetContainer from "./components/gadgetContainer";
import WheatherComponent from "./components/weatherApp/wheaterComponent";
import Calculator from "./components/currencyApp/currencyComponent";
import BirthdayComponent from "./components/birthdayApp/birthdayComponent";
import QuoteComponent from "./components/quoteApp/quoteComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <GadgetContainer
        title={"Birthday reminder"}
        note={"Congratulate your friends birthday."}
      >
        <BirthdayComponent />
      </GadgetContainer>
      <GadgetContainer title={"Weather App"} note={"Check out the weather"}>
        <WheatherComponent />
      </GadgetContainer>
      <GadgetContainer title={"Currency Exchange"} note={"Should I invest?"}>
        <Calculator />
      </GadgetContainer>
      <GadgetContainer title={"Quote of the day"} note={"Get inspired"}>
        <QuoteComponent />
      </GadgetContainer>
    </div>
  );
}

export default App;
