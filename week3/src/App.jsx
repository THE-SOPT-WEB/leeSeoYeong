import { React, useState, useEffect, useRef } from "react";
import styled from "styled-components";
import 버논 from "./img/버논.jpg";
import 서강준 from "./img/서강준.jpg";
import 원빈 from "./img/원빈.jpg";
import 차은우 from "./img/차은우.jpg";

const objs = [
  { name: "버논", src: 버논 },
  { name: "서강준", src: 서강준 },
  { name: "원빈", src: 원빈 },
  { name: "차은우", src: 차은우 },
];

function App() {
  const [persons, setPersons] = useState([]);
  const [competitors, setCompetitors] = useState([objs[0], objs[1]]); //경쟁할 두 명 저장 배열
  const [roundCount, setRoundCount] = useState(1);
  const [totalRoundCount, setTotalRoundCount] = useState(2);
  const [winners, setWinners] = useState([]);

  const result = useRef(null);

  useEffect(() => {
    setPersons(objs);
    setCompetitors([objs[0], objs[1]]);
  }, []);

  useEffect(() => {
    console.log("winners", winners);
  }, [winners]);


  function handleClick(e) {
    if (persons.length <= 2) {
      //결승
      if (winners.length === 0) {
        result.current.innerText = e.target.alt;
        for (let obj of objs) {
          if (obj.name === e.target.alt) {
            setCompetitors([obj]);
          }
        }
      } else {
        setTotalRoundCount(1);
        setRoundCount(1);

        let newCompetitors;
        for (let obj of objs) {
          if (obj.name === e.target.alt) {
            newCompetitors = [winners[0], obj];
          }
        }
        setPersons(newCompetitors);
        setCompetitors([newCompetitors[0], newCompetitors[1]]);
        setWinners([]);
      }
    } else if (persons.length > 2) {
      //준결승
      for (let obj of objs) {
        if (obj.name === e.target.alt) {
          setWinners([obj]);
        }
      }
      setCompetitors([persons[2], persons[3]]);
      setPersons(persons.slice(2));
      setRoundCount((prev) => prev + 1);
    }
  }

  return (
    <MainWrapper>
      <h1 className="main__title">눈이 즐거운 이상형 월드컵</h1>
      <p className="main__round" ref={result}>
        {roundCount}/{totalRoundCount}
      </p>
      <MainContainer>
        {competitors.map((competitor) => {
          return (
            <article onClick={handleClick} className="cont__item">
              <p className="item__name">{competitor.name}</p>
              <img
                src={competitor.src}
                alt={competitor.name}
                className="item__img"
              />
            </article>
          );
        })}
      </MainContainer>
    </MainWrapper>
  );
}
const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 5px;

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

  img {
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

export default App;
