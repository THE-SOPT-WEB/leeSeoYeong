import { React, useState, useEffect } from "react";
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
  const [competitors, setCompetitors] = useState([objs[0], objs[1]]); //경쟁할 두 명 저장 배열
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    console.log(competitors);
    setCompetitors([objs[0], objs[1]]);
  }, []);

  function handleImage() {
    console.log(competitors);
  }

  return (
    <MainWrapper>
      <h1 className="main__title">눈이 즐거운 이상형 월드컵</h1>
      <p className="main__round">1/{objs.length / 2}</p>
      <MainContainer>
        {competitors.map((competitor) => {
          return (
            <article onClick={handleImage} className="cont__item">
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
  gap:5px;

  .cont__item {
    display: flex;
    position: relative;
    margin: 0 auto;
  }
  .item__name {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 24px;
    color: #fff;
    text-shadow: 1px 1px 3px #000;
    z-index:1;
  }

  img {
    width: 500px;
    height: 500px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0px 0px 3px #fff;

    &:hover{
      cursor:pointer;
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
    margin:20px auto;
  }
  .main__round {
    font-size: 24px;
    margin:0 auto 10px auto;
  }
`;

export default App;
