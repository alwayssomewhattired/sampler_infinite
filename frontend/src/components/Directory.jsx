// this allows the user to return their directory path

import { useState } from "react";

export default function Directory({ setGDirectory, gDirectory }) {
  const [directory, setDirectory] = useState("");


  return (
    <ul>
      <div>Welcome</div>
      <form>
        <label>Directory for downloaded files (no-quotes)</label>
        <input
          type="text"
          placeholder="directory"
          value={directory}
          onChange={(e) => setDirectory(e.target.value)}
        />
        <button
          onClick={() => {
            setGDirectory(directory);
            console.log(gDirectory);
          }}
        ></button>
      </form>
    </ul>
  );
}
