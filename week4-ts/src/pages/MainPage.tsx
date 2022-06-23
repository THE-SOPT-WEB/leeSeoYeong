import styled from "styled-components";
import SearchSection from "../components/SearchSection";

export default function MainPage() {
  return (
    <StWrapper>
      <StHeader>
        <h1>노인코래방</h1>
      </StHeader>

      <SearchSection />
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
