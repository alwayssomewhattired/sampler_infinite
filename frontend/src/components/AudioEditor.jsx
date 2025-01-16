// lots of vulnerabilities in web-audio-api dependencies...

// import { useRef } from "react";

export default function AudioEditor() {

  const ctx = new AudioContext();
  let audio;

  fetch(
    "https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3",
    {
      header: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((data) => data.arrayBuffer())
    .then((arrayBufer) => ctx.decodeAudioData(arrayBufer))
    .then((decodedAudio) => {
      audio = decodedAudio;
    });

  function playBack() {
    const playSound = ctx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(ctx.destination);
    playSound.start(ctx.currentTime);
  }

  window.addEventListener("mousedown", playBack);

  const playButton = document.querySelector("button");

  playButton.addEventListener(
    "click",
    () => {
      if (playBack.state === "suspended") {
        playBack.resume();
      }
      if (playButton.dataset.playing === "false") {
        playBack.play();
        playButton.dataset.playing = "true";
      } else if (playButton.dataset.playing === "true") {
        playBack.pause();
        playButton.dataset.playing = "false";
      }
    },
    false
  );
  //              NO IDEA HOW TO WORK THIS

  // async function getData() {
  //   const url =
  //     "https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3";
  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     })
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const audioContext = new AudioContext();
  // const audioElement = document.querySelector("audio");
  // const track = audioContext.createMediaElementSource(audioElement);
  // track.connect(audioContext.destination);

  return (
    <>
      <h1>hiiiiiiiiiiii</h1>
    </>
  );

  // const audioContext = new AudioContext()
  // const track = audioContext.createMediaElementSource(audioElement)
  // const audioElement = new Audio(
  //   "https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3"
  // );
}
