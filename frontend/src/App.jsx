import "./App.css";

import Directory from "./components/Directory";
import Api from "./components/Api";
// import Audio from "./components/Audio";
import AudioEditor from "./components/audioEditor";

import { useState } from "react";

function App() {

  const [gDirectory, setGDirectory] = useState()
  

  return <>
  <Directory setGDirectory={setGDirectory} gDirectory={gDirectory} />
  <Api gDirectory={gDirectory} />
  {/* <Audio /> */}
  <AudioEditor />
  </>;
}

export default App;
