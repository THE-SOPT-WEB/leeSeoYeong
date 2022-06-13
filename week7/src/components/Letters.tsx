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
        <StLetter key={_id} src={lock} />
      ))}
    </StWrapper>
  );
}
const StWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px 0;
`;
const StLetter = styled.img`
  width: 250px;
`;
