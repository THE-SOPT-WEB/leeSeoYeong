import styled from 'styled-components';
import lock from '../assets/lock.png';

export default function Letter() {
  return (
    <StWrapper>
      <StLetter src={lock}></StLetter>
      <StLetter src={lock}></StLetter>
      <StLetter src={lock}></StLetter>
      <StLetter src={lock}></StLetter>
      <StLetter src={lock}></StLetter>
      <StLetter src={lock}></StLetter>
      <StLetter src={lock}></StLetter>
      <StLetter src={lock}></StLetter>
    </StWrapper>
  );
}
const StWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 20px 0;
  gap: 20px;
`;
const StLetter = styled.img`
  width: 250px;
`;
