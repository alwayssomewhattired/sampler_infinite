import "./App.css";

import Directory from "./components/Directory";
import Api from "./components/Api";

import { useState } from "react";

function App() {

  const [gDirectory, setGDirectory] = useState()
  
  // const data = { name: "John", age: 30 };

  // fetch("http://127.0.0.1:5000/api/endpoint", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Access-Control-Allow-Origin": "*",
  //   },
  //   body: JSON.stringify(gDirectory),
  // })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data))
  //   .catch((error) => console.error("Error:", error));

  return <>
  <Directory setGDirectory={setGDirectory} gDirectory={gDirectory} />
  <Api gDirectory={gDirectory} />
  </>;
}

export default App;
