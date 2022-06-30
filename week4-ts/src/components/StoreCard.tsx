import styled from "styled-components";
import { Store } from "../types";

interface StoreCardProps {
  store: Store;
  isCheck: boolean;
}

export default function StoreCard({ store, isCheck }: StoreCardProps) {
  const { place_url, place_name, phone, distance, address_name } = store;

  return (
    <StCard>
      <a href={place_url || undefined}>{place_name}</a>
      <StCardInfo>
        <p className="info__tel">{phone || "번호 없음"}</p>
        {isCheck ? (
          <p>{distance}m</p>
        ) : (
          <p className="info__address">{address_name}</p>
        )}
      </StCardInfo>
    </StCard>
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
    font-size: 16px;
    font-weight: 700;
    padding-left: 20px;
    cursor: pointer;
    color: inherit;
  }
`;

const StCardInfo = styled.div`
  display: flex;
  gap: 20px;
  width: 95%;
  font-weight: 400;
  justify-content: space-between;

  & > .info__tel {
    width: 100px;
    height: fit-content;
    min-height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
    border-radius: 15px;
    background-color: #828282;
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
  }

  & > .info__address {
    max-width: 150px;
  }
`;
