import { useState } from "react";

export default function Directory({ setGDirectory, gDirectory }) {
  const [directory, setDirectory] = useState("");

  //   let path;
  //   document.getElementById("path_submit").onclick = function () {
  //     path = document.getElementById("path_input").value;
  //     document.getElementById("directory_status").textContent = `${path}`;
  //     console.log(path);
  //   };
  return (
    <ul>
      <div>Welcome</div>
      <form>
        <label>Directory for downloaded files</label>
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
