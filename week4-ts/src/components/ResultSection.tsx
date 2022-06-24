import { Store } from "../types";
import Skeleton from "../components/Skeleton";
import StoreCard from "./StoreCard";

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
      {!isLoading && storeInfo.length === 0 ? (
        <div style={{ color: "#fff" }}>검색 결과가 없습니다.</div>
      ) : (
        storeInfo?.map((store: Store, idx: number) => (
          <StoreCard key={idx} store={store} isCheck={isCheck} />
        ))
      )}
    </>
  );
}
