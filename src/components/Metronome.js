import React, { useState, useEffect, useRef, useCallback } from "react";
import "../index.css";
import click from "./click.wav";

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [count, setCount] = useState(0);
  const timer = useRef();
  const sound = new Audio(click);
  const beatsPerMesure = 4;

  const handleBpmChange = (e) => {
    setBpm(e.target.value);
    if (playing) {
      setCount(0);
    }
  };

  const playClickCallback = useCallback(() => {
    if (count % beatsPerMesure === 0) {
      sound.play();
    } else {
      sound.play();
    }
    setCount((prevCount) => (prevCount + 1) % beatsPerMesure);
  }, [count, sound]);

  useEffect(() => {
    if (playing) {
      clearInterval(timer.current);
      timer.current = setInterval(playClickCallback, (60 / bpm) * 1000);
    } else {
      clearInterval(timer.current);
    }
  }, [bpm, playing, playClickCallback]);

  const startStop = () => {
    if (playing) {
      setPlaying(false);
    } else {
      setCount(0);
      setPlaying(true);
    }
  };

  return (
    <div className="Metro">
      <header className="Metro-header">
        <p>Metronome</p>
        <span>{bpm} BPM</span>
        <input
          onChange={handleBpmChange}
          type="range"
          min="40"
          max="200"
          step="1"
          className="range"
          value={bpm}
        />
        <button onClick={startStop}>{playing ? "Stop" : "Start"}</button>
      </header>
    </div>
  );
};

export default Metronome;
