import React, { useContext } from "react";
import { UserContext } from "../App";
import "./Instruction.css";
import Flappy_Bird_icon from "../../img/fingerexer.jpg";
import pose_detect from "../../img/zero.png";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Instruction = ({ setPrePare }) => {
  const { UserData } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="background">
      <h1 className="title">
        {" "}
        Play Finger Exercise with Hand Pose Detection !{" "}
      </h1>
      <div className="container-instruction">
        <ul className="instruction-container">
          <li className="instruction">
            遊戲說明:
            <br />
            玩家進入Finger Exercise遊戲頁面後，前置鏡頭便會偵測玩家的Hand Pose，
            當看到畫面中有辨識結果便可以開始進行遊戲!
          </li>
          <li className="instruction">
            操作說明:
            <br />
            此遊戲藉由前置鏡頭偵測玩家的Hand Pose，根據左邊圖片由左至右開始完成
            完成後計算時間即為分數
          </li>
          <li className="instruction">
            疑難排解: <br />
            Q1: 若我的電腦沒有前置鏡頭怎麼辦？
            <br />
            A1: 此遊戲也可以藉由點擊滑鼠來進行唷!
            <br />
            Q2: 要如何增加操作的穩定性？ <br />
            A2: 因為此遊戲是藉由tensorflow.js的handpose
            model來偵測玩家的身體動作，因此請離鏡頭一定距離，
            並且比出手勢時，不用握得太緊，避免遮住其他手指
            此模型需要看到所有手指，才比較穩定。
          </li>
          <li className="instruction">是不是棒透了!</li>
        </ul>
        <div className="image-container">
          <img className="image" src={Flappy_Bird_icon} alt="Flappy Bird" />
          <img className="image" src={pose_detect} alt="Pose Detection" />
        </div>
      </div>
      <div className="btn-container">
        <Button
          variant="contained"
          sx={{ mx: 3 }}
          onClick={() => {
            navigate(`/login/${UserData.username}/lobby`);
          }}
        >
          Go Back
        </Button>
        <Button
          variant="contained"
          sx={{ mx: 3 }}
          onClick={() => {
            setPrePare(true);
          }}
        >
          Let's Start!{" "}
        </Button>
      </div>
    </div>
  );
};

export default Instruction;
