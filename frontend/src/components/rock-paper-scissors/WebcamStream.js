import '@tensorflow/tfjs-backend-webgl';
import React from 'react';
import Prediction from './Prediction';
import { useEffect, useRef, useState } from 'react';
import './WebcamStream.css';

let intervalID;

function AppStreamCam() {

    const [gestureName, setGestureName] = useState('none');
    const [gestureScore, setGestureScore] = useState('0');
    const [isInit, setIsInit] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [rps, setRps] = useState(3);
    const [correct, setCorrect] = useState(false);
    const [countDown, setCountDown] = useState('get ready');

    async function onInit() {
        await Prediction.init();
        return true;
    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }

    const randomRPS = () => {
        let k = getRandomInt(3);
        console.log('k', k);
        setRps(k);
    }

    const handlePictureChange = () => {
        randomRPS();
        console.log('rps', rps);
    }

    const handleStart = () => {
        console.log('start!!!');
        setTimeout(() => {
            handlePictureChange();
        }, 4000);
        setTimeout(() => {
            setCountDown('start in 3');
        }, 1000);
        setTimeout(() => {
            setCountDown('start in 2');
        }, 2000);
        setTimeout(() => {
            setCountDown('start in 1');
        }, 3000);
        setTimeout(() => {
            setCountDown('GO!!!!!');
            // intervalID
        }, 4000);
        setTimeout(() => {
            setCountDown('(Stay Focus)');
        }, 5000);
    }

    const handleStop = () => {
        Prediction.stop();
        setIsPlaying(false);
        setGestureName('none')
        setGestureScore(0)
    }

    const streamCamVideo = async () => {
        if (!isPlaying) {
            setIsInit(true);
            await onInit();
            var constraints = { audio: false, video: { width: 600, height: 450 } };
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
                    handleStart();
                })
                .catch(function(err) {
                    console.log(err.name + ": " + err.message);
                });
        }
    }

    useEffect(() => {
        let ID = setInterval(() => {

        }, )
    });

    return (
        <div className='background'>
            <h3 className="loading-status">{countDown}</h3>
            <div className="game-container">
                <div className="videoWrapper">
                    <video autoPlay={true} className="RPSvideo" controls></video>
                </div>
                <div className="imageWrapper">
                    <img className="RPSimage" src={
                        (rps === 3) ? 
                            require("../../img/sample.png"):
                            (rps === 2) ? 
                                require("../../img/sample_scissor.jpg"):
                                (rps === 1) ? 
                                    require("../../img/sample_rock.jpg"):
                                    require("../../img/sample_paper.jpg")
                    }></img>
                </div>
            </div>
            <div className="btn-container">
                <button className="btn" onClick={streamCamVideo}>Start</button>
                <button className="btn" onClick={handleStop}>Stop</button>
            </div>
            <br />
            <h3 className="gesture-score">{gestureName}, {gestureScore}</h3>
            <h3 className="loading-status">{
                (isInit) ?
                    "The game is laoding... please wait": 
                    (isPlaying) ? 
                        "The game has started":
                        "Press start button to start"
            }</h3>
        </div>
    );
}

export default AppStreamCam;
