import React, { useRef, useState, useEffect } from "react";
import "./styles.scss";

import icon_play from "./img/icon_play.png";
import icon_pause from "./img/icon_pause.png";
import icon_fwd from "./img/icon_fwd.png";
import icon_rwd from "./img/icon_rwd.png";
import icon_prev from "./img/icon_prev.png";
import icon_next from "./img/icon_next.png";
import icon_volUp from "./img/icon_volUp.png";
import icon_volDown from "./img/icon_volDown.png";
import icon_muted from "./img/icon_muted.png";
import wbs from "./img/wbs.png";

export default function App() {


  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [queue, setQueue] = useState([
    "https://www.w3schools.com/html/mov_bbb.mp4",
    "https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_480_1_5MG.mp4",
    "https://www.w3schools.com/html/mov_bbb.mp4"
  ]);
  const [current, setCurrent] = useState(queue[0]);

  // const [isFw, setIsFw] = useState(false);
  // const [isRw, setisRw] = useState(false);
  const [isNextVideo, setIsNextVideo] = useState(false);
  const [isPrevVideo, setIsPrevVideo] = useState(false);
  const [duration, setDuration] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [volume, setVolume] = useState(0.5);

  // const [currentClipTime, setCurrentClipTime] = useState(null);

  // console.log(videoRef.current.clientWidth)

  const onInput = () => {
    const input = document.getElementById("typeinp");
    videoRef.current.volume = input.value;
    setVolume(input.value);
  };

  const handleStart = () => {
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
      videoRef.current.volume = volume;
      setDuration(videoRef.current.duration);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    // console.log(videoRef.current);
  };

  // const handleStop = () => {
  //   videoRef.current.pause();
  //   videoRef.current.currentTime = 0;
  //   setIsPlaying(false);
  // };

  const handleFastFw = () => {
    if (videoRef.current.currentTime >= videoRef.current.duration) {
      videoRef.current.pause();
      videoRef.current.currentTime = videoRef.current.duration;
    } else {
      videoRef.current.currentTime += 3;
    }
  };

  const handleFastRw = () => {
    if (videoRef.current.currentTime <= 3) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    } else {
      videoRef.current.currentTime -= 3;
    }
  };

  const handleVolumeUp = () => {
    if (videoRef.current.volume >= 0.9) {
      videoRef.current.volume = 1;
      setVolume(videoRef.current.volume);
      console.log(volume);
    } else {
      videoRef.current.volume += 0.1;
      setVolume(videoRef.current.volume.toFixed(1));
      console.log(volume);
    }
  };

  const handleVolumeDown = () => {
    if (videoRef.current.volume <= 0.1) {
      videoRef.current.volume = 0;
      setVolume(videoRef.current.volume);
      console.log(volume);
    } else {
      videoRef.current.volume -= 0.1;
      setVolume(videoRef.current.volume.toFixed(1));
      console.log(volume);
    }
  };

  const handleNextVid = () => {
    //  current 0
    //  hit nextvid then increment current ( => 1 )
    //  then something like state[current]
    //  {value}
    // const getIndex = queue.filter(item, index => value == current);
    // Get Position of Array where Value is the value of the State (Current).
    // After that, since its NextVid => set ID + 1 to play the next video
  };
  const handlePrevVid = () => {};

  useEffect(() => {
    videoRef.current.ontimeupdate = () => {
      setElapsed(videoRef.current.currentTime);
      console.log(elapsed);
    };
  });

  return (
    <div className="App">
      <div>
        <div id="video-container">
          {!isPlaying ? (
            <div id="overlay">
              {" "}
              <img src={wbs} alt="WBS Training" />
              <p>p a u s e d &nbsp; t h i s &nbsp; v i d e o</p>
            </div>
          ) : (
            ``
          )}

          {/* onTimeUpdate for getting the currentTime to state? */}

          <video id="player" ref={videoRef} src={current} />
        </div>

        {/* {console.log(videoRef.current.clientWidth)} */}

        <div id="controls">
          <img
            src={!isPlaying ? `${icon_play}` : `${icon_pause}`}
            alt={!isPlaying ? "PLAY" : "PAUSE"}
            onClick={() => handleStart()}
          />
          <span id="elapsed">{elapsed.toFixed(0)}</span>:
          <span id="duration">
            {duration ? ` ${duration.toFixed(2)}` : "0:00"}
          </span>
          {/* <span>{currentClipTime}:{videoRef.current.duration}</span> */}
          <img src={icon_fwd} alt="Forward" onClick={() => handleFastFw()} />
          <img src={icon_rwd} alt="Rewind" onClick={() => handleFastRw()} />
          <img src={icon_next} alt="Next" onClick={() => handleNextVid()} />
          <img src={icon_prev} alt="Previous" onClick={() => handlePrevVid()} />
          <span class="volume">
            <img
              src={volume === "0" ? `${icon_muted}` : `${icon_volDown}`}
              alt="Volume DOWN"
              onClick={() => handleVolumeDown()}
            />
            <input
              id="typeinp"
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={onInput}
            />
            <img
              src={icon_volUp}
              alt="Volume UP"
              onClick={() => handleVolumeUp()}
            />
          </span>
          <br />
        </div>

        {/* THERE IS LIKE NO STOP BUTTON ON YOUTUBE E.G.
        <button onClick={() => handleStop()}>Stop</button> */}

        <br />
        <br />
      </div>
    </div>
  );
}
