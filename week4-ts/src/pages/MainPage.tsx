import styled from "styled-components";
import SearchSection from "../components/SearchSection";
import ResultSection from "../components/ResultSection";
import { useState, useEffect } from "react";
import { Store } from "../types";
import { getLocationBasedSearch } from "../services";

export default function MainPage() {
  const [storeInfo, setStoreInfo] = useState<Store[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const onClickSearchButton = (isCheck: boolean) => {
    setIsChecked(isCheck);

    if (isCheck) {
      searchLocationBased();
    }
  };

  const searchLocationBased = async () => {
    const data = await getLocationBasedSearch();

    setStoreInfo(data);
  };

  return (
    <StWrapper>
      <StHeader>
        <h1>노인코래방</h1>
      </StHeader>

      <SearchSection
        onClick={(isCheck: boolean) => onClickSearchButton(isCheck)}
      />
      <ResultSection storeInfo={storeInfo} isCheck={isChecked} />
    </StWrapper>
  );
}
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  height: 100%;
  min-height: 100vh;
  border: 2px solid #fff;
  border-radius: 15px;
  gap: 10px;
`;
const StHeader = styled.header`
  display: flex;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;
  width: 100%;
  border-bottom: 1px solid #fff;
  & > h1 {
    color: #fff;
    font-weight: bold;
  }
`;
