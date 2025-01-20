// lots of vulnerabilities in web-audio-api dependencies...

export default function AudioEditor() {
  //sample rate is 48000
  // length  10472385

  // https://archive.org/download/Radiate_Joy-8267/Colin_Shaddick__Roger_Nicholls_-_01_-_Radiate_Joy.mp3
  // https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3
  // https://archive.org/download/Bastard_Child-3477/Moonshine_Willy_-_04_-_Turn_The_Lights_Down_Low.mp3

  //                    FOLLOW THIS FOR SWEET NECTAR

  // https://developer.mozilla.org/en-US/docs/Web/API/OfflineAudioContext

  const audioCtx = new AudioContext();
  const offlineCtx = new OfflineAudioContext(2, 10472385, 48000);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 4096;
  const bufferLength = analyser.frequencyBinCount;

  const dataArray = new Uint8Array(bufferLength);

  //             SPECTRUM WINDOW

  // const canvas = document.getElementById("canvas");
  // const canvasCtx = canvas.getContext("2d");
  // canvasCtx.clearRect(0, 0, 150, 100);

  let audio;

  fetch(
    "https://archive.org/download/Bastard_Child-3477/Moonshine_Willy_-_04_-_Turn_The_Lights_Down_Low.mp3",
    {
      header: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  )
    .then((data) => data.arrayBuffer())
    .then((arrayBuffer) => audioCtx.decodeAudioData(arrayBuffer))
    .then((decodedAudio) => {
      audio = decodedAudio;
    });

  function playBack() {
    const playSound = audioCtx.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(analyser);
    playSound.connect(audioCtx.destination);
    playSound.start(audioCtx.currentTime);
  }

  function downloadAudio() {
    const playSound = offlineCtx.createBufferSource();
    console.log(audio);
    playSound.buffer = audio;
    playSound.connect(analyser);
    // playSound.start(ctx.currentTime);
    playSound.startRendering();
  }

  window.addEventListener("mousedown", playBack);
  // window.addEventListener("mousedown", downloadAudio);

  function draw() {
    const drawVisual = requestAnimationFrame(draw);
    analyser.getByteFrequencyData(dataArray);

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
    if (dataArray.slice(5).every((a) => a < dataArray[4])) {
      console.log(audioCtx.currentTime);
      console.log(audioCtx.getOutputTimestamp());
    }

    // console.log(dataArray[0] - 20)

    // console.log(dataArray)

    // console.log(dataArray.indexOf(Math.max(dataArray)))
    // console.log(dataArray[2])

    // console.log(ctx.sampleRate)

    // site drawing

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
    </>
  );

  // const audioContext = new AudioContext()
  // const track = audioContext.createMediaElementSource(audioElement)
  // const audioElement = new Audio(
  //   "https://archive.org/download/The_Dread_-_FMA_Sampler-18671/The_Dread_-_05_-_Thrashin.mp3"
  // );
}
