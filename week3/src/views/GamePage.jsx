import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import 버논 from "../img/버논.jpg";
import 서강준 from "../img/서강준.jpg";
import 원빈 from "../img/원빈.jpg";
import 차은우 from "../img/차은우.jpg";
import 대결 from "../img/vs.png";
import ResultPage from "../components/Result.jsx";

const gameInfo = [
  { name: "버논", src: 버논 },
  { name: "서강준", src: 서강준 },
  { name: "원빈", src: 원빈 },
  { name: "차은우", src: 차은우 },
];

function GamePage() {
  const [fighterInfo, setFighterInfo] = useState([]);
  const [fighterList, setFighterList] = useState([]);
  const [round, setRound] = useState(1);
  const [totalRound, setTotalRound] = useState(2);
  const [isFinished, setIsFinished] = useState(false);
  const [isclick, setIsClick] = useState(false);
  let matchWinners = useRef([]);
  
  useEffect(() => {
    setFighterInfo(gameInfo);
    setFighterList([gameInfo[0], gameInfo[1]]);
  }, []);


  function handleClick(e) {
    e.target.classList.add("active");
    setIsClick(true);

    setTimeout(() => {
      e.target.classList.remove("active");
      setIsClick(false);

      let target = e.target.alt; //이미지 태그의 alt: 연예인 이름
      gameInfo.forEach((info) => {
        if (info.name === target) {
          matchWinners.current.push(info);
        }
      });
      if (totalRound === 1 && matchWinners.current.length === 1) {
        //모든 라운드가 끝난 경우
        setIsFinished(true);
        setFighterInfo(matchWinners.current[0]);
      }
      if (fighterInfo.length === 1) {
        //준결승 2번째 클릭 시-> 결승 진출
        setRound(1);
        setTotalRound(1);
        setFighterInfo([matchWinners.current]);
        setFighterList([matchWinners.current[0], matchWinners.current[1]]);

        matchWinners.current = [];
      } else {
        //준결승 1번째 클릭 시 -> 2번째 후보들 출전
        setFighterInfo([fighterInfo.slice(2)]);
        setFighterList([gameInfo[2], gameInfo[3]]);

        setRound((prev) => prev + 1);
      }
    }, 1500);
  }

  return (
    <MainWrapper>
      <h1 className="main__title">눈이 즐거운 이상형 월드컵</h1>
      <p className="main__round">
        {round}/{fighterList.length}
      </p>

      {isFinished ? (
        <ResultPage winner={fighterInfo[0]} />
      ) : (
        <MainContainer>
            {!isclick && <img src={대결} alt="대결" className="versus__img" />}
          {fighterList.map((fighter) => {
            return (
              <article
                onClick={handleClick}
                className="cont__item"
                key={fighter.name}
              >
                <p className="item__name">{fighter.name}</p>
                <img
                  src={fighter.src}
                  alt={fighter.name}
                  className="item__img"
                />
              </article>
            );
          })}
        </MainContainer>
      )}
    </MainWrapper>
  );
}

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 5px;

  .hide {
    display: none;
  }

  .versus__img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    z-index: 1;
  }

  .cont__item {
    display: flex;
    position: relative;
  }
  .item__name {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 24px;
    color: #fff;
    text-shadow: 1px 1px 3px #000;
    z-index: 1;
  }

  .item__img {
    width: 500px;
    height: 500px;
    max-width: 100%;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #fff;

    &:hover {
      cursor: pointer;
      transform: scale(1.01);
    }
  }
  .item__img.active {
    animation: zoom 1.5s ease;
    z-index: 1;
  }

  @keyframes zoom {
    0% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1.3, 1.3);
    }
  }
`;

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  font-family: "Noto Sans KR", sans-serif;
  width: 100vw;
  height: 100vh;
  color: #fff;
  background-color: #232332;

  .main__title,
  .main__round {
    text-shadow: 1px 1px 3px #fff;
  }
  .main__title {
    font-size: 36px;
    margin: 20px auto;
    text-align: center;
  }
  .main__round {
    font-size: 24px;
    margin: 0 auto 10px auto;
  }
`;

export default GamePage;
