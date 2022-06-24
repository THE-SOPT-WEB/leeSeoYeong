import styled from "styled-components";
import SearchSection from "../components/SearchSection";
import ResultSection from "../components/ResultSection";
import { useState } from "react";
import { Store } from "../types";
import { getLocationBasedSearch, getStoreBasedTown } from "../services";

export default function MainPage() {
  const [storeInfo, setStoreInfo] = useState<Store[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const onClickSearchButton = (isCheck: boolean, myTown: string) => {
    setIsChecked(isCheck);
    setIsLoading(true);

    if (isCheck) {
      searchLocationBased().then((res) => {
        setStoreInfo(res);
        setIsLoading(false);
      });
    } else {
      searchTownBased(myTown).then((res) => {
        setStoreInfo(res);
        setIsLoading(false);
      });
    }
  };

  const searchLocationBased = async () => {
    const data = await getLocationBasedSearch();
    return data;
  };

  const searchTownBased = async (myTown: string) => {
    const data = await getStoreBasedTown(myTown);
    return data;
  };

  return (
    <StWrapper>
      <StHeader>
        <h1>노인코래방</h1>
      </StHeader>

      <SearchSection
        onClick={(isCheck: boolean, myTown: string) =>
          onClickSearchButton(isCheck, myTown)
        }
      />
      <ResultSection
        storeInfo={storeInfo}
        isCheck={isChecked}
        isLoading={isLoading}
      />
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
  width: 100%;
  border-bottom: 1px solid #fff;
  & > h1 {
    color: #fff;
    font-weight: bold;
    font-size: 22px;
    background-image: linear-gradient(
      90deg,
      red,
      orange,
      yellow,
      green,
      aqua,
      purple
    );
    -webkit-background-clip: text;
    color: transparent;
  }
`;
