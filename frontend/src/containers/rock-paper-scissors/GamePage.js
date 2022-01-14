import React, { useState } from 'react'
import AppStreamCam from '../../components/rock-paper-scissors/WebcamStream';
import Instruction from './Instruction';

const GamePage_RPS = () => {

    const [isInstruction, setIsInstruction] = useState(true);

    return (
        (isInstruction) ?
            <Instruction setIsInstruction={setIsInstruction}/>:
            <AppStreamCam setIsInstruction={setIsInstruction}/>
    )
}
export default GamePage_RPS