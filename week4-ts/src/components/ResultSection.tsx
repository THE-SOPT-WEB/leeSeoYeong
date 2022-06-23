import { Store } from "../types";
import styled from "styled-components";
import Skeleton from "../components/Skeleton";

interface ResultSectionProps {
  storeInfo: Store[];
  isCheck: boolean;
  isLoading: boolean;
}

export default function ResultSection({
  storeInfo,
  isCheck,
  isLoading,
}: ResultSectionProps) {
  return (
    <>
      {isLoading &&
        new Array(10).fill(1).map((_, idx) => {
          return <Skeleton key={idx} />;
        })}
      {!isLoading &&
        storeInfo?.map(
          (
            { place_url, place_name, phone, distance, address_name }: Store,
            idx: number
          ) => (
            <StCard key={idx}>
              <a href={place_url || undefined}>{place_name}</a>
              <StCardInfo>
                <p className="info__tel">{phone || "번호 없음"}</p>
                {!isCheck ? (
                  <p>{distance}m</p>
                ) : (
                  <p className="info__address">{address_name}</p>
                )}
              </StCardInfo>
            </StCard>
          )
        )}
    </>
  );
}
const StCard = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  width: 280px;
  height: 80px;
  font-size: 14px;
  background-color: #fff;
  color: #000;
  border-radius: 10px;

  & > a {
    height: fit-content;
    font-size: 18px;
    font-weight: 700;
    padding-left: 20px;
    cursor: pointer;
    color: inherit;
  }
`;

const StCardInfo = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  font-weight: 400;
  justify-content: space-between;

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
  }

  & > .info__address {
    max-width: 150px;
    padding-right: 10px;
  }
`;
