import styled from "styled-components";

function SearchStore({ onChange, location, isChecked, handleSearchButton }) {
  const onEnterPress = (e) => {
    if (e.key === "Enter") {
      handleSearchButton();
    }
  };

  return (
    <SearchSection>
      <SearchWrapper>
        <strong>현재 위치에서 검색하기</strong>
        <input type="checkbox" onChange={onChange} />
      </SearchWrapper>
      <SearchByMyTownWrapper>
        <strong>🔻특정 장소 주변에서 검색하기🔻</strong>
        <SearchInput
          type="text"
          placeholder="지역을 입력해주세요."
          ref={location}
          disabled={isChecked}
          onKeyPress={onEnterPress}
        />
        <SearchButton type="button" onClick={handleSearchButton}>
          검색하기
        </SearchButton>
      </SearchByMyTownWrapper>
    </SearchSection>
  );
}

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchSection = styled(FlexBox)`
  padding: 10px 0;
  gap: 15px;
  font-size: 22px;
  color: #fff;
  border-bottom: 2px solid #fff;
  width: 100%;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const SearchByMyTownWrapper = styled(FlexBox)`
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

export default SearchStore;
