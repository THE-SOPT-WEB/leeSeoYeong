import LetterForm from '../components/LetterForm';
import styled from 'styled-components';

export default function EditPage() {
  return (
    <StWrapper>
      <header>
        <h1>편지를 몰래 수정하세요.</h1>
      </header>
      <LetterForm />
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
