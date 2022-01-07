import '@tensorflow/tfjs-backend-webgl';
import React from 'react';
import Prediction from './Prediction';

async function onInit() {

    await Prediction.init();

}

// reference :
// https://medium.com/@a.g.stranger/how-to-create-a-react-application-to-stream-your-webcam-basic-beginner-66c792993622

class AppStreamCam extends React.Component {
    constructor(props) {
        super(props);
        this.streamCamVideo = this.streamCamVideo.bind(this);
    }

    streamCamVideo() {
        //init => load model
        onInit();
        var constraints = { audio: true, video: { width: 1280, height: 720 } };
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then(function(mediaStream) {
                var video = document.querySelector("video");
  
                video.srcObject = mediaStream;
                video.onloadedmetadata = function(e) {
                    video.play();
                };
                //run Prediction
                Prediction.main();
            })
            .catch(function(err) {
                console.log(err.name + ": " + err.message);
            }); 
    }

    render() {
        return (
            <div>
                <div id="container">
                    <video autoPlay={true} id="videoElement" controls></video>
                </div>
                <br />
                <button onClick={this.streamCamVideo}>Start streaming</button>
            </div>
        );
    }
}

export default AppStreamCam;
