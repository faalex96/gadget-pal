import { useEffect } from "react";
import "./App.css";
import Header from "./components/header";
import WheatherComponent from "./components/weatherApp/wheaterComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <WheatherComponent />
    </div>
  );
}

export default App;
