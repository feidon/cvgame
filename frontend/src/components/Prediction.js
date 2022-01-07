import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import SampleImage from './SampleImage';

let handposeModel;

const Prediction = {

    init: async function() {

        // Load the MediaPipe handpose model.
        console.log("Loading handpose model...")
        handposeModel = await handpose.load();
        console.log("Model loaded");
    
        // Warm up the model a little bit.
        console.log("Warm up model");
        const sample = await SampleImage.create();
        await handposeModel.estimateHands(sample, false);
        console.log("Model is hot!");
    },
    
    main: async function() {    
    
        const startPredict = () => {
    
            setInterval( async () => {
                // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
                // hand prediction from the MediaPipe graph.
                // console.log('predicting...');
                const predictions = await handposeModel.estimateHands(document.querySelector("video"));
                // console.log('prediction done');
    
                // if (predictions.length > 0) {
    
                //     /*
                //     `predictions` is an array of objects describing each detected hand, for example:
                //     [
                //     {
                //         handInViewConfidence: 1, // The probability of a hand being present.
                //         boundingBox: { // The bounding box surrounding the hand.
                //         topLeft: [162.91, -17.42],
                //         bottomRight: [548.56, 368.23],
                //         },
                //         landmarks: [ // The 3D coordinates of each hand landmark.
                //         [472.52, 298.59, 0.00],
                //         [412.80, 315.64, -6.18],
                //         ...
                //         ],
                //         annotations: { // Semantic groupings of the `landmarks` coordinates.
                //         thumb: [
                //             [412.80, 315.64, -6.18]
                //             [350.02, 298.38, -7.14],
                //             ...
                //         ],
                //         ...
                //         }
                //     }
                //     ]
                //     */
    
                //     for (let i = 0; i < predictions.length; i++) {
                //         const keypoints = predictions[i].landmarks;
    
                //         // Log hand keypoints.
                //         for (let i = 0; i < keypoints.length; i++) {
                //             const [x, y, z] = keypoints[i];
                //             console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`);
                //         }
                //     }
                // }
            }, 1000);
        }
    
        startPredict();
    }

}

export default Prediction;