import styled from "styled-components";
import { useState, useEffect } from "react";

function MainPage() {
  const [result, setResult] = useState([1]);
  return (
    <MainWrapper>
      <MainContainer>
        <TitleSection>
          <h1>우리 동네 맥주집</h1>
        </TitleSection>

        <SearchSection>
          <SearchBox>
            <strong>현재 위치에서 검색하기</strong>
            <input type="checkbox" />
          </SearchBox>
          <SearchByMyTownBox>
            <strong>🔻우리 동네 근처로 검색하기🔻</strong>
            <SearchInput type="text" placeholder="지역을 입력해주세요." />
            <SearchButton type="button">검색하기</SearchButton>
          </SearchByMyTownBox>
        </SearchSection>

        {!result.length ? (
          <div className="empty__result">결과가 없습니다</div>
        ) : (
          <ResultSection>
            <CardWrapper>
              <Card>
                <CardTitle>크라운호프</CardTitle>
                <InfoBox>
                  <p className="info__tel">010-5661-7907</p>
                  <p>청파동1가 23-456</p>
                </InfoBox>
              </Card>
              <Card>
                <CardTitle>원래는 치킨집을 하려고 했다</CardTitle>
                <InfoBox>
                  <p className="info__tel">02-8643-7213</p>
                  <p className="info__address">청파동3가 456-78 청송빌딩 1층</p>
                </InfoBox>
              </Card>
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
    font-size:22px;
    font-weight:700;
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

const CardTitle = styled.strong`
  height: fit-content;
  font-size: 18px;
  font-weight: 700;
  padding-left: 20px;
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
