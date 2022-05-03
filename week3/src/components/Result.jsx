import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import 왕관 from "../img/crown.png";
import Toast from "./Toast.jsx";

function ResultPage({winner}) {
  const [toastStatus, setToastStatus] = useState(false);
  
  function handleShareButton() {
    setToastStatus(true);
    const text = document.createElement("textarea");
    document.body.appendChild(text);
    text.value = "https://idealwordcup.vercel.app/";
    text.select();
    document.execCommand("copy");
    document.body.removeChild(text);
  }

  useEffect(() => {
    if (toastStatus) {
      setTimeout(() => {
        setToastStatus(false);
      }, 1000);
    }
  }, [toastStatus]);

  return (
    <ResultWrapper>
      <img src={왕관} alt="왕관" />
      <ImageWrapper>
        <img src={winner[0].src} alt={winner[0].name} className="item__img" />
      </ImageWrapper>
      <strong className="winner__name">{winner[0].name}</strong>
      <div className="main__buttons">
        <Link to="/">
          <button type="button">다시하기</button>
        </Link>
        <button type="button" onClick={handleShareButton}>
          공유하기
        </button>
      </div>
      {toastStatus && <Toast message="📨 링크가 공유되었습니다 !" />}

    </ResultWrapper>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 5px;

  img {
    width:480px;
    height: 480px;
    max-width: 100%;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #fff;
  }
`;

const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: #232332;
  margin: 0 auto;

  & > img {
    position: absolute;
    width: 330px;
    height: 230px;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
  }

  & > .main__buttons {
    display: flex;
    gap: 20px;
    padding-top: 30px;
    margin: 0 auto;

    button {
      width: 130px;
      height: 40px;
      border: none;
      background-color: #fff;
      color: #000;
      font-size: 20px;
      font-weight: 700;
      border-radius: 25px;

      &:hover {
        cursor: pointer;
        background-color: #828282;
        color: #fff;
      }
    }
  }
  .winner__name{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    font-size: 24px;
    text-shadow: 1px 1px 3px #000;
  }
`;

export default ResultPage;
