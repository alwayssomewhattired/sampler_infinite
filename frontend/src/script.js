// const fileSelectBtn = document.getElementById("file-select-button");

// async function getDirectoryPath() {
//   try {
//     const directoryHandle = await window.showDirectoryPicker();
//     const directoryPath = directoryHandle.name;
//     fileSelectBtn.nextElementSibling.textContent = `You have chosen: ${directoryPath}`;
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

let path;

document.getElementById("path_submit").onclick = function () {
  path = document.getElementById("path_input").value;
  document.getElementById("directory_status").textContent = `${path}`;
  console.log(path);
};


