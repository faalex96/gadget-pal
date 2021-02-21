import { useEffect } from "react";
import "./App.css";
import "./components/gContainer.css";
import Header from "./components/header";
import GadgetContainer from "./components/gadgetContainer";
import WheatherComponent from "./components/weatherApp/wheaterComponent";
import Calculator from "./components/currencyApp/currencyComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <GadgetContainer title={"Weather App"} note={"Check out the weather"}>
        <WheatherComponent />
      </GadgetContainer>
      <GadgetContainer title={"Currency Exchange"} note={"Should I invest?"}>
        <Calculator />
      </GadgetContainer>
    </div>
  );
}

export default App;
