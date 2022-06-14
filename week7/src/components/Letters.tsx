import styled from 'styled-components';
import lock from '../assets/lock.png';
import { Letter } from '../types/Letter';
import Modal from '../components/Modal';
import { useState } from 'react';

interface LetterProps {
  letterInfo: Letter[];
}

export default function Letters({ letterInfo }: LetterProps) {
  const [isClickModal, setIsClickModal] = useState<boolean>(false);
  const [clickedInfo, setClickedInfo] = useState<Pick<Letter, 'hint' | 'password'> | null>(null);
  return (
    <StWrapper>
      {clickedInfo !== null && (
        <Modal
          hidden={!isClickModal}
          hideModal={() => setIsClickModal(false)}
          letterInfo={clickedInfo}
        />
      )}
      {letterInfo.map(({ _id, hint, password }) => (
        <StImageWrapper
          key={_id}
          onClick={() => {
            setIsClickModal(true);
            setClickedInfo({ hint, password });
          }}
        >
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
