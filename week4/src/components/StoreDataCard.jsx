import styled from "styled-components";
import Skeleton from "./Skeleton";

function StoreDataCard({ isLoading, data, isChecked }) {
  return (
    <>
      {isLoading
        ? new Array(10).fill(1).map((_, idx) => {
            return <Skeleton key={idx} />;
          })
        : data &&
          data.map((beerstore, idx) => {
            return (
              <Card key={idx}>
                <CardTitle href={beerstore.place_url || null}>
                  {beerstore.place_name}
                </CardTitle>
                <InfoBox>
                  <p className="info__tel">{beerstore.phone || "번호 없음"}</p>
                  {!isChecked ? (
                    <p className="info__address">{beerstore.distance}m</p>
                  ) : (
                    <p className="info__address">{beerstore.address_name}</p>
                  )}
                </InfoBox>
              </Card>
            );
          })}
    </>
  );
}

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

export default StoreDataCard;
