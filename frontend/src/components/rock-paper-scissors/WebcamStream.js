import '@tensorflow/tfjs-backend-webgl';
import React from 'react';
import Prediction from './Prediction';
import { useEffect, useRef, useState } from 'react'

function AppStreamCam() {

    const [gestureName, setGestureName] = useState('none');
    const [gestureScore, setGestureScore] = useState('0');
    const [isInit, setIsInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    async function onInit() {
        await Prediction.init();
        return true;
    }

    const streamCamVideo = async () => {
        setIsInit(true);
        await onInit();
        var constraints = { audio: true, video: { width: 1280, height: 720 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(mediaStream) {
                var video = document.querySelector("video");
    
                video.srcObject = mediaStream;
                video.onloadedmetadata = function(e) {
                    video.play();
                };
                setIsInit(false);
                setIsPlaying(true);
                Prediction.main(setGestureName, setGestureScore);
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            });
    }


    return (
        <div>
            <div id="container">
                <video autoPlay={true} id="videoElement" controls></video>
            </div>
            <br />
            <button onClick={streamCamVideo}>Start streaming</button>
            <h1>{gestureName}, {gestureScore}</h1>
            {(isInit) ? (
                <h1>The game is laoding... please wait</h1>
            ) : (
                (isPlaying) ? (
                    <h1>The game has started</h1>
                ) : (
                    <h1>Press start button to start</h1>
                )
            )}
        </div>
    );
}

export default AppStreamCam;
