import logo from "./logo.svg";
import "./App.css";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import * as tf from "@tensorflow/tfjs-core";
// Register WebGL backend.
import "@tensorflow/tfjs-backend-webgl";
import { GestureEstimator } from "fingerpose";
import { RockGesture, PaperGesture, ScissorsGesture } from "./Gestures";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const knownGestures = [RockGesture, PaperGesture, ScissorsGesture];
  const gestureEstimator = new GestureEstimator(knownGestures);
  console.log(
    "Initialized FingerPose with " + knownGestures.length + " gestures"
  );

  const runHandpose = async () => {
    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: "tfjs", // or 'tfjs'
      modelType: "full",
    };
    const detector = await handPoseDetection.createDetector(
      model,
      detectorConfig
    );
    console.log("Handpose model loaded.");
    //  Loop and detect hands
    setInterval(() => {
      detect(detector);
    }, 100);
  };

  const detect = async (detector) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const hand = await detector.estimateHands(video);
      console.log(hand);

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      // drawHand(hand, ctx);
    }
  };

  async function predictGesture(detector, sourceElement, minimumScore) {
    const predictions = await detector.estimateHands(sourceElement, false);

    if (predictions.length > 0) {
      // detect gestures
      const gestureEstimations = gestureEstimator.estimate(
        predictions[0].landmarks,
        minimumScore
      );

      // get gesture with highest match score
      if (gestureEstimations.gestures.length > 0) {
        // this will reduce an array of results to a single value
        // containing only the gesture with the highest score
        const gestureResult = gestureEstimations.gestures.reduce((p, c) => {
          return p.confidence > c.confidence ? p : c;
        });

        return gestureResult.name;
      }
    }

    return "";
  }

  async function playOneRound() {
    // show the timer circle
    // UI.showTimer(true);

    // start detecting player gestures
    // required duration 150ms ~ 4-5 camera frames
    detectPlayerGesture(150);
  }

  function detectPlayerGesture(detector, requiredDuration) {
    let lastGesture = "";
    let gestureDuration = 0;

    const predictNonblocking = () => {
      setTimeout(() => {
        const predictionStartTS = Date.now();

        // predict gesture (require high confidence)
        predictGesture(detector, playerVideo, 9).then((playerGesture) => {
          if (playerGesture != "") {
            if (playerGesture == lastGesture) {
              // player keeps holding the same gesture
              // -> keep timer running
              const deltaTime = Date.now() - predictionStartTS;
              gestureDuration += deltaTime;
            } else {
              // detected a different gesture
              // -> reset timer
              UI.setPlayerHand(playerGesture);
              lastGesture = playerGesture;
              gestureDuration = 0;
            }
          } else {
            UI.setPlayerHand(false);
            lastGesture = "";
            gestureDuration = 0;
          }

          if (gestureDuration < requiredDuration) {
            // update timer and repeat
            UI.setTimerProgress(gestureDuration / requiredDuration);
            predictNonblocking();
          } else {
            // player result available
            // -> stop timer and check winner
            UI.setTimerProgress(1);
            UI.animatePlayerHand();

            // let computer make its move
            const computerGesture = getRandomGesture();

            // check the game result
            checkResult(playerGesture, computerGesture);
          }
        });
      }, 0);
    };

    predictNonblocking();
  }

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />
      </header>
    </div>
  );
}

export default App;
