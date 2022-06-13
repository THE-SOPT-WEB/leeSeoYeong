import styled from 'styled-components';
import lock from '../assets/lock.png';
import { Letter } from '../types/Letter';

interface LetterProps {
  letterInfo: Letter[];
}

export default function Letters({ letterInfo }: LetterProps) {
  return (
    <StWrapper>
      {letterInfo.map(({ _id }) => (
        <StImageWrapper key={_id}>
          <img src={lock} />
        </StImageWrapper>
      ))}
    </StWrapper>
  );
}
const StWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px 0;
`;
const StImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  & > img {
    width: 250px;
  }
`;
