import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Letters from '../components/Letters';
import { client } from '../services';
import { useEffect, useState } from 'react';
import { Letter } from '../types/Letter';

export default function LettersPage() {
  const [letterInfo, setLetterInfo] = useState<Letter[]>([]);
  useEffect(() => {
    async function getLetterInfo() {
      try {
        const { data } = await client.get('/letter');
        setLetterInfo(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getLetterInfo();
  }, []);

  return (
    <StWrapper>
      <StHeader>
        <h1>웹파트 비밀 편지함</h1>
        <StLink to="/write">편지 쓰러가기</StLink>
      </StHeader>
      {letterInfo && <Letters letterInfo={letterInfo} />}
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
