//this is the communicator between my python server and my react client

export default function Api(gDirectory) {
  async function fetchData() {
    await fetch("http://127.0.0.1:5000/api/endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(gDirectory),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  }



  if (gDirectory.gDirectory != undefined) {
    console.log(gDirectory);
    fetchData();
  }
}
