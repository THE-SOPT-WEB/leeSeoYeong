import styled from 'styled-components';
import LetterForm from '../components/LetterForm';

export default function WritePage() {
  return (
    <StWrapper>
      <header>
        <h1>비밀 편지를 써보세요.</h1>
      </header>
      <LetterForm letterInfo={null} />
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
