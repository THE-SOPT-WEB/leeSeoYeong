import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

function MainPage() {
  const [result, setResult] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const location = useRef("");

  useEffect(() => {
    setResult([]);
  }, []);

  function handleSearchButton() {
    if (!isClicked) {
      //입력 지역 근처 검색
      console.log(location.current.value);
      getDataNearByTown(location.current.value);
    } else {
      //사용자 현 위치 검색
      getDataNearByUser();
    }
  }

  async function getDataNearByUser() {
    const { x, y } = await getUserLocation();

    const res = await axios
      .get("https://dapi.kakao.com//v2/local/search/keyword", {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_AK}`,
        },
        params: {
          query: "맥주",
          x: x,
          y: y,
          radius: 1000,
        },
      })
      .then(({ data }) => setResult(data.documents));
  }

  async function getDataNearByTown(location) {
    const res = await axios
      .get("https://dapi.kakao.com//v2/local/search/keyword", {
        headers: {
          Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_AK}`,
        },
        params: {
          query: `${location} 맥주`,
          radius: 1000,
        },
      })
      .then((response) => console.log(response.data));
    console.log("우리 동네 근처");
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

  // 유저의 현재 위치 가져오기
  async function getUserLocation() {
    const res = await getLocation();
    return res;
  }

  return (
    <MainWrapper>
      <MainContainer>
        <TitleSection>
          <h1>우리 동네 맥주집</h1>
        </TitleSection>

        <SearchSection>
          <SearchBox>
            <strong>현재 위치에서 검색하기</strong>
            <input type="checkbox" onChange={() => setIsClicked(!isClicked)} />
          </SearchBox>
          <SearchByMyTownBox>
            <strong>🔻우리 동네 근처로 검색하기🔻</strong>
            <SearchInput
              type="text"
              placeholder="지역을 입력해주세요."
              ref={location}
              disabled={isClicked}
            />
            <SearchButton type="button" onClick={handleSearchButton}>
              검색하기
            </SearchButton>
          </SearchByMyTownBox>
        </SearchSection>

        {!result.length ? (
          <div className="empty__result">결과가 없습니다</div>
        ) : (
          <ResultSection>
            <CardWrapper>
              {result &&
                result.map((res, idx) => {
                  return (
                    <Card key={idx}>
                      <CardTitle href={res.place_url || null}>
                        {res.place_name}
                      </CardTitle>
                      <InfoBox>
                        <p className="info__tel">{res.phone || "번호 없음"}</p>
                        {res.distance ? (
                          <p>{res.distance}m</p>
                        ) : (
                          <p>{res.address_name}</p>
                        )}
                      </InfoBox>
                    </Card>
                  );
                })}
            </CardWrapper>
          </ResultSection>
        )}
      </MainContainer>
    </MainWrapper>
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

const SearchSection = styled(FlexBox)`
  padding: 10px 0;
  gap: 15px;
  font-size: 22px;
  color: #fff;
  border-bottom: 2px solid #fff;
  width: 100%;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const SearchByMyTownBox = styled(FlexBox)`
  gap: 15px;
`;

const SearchInput = styled.input`
  border-radius: 5px;
`;

const SearchButton = styled.button`
  border: none;
  border-radius: 10px;
  background-color: #fff;
  color: #000;
  font-weight: 700;

  width: 70px;
  height: 25px;

  &:hover {
    background-color: #828282;
    color: #fff;
  }
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

const Card = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  height: 80px;
  font-size: 14px;
  background-color: #fff;
  color: #000;
  border-radius: 10px;
`;

const CardTitle = styled.a`
  height: fit-content;
  font-size: 18px;
  font-weight: 700;
  padding-left: 20px;
  cursor: pointer;
`;

const InfoBox = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  font-weight: 400;

  & > .info__tel {
    width: 100px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    border-radius: 15px;
    background-color: #828282;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
  }

  & > .info__address {
    width: 150px;
    padding-right: 3px;
  }
`;

export default MainPage;
