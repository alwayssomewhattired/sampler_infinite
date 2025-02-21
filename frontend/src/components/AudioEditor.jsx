// lots of vulnerabilities in web-audio-api dependencies...

//                  USE WEBASSEMBLY TO IMPROVE EFFICIENCY

import { MediaRecorder, register } from "extendable-media-recorder";
import { connect as connector } from "extendable-media-recorder-wav-encoder";

export default function AudioEditor() {
  //sample rate is 48000

  // length  10472385
  //the length will have to be able to change according to song

  // https://archive.org/download/Radiate_Joy-8267/Colin_Shaddick__Roger_Nicholls_-_01_-_Radiate_Joy.mp3
  // https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3
  // https://archive.org/download/Bastard_Child-3477/Moonshine_Willy_-_04_-_Turn_The_Lights_Down_Low.mp3

  //                    FOLLOW THIS FOR SWEET NECTAR

  // https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext

  const audioCtx = new AudioContext();
  const offlineCtx = new OfflineAudioContext(2, 10472385, 48000);

  const mediaStream = audioCtx.createMediaStreamDestination();
  const recorder = new MediaRecorder(mediaStream.stream);

  const analyser = audioCtx.createAnalyser();
  const offlineAnalyser = offlineCtx.createAnalyser();

  analyser.fftSize = 4096;
  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);
  const offlineDataArray = new Uint8Array(bufferLength);

  //             SPECTRUM WINDOW

  // const canvas = document.getElementById("canvas");
  // const canvasCtx = canvas.getContext("2d");
  // canvasCtx.clearRect(0, 0, 150, 100);

  let audio;
  let source;
  let recordableSrc;
  let chunks = [];
  let downloader;

  /*




//                          TESTER IS A WORKING WAY TO PLAY AUDIO




*/

  async function tester() {
    try {
      const response = await fetch("./DeathGrips-Exmilitary-1-Beware.mp3", {
        header: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
      const readData = await response.arrayBuffer();
      console.log(readData);
      const decodedData = await audioCtx.decodeAudioData(readData);
      console.log(decodedData);
      const playableAudio = new AudioBufferSourceNode(audioCtx, {
        buffer: decodedData,
      });
      console.log(playableAudio);
      playableAudio.connect(audioCtx.destination);
      // playableAudio.connect(MediaStreamAudioDestinationNode);
      // await register(await connector())
    } catch (error) {
      console.log(error);
    }
  }
  /*






//                DIY_PROCESS IS USED FOR THE FINAL PRODUCT INVOLVING MY OWN PROCESSOR


//Turn audioCtx into offlineCtx when this is able to play sound as a test

//My module runs, but is not able to play any sound
//  this might be because of sample difference (I believe this is called 'buffer-size"). my processor does 128 samples per call (block?).
//    * find how many samples-per-block/buffer-size in main thread




*/

  async function diy_process() {
    try {
      const response = await fetch("./DeathGrips-Exmilitary-1-Beware.mp3", {
        header: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
      const readData = await response.arrayBuffer();
      console.log(readData);
      const decodedData = await audioCtx.decodeAudioData(readData);
      console.log(decodedData);
      await audioCtx.audioWorklet.addModule("src/components/processor.js");
      let myNewProcessor = new AudioWorkletNode(
        audioCtx,
        "myFrequencyProcessor"
      );
      console.log(myNewProcessor);
      const playableAudio = new AudioBufferSourceNode(audioCtx, {
        buffer: decodedData,
      });
      playableAudio.connect(myNewProcessor).connect(audioCtx.destination);
      playableAudio.start();
    } catch (error) {
      console.log(error);
    }
  }
  /*


//                                FETCHER IS A FAILED PROTOTYPE

*/

  // function fetcher() {
  //   fetch(
  //     "https://archive.org/download/Bastard_Child-3477/Moonshine_Willy_-_04_-_Turn_The_Lights_Down_Low.mp3",
  //     {
  //       header: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     }
  //   )
  //     .then((data) => data.arrayBuffer())
  //     .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
  //     .then((decodedAudio) => {
  //       // audio = decodedAudio;
  //       recordableSrc = new AudioBufferSourceNode(audioCtx, {
  //         buffer: decodedAudio,
  //       });
  //     })
  //     .then(() => {
  //       console.log(recordableSrc);
  //       recordableSrc.connect(audioCtx.destination);
  //       recordableSrc.connect(mediaStream);
  //       recorder.ondataavailable = (evt) => {
  //         console.log(evt);
  //         chunks.push(evt.data);
  //       };
  //     })
  //     .catch((error) => console.log(error));
  //   recorder.onstop = () => {
  //     downloader = URL.createObjectURL(
  //       new Blob(chunks, { type: "audio/mpeg" })
  //     );
  //     console.log(downloader);
  //     console.log(chunks);
  //   };
  // }

  /*


      NO IDEA WHAT THIS IS


 */
  // console.log("recording?");
  // console.log(source.buffer);
  // source.connect(offlineAnalyser);
  // return source.start();
  // .then(() => offlineCtx.startRendering());

  /*




//            START AND STOP ARE OUTDATED




*/

  function Start() {
    fetcher();
    recorder.start();
    console.log("started");
  }

  function Stop() {
    recorder.stop();
  }

  /*


//                 SIMPLE PAYBACK EXAMPLE



*/
  // function playBack() {
  //   console.log("playing audio");
  //   const playSound = audioCtx.createBufferSource();
  //   playSound.buffer = audio;
  //   playSound.connect(analyser);
  //   playSound.connect(audioCtx.destination);
  //   playSound.start(audioCtx.currentTime);
  // }
  /*



//                          PRETTY MUCH GARBAGE AT THIS POINT





*/
  // function downloadAudio() {
  //   console.log("downloading audio");

  // const playSound = offlineCtx.createBufferSource();
  // console.log(audio);
  // playSound.buffer = audio;
  // playSound.connect(analyser);
  // playSound.start(ctx.currentTime);
  // playSound.startRendering();
  //   AudioDestinationNode();
  //   source.connect(offlineCtx.destination);
  //   return source.start();
  // }

  // function audioCtxStart() {
  //   console.log("starting audio context");
  // }

  // window.addEventListener("mousedown", playBack);
  // window.addEventListener("mousedown", downloadAudio);
  // window.addEventListener("mousedown", audioCtxStart);
  // window.addEventListener("mousedown", fetcher);

  /*



//                DRAW FUNCTION FOR FFT VISUAL GRAPH


*/

  function draw() {
    const drawVisual = requestAnimationFrame(draw);
    // analyser.getByteFrequencyData(dataArray);
    offlineAnalyser.getByteFrequencyData(offlineDataArray);
    // console.log(mediaStream)

    //                                     WRITE CONDITIONAL TO FIND PROMINENT FREQUENCY AND CONSOLE.LOG WHEN IT IS FOUND
    // 1. add 20 to every element in dataArray except index of what you are trying to find
    // 2. if ((dataArray[0] - 20) > Math.max(...dataArray)){
    //        console.log(good)}

    //     FAILED: CANNOT ISOLATE SPECIFIC INDEX BECAUSE DATA IS FLUID AND UINT ARRAYS ARE IMMUTABLE

    //                                      THAT IS A LITTLE TRICKY... TRY 'EVERY' METHOD INSTEAD.
    //                                      YOU WILL NEED TO PUSH EVERY ELEMENT EXCEPT THE ELEMENT OF INDEX YOU ARE TESTING INTO A NEW ARRAY...
    //                                      THIS IS BECAUSE IF YOU REMOVE AN INDEX, THE DATA WILL SPILL OVER INTO THE REST OF THE ARRAY...
    //                                      WHICH MEANS THE DATA YOU REMOVED IS STILL THERE.
    //                                      IF YOU PUSH ALL DATA THAT COMES BEFORE AND AFTER THE ELEMENT YOU ARE TESTING INTO A NEW ARRAY...
    //                                      AND THEN TEST THE NEW ARRAY AGAINST THE SHRUNKEN ELEMENT...
    //                                      YOU WILL HAVE A PRETTY GOOD IDEA OF WHEN THAT FREQUENCY IS PROMINENT

    //                        PLAYABLE AUDIO DATA
    // if (dataArray.slice(5).every((a) => a < dataArray[4])) {
    //   console.log(audioCtx.currentTime);
    //   console.log(audioCtx.getOutputTimestamp());
    // }

    //                        OFFLINE AUDIO DATA
    // if (offlineDataArray.slice(5).every((a) => a < offlineDataArray[4])) {
    //   console.log(offlineCtx.currentTime);
    //   console.log(offlineCtx.destination);
    // }

    //                        LOGS OF TESTING
    // console.log(dataArray[0] - 20)

    // console.log(dataArray)
    // console.log(offlineDataArray)

    // console.log(dataArray.indexOf(Math.max(dataArray)))
    // console.log(dataArray[2])

    // console.log(ctx.sampleRate)

    //                        SITE DRAWING

    // const WIDTH = 150;
    // const HEIGHT = 100;

    // canvasCtx.fillStyle = "rgb(0 0 0)";
    // canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    // const barWidth = (WIDTH / bufferLength) * 2.5;
    // let barHeight;
    // let x = 0;

    // for (let i = 0; i < bufferLength; i++) {
    //   barHeight = dataArray[i] / 2;

    //   canvasCtx.fillStyle = `rgb(${barHeight + 100} 50 50)`;
    //   canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight);

    //   x += barWidth + 1;
    // }
  }

  draw();

  //                                                             NO IDEA HOW TO WORK THIS

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
      <button onClick={Start}>Start</button>
      <button onClick={Stop}>Stop</button>
      <button onClick={tester}>test</button>
      <button onClick={diy_process}>diy</button>
    </>
  );

  // const audioContext = new AudioContext()
  // const track = audioContext.createMediaElementSource(audioElement)
  // const audioElement = new Audio(
  //   "https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3"
  // );
}
