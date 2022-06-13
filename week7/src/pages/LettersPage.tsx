import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Letter from '../components/Letter';

export default function LettersPage() {
  return (
    <StWrapper>
      <StHeader>
        <h1>웹파트 비밀 편지함</h1>
        <StLink to="/write">편지 쓰러가기</StLink>
      </StHeader>
      <Letter />
    </StWrapper>
  );
}
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  background-color: #e1e1e1;
  & > h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;
const StLink = styled(Link)`
  position: absolute;
  right: 30px;
  border-radius: 15px;
  padding: 10px 20px;
  background-color: #ff9500;
  font-weight: bold;
  color: #fff;
`;
