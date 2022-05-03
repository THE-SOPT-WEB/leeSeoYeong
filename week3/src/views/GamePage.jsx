import { React, useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import 버논 from "../img/버논.jpg";
import 서강준 from "../img/서강준.jpg";
import 원빈 from "../img/원빈.jpg";
import 차은우 from "../img/차은우.jpg";
import 남주혁 from "../img/남주혁.jpg";
import 로운 from "../img/로운.png";
import 이수혁 from "../img/이수혁.jpg";
import 유승호 from "../img/유승호.jpg";
import 대결 from "../img/vs.png";
import ResultPage from "../components/Result.jsx";

let gameInfo = [
  { name: "버논", src: 버논 },
  { name: "서강준", src: 서강준 },
  { name: "원빈", src: 원빈 },
  { name: "차은우", src: 차은우 },
  { name: "남주혁", src: 남주혁 },
  { name: "로운", src: 로운 },
  { name: "이수혁", src: 이수혁 },
  { name: "유승호", src: 유승호 },
];

function GamePage(props) {
  const [fighterList, setFighterList] = useState([]); //대결할 모든 후보자 저장
  const [isFinished, setIsFinished] = useState(false); //게임 끝 여부 저장
  const [isclick, setisclick] = useState(false); //클릭 여부 저장
  const [winner, setwinner] = useState(""); //둘 중 한 명 클릭 시 승자 저장

  let matchWinners = useRef([]); //해당 라운드 승리자 저장 배열
  let round = useRef(props.round / 2);

  useEffect(() => {
    gameInfo.sort(() => Math.random() - 0.5); //배열 랜덤 정렬
    setFighterList(gameInfo); //대결자 초기화
  }, []);

  useEffect(() => {
    if (fighterList.length === 0) {
      if (matchWinners.current.length === 1) {
        //마지막 라운드까지 모두 끝난 경우
        setIsFinished(true);
      } else if (
        matchWinners.current.length === props.round / 2 ||
        matchWinners.current.length === props.round / 4
      ) {
        setFighterList(matchWinners.current);
        round.current /= 2;
        matchWinners.current = [];
      }
    }
  }, [fighterList]);

  function handleClick(fighter) {
    setisclick(true);

    setTimeout(() => {
      setisclick(false);
      setwinner("");

      setFighterList(fighterList.slice(2));
      matchWinners.current.push(fighter);
    }, 500);
  }

  return (
    <MainWrapper>
      <h1 className="main__title">눈이 즐거운 이상형 월드컵</h1>
      {!isFinished && (
        <p className="main__round">
          {matchWinners.current.length + 1}/{round.current}
        </p>
      )}

      {isFinished ? (
        <ResultPage winner={matchWinners.current} />
      ) : (
        <MainContainer isclick={isclick}>
          {!isclick && <img src={대결} alt="대결" className="versus__img" />}
          {fighterList.map((fighter, idx) => {
            if (idx < 2) {
              return (
                <article
                  onClick={() => {
                    setwinner(fighter);
                    handleClick(fighter);
                  }}
                  className="cont__item"
                  key={fighter.name}
                >
                  <p className="item__name">{fighter.name}</p>
                  <WinnerImage
                    src={fighter.src}
                    alt={fighter.name}
                    isclick={winner.name === fighter.name}
                  />
                </article>
              );
            }
          })}
        </MainContainer>
      )}
    </MainWrapper>
  );
}
const WinnerImage = styled.img`
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
  src: ${(props) => props.src || null};
  alt: ${(props) => props.name || null};
  ${(props) =>
    props.isclick &&
    css`
      animation: zoom 1.5s ease;
      z-index: 1;
    `}
`;

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 5px;

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
