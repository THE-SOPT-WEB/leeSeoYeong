import styled from "styled-components";

export default function SearchSection() {
  return (
    <StWrapper>
      <StCheckBoxWrapper>
        <label htmlFor="checkbox">지역 기반으로 검색</label>
        <input type="checkbox" id="checkbox" />
      </StCheckBoxWrapper>

      <StTextInputWrapper>
        <label htmlFor="text">우리 동네는 여기에요</label>
        <input type="text" placeholder="지역을 입력해주세요." />
      </StTextInputWrapper>

      <StSearchButton type="button">검색하기</StSearchButton>
    </StWrapper>
  );
}

const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  gap: 10px;
  font-size: 20px;
  color: #fff;
  border-bottom: 2px solid #fff;
  width: 100%;
`;
const StCheckBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  & > label {
    color: #fff;
    font-weight: bold;
  }
`;
const StTextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
const StSearchButton = styled.button`
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
