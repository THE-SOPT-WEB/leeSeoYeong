import LetterForm from '../components/LetterForm';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { Letter } from '../types/Letter';

export default function EditPage() {
  const location = useLocation();
  const letterInfo = location.state as { letterInfo: Letter };

  return (
    <StWrapper>
      <header>
        <h1>편지를 몰래 수정하세요.</h1>
      </header>
      <LetterForm letterInfo={letterInfo} />
    </StWrapper>
  );
}
const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > header {
    display: flex;
    align-items: center;
    height: 70px;
    font-size: 36px;
    font-weight: bold;
  }
`;
