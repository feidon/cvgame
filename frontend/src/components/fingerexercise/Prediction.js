import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs-backend-webgl";
import { GestureEstimator } from "fingerpose";
import {
  RockGesture,
  PaperGesture,
  ScissorsGesture,
  ThreeGesture,
  FourGesture,
  OneGesture,
} from "./Gestures";

// store references
let handposeModel, gestureEstimator;

export const Prediction = {
  init: async function () {
    // initialize finger gesture recognizer with known gestures
    const knownGestures = [
      RockGesture,
      PaperGesture,
      ScissorsGesture,
      ThreeGesture,
      FourGesture,
      OneGesture,
    ];
    gestureEstimator = new GestureEstimator(knownGestures);
    console.log(
      "Initialized FingerPose with " + knownGestures.length + " gestures"
    );
    console.log("Loading handpose model...");
    handposeModel = await handpose.load();
    console.log("Model loaded");
  },

  predictGesture: async function (sourceElement, minimumScore) {
    const predictions = await handposeModel.estimateHands(sourceElement, false);

    if (predictions.length > 0) {
      const gestureEstimations = gestureEstimator.estimate(
        predictions[0].landmarks,
        minimumScore
      );

      // get gesture with highest match score
      if (gestureEstimations.gestures.length > 0) {
        const gestureResult = gestureEstimations.gestures.reduce((p, c) => {
          return p.confidence > c.confidence ? p : c;
        });

        return gestureResult.name;
      }
    }

    return "";
  },

  getrandomarr: function (num) {
    const knownGestures = [0, 1, 2, 3, 4, 5];
    let arr = [];
    while (arr.length < num) {
      arr.push(Number(knownGestures[Math.floor(Math.random() * 1000) % 6]));
    }
    return arr;
  },
};
