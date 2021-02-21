import { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import GadgetContainer from "./components/gadgetContainer";
import WheatherComponent from "./components/weatherApp/wheaterComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <GadgetContainer title={"Weather App"} note={"Check out the weather"}>
        <WheatherComponent />
      </GadgetContainer>
    </div>
  );
}

export default App;
