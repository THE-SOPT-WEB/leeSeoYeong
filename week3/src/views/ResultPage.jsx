import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import 왕관 from "../img/crown.png";

function ResultPage({ winner }) {
  return (
    <ResultWrapper>
      <img src={왕관} alt="왕관" />
      <ImageWrapper>
        <img src={winner.src} alt={winner.name} className="item__img" />
      </ImageWrapper>
      <div className="main__buttons">
        <Link to="/">
          <button type="button">다시하기</button>
        </Link>
        <button type="button">공유하기</button>
      </div>
    </ResultWrapper>
  );
}

const ImageWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 5px;

  img {
    width: 500px;
    height: 500px;
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
    width: 300px;
    height: 200px;
    top: 40px;
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
`;

export default ResultPage;
