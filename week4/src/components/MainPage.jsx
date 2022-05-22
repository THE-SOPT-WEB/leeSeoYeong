import { useState, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import styled from "styled-components";
import axios from "axios";
import StoreDataCard from "./StoreDataCard";
import SearchStore from "./SearchStore";

function MainPage() {
  const [beerStores, setBeerStores] = useState([]); //가게 정보 배열
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useRef("");

  useEffect(() => {
    setBeerStores([]); //가게 정보 담은 배열 초기화
  }, []);

  useEffect(() => {
    if (isChecked) {
      location.current.value = "";
    }
  }, [isChecked]);

  function handleSearchButton() {
    flushSync(() => setIsLoading(true));
    if (!isChecked) {
      //입력 지역 근처 검색
      getDataNearByTown(location.current.value);
    } else {
      //사용자 현 위치 검색
      getDataNearByUser();
    }
  }

  async function getDataNearByUser() {
    const { x, y } = await getLocation();

    const { data } = await axios.get(
      "https://dapi.kakao.com//v2/local/search/keyword",
      {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_AK}`,
        },
        params: {
          query: "맥주",
          x: x,
          y: y,
          radius: 1000,
        },
      }
    );
    data.documents.sort((a, b) => a.distance - b.distance);
    flushSync(() => setBeerStores(data.documents));
    setIsLoading(false);
  }

  async function getDataNearByTown(location) {
    if (location) {
      const { x, y } = await getLocationCoords(location);

      const { data } = await axios.get(
        "https://dapi.kakao.com//v2/local/search/keyword",
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_AK}`,
          },
          params: {
            query: `${location} 맥주`,
            x: x,
            y: y,
            radius: 1000,
          },
        }
      );
      data.documents.sort((a, b) => a.distance - b.distance); //거리순 정렬
      flushSync(() => setBeerStores(data.documents));
      setIsLoading(false);
    }
  }

  async function getLocationCoords(location) {
    //사용자가 입력한 지역 좌표얻기
    let coords = {};
    const { data } = await axios.get(
      "https://dapi.kakao.com//v2/local/search/keyword",
      {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_AK}`,
        },
        params: {
          query: location,
        },
      }
    );
    coords = data.documents[0];
    return coords;
  }

  const getLocation = (errHandler) => {
    if ("geolocation" in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const {
              coords: { latitude: y, longitude: x },
            } = position;
            resolve({ x, y });
          },
          (e) => {
            alert("HTTPS 연결을 확인해주세요.");
            errHandler && errHandler();
          }
        );
      });
    }
    return { x: 37.5426165, y: 126.962994 };
  };

  return (
    <>
      <MainWrapper>
        <MainContainer>
          <TitleSection>맥주 어디서 마실래?</TitleSection>

          <SearchStore
            onChange={() => setIsChecked((prev) => !prev)}
            location={location}
            isChecked={isChecked}
            handleSearchButton={handleSearchButton}
          />

          {!beerStores.length ? (
            <div className="empty__result">결과가 없습니다</div>
          ) : (
            <ResultSection>
              <CardWrapper>
                <StoreDataCard
                  isLoading={isLoading}
                  data={beerStores}
                  isChecked={location.current.value}
                />
              </CardWrapper>
            </ResultSection>
          )}
        </MainContainer>
      </MainWrapper>
    </>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainWrapper = styled(FlexBox)`
  height: 100%;
  min-height: 100vh;
  background-color: #232332;
`;

const MainContainer = styled.div`
  border: 2px solid #fff;
  border-radius: 10px;
  width: 320px;
  height: 100%;
  min-height: 95vh;

  & > .empty__result {
    display: flex;
    height: 50vh;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 22px;
    font-weight: 700;
  }
`;

const TitleSection = styled(FlexBox)`
  font-size: 36px;
  font-weight: 700;
  padding: 10px 0;
  color: #ffd724;
  width: 100%;
  border-bottom: 2px solid #fff;
`;

const ResultSection = styled(FlexBox)`
  padding: 10px 0;
  width: 100%;
  gap: 15px;
  color: #fff;
`;

const CardWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
`;

export default MainPage;
