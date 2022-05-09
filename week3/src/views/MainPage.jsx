import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <MainWrapper>
      <h1 className="main__title">눈이 즐거운 이상형 월드컵</h1>
      <Link to="/game" className="start__button">
        시작하기
      </Link>
    </MainWrapper>
  );
}

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #232332;
  width: 100vw;
  height: 100vh;
  gap: 30px;
  justify-content: center;
  align-items: center;

  .main__title {
    font-size: 36px;
    text-align: center;
    color: #fff;
  }

  .start__button {
    display:flex;
    width: 200px;
    height: 50px;
    font-size: 24px;
    background-color: #232332;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 20px;
    text-decoration:none;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      background-color: #fff;
      color: #232332;
      border: none;
    }
  }
`;

export default MainPage;
