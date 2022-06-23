import { Store } from "../types";

interface ResultSectionProps {
  storeInfo: Store[];
}

export default function ResultSection({ storeInfo }: ResultSectionProps) {
  return (
    <>
      {storeInfo.map((store: Store) => (
        <div></div>
      ))}
    </>
  );
}
