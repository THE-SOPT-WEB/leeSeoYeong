import styled from 'styled-components';
import { Letter } from '../types/Letter';
import { useState } from 'react';

interface ModalProps {
  hidden: boolean;
  hideModal: () => void;
  letterInfo: Pick<Letter, 'hint' | 'password'>;
}

export default function Modal({ hidden, hideModal, letterInfo }: ModalProps) {
  const { hint, password } = letterInfo;
  const [input, setInput] = useState('');
  return (
    <>
      {!hidden && (
        <StWrapper>
          <StModal>
            <h1>비밀번호를 입력해주세요.</h1>
            <p>{hint}</p>
            <StInput type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <StButtonWrapper>
              <button type="button">OK</button>
              <button type="button" onClick={hideModal}>
                cancel
              </button>
            </StButtonWrapper>
          </StModal>
        </StWrapper>
      )}
    </>
  );
}
const StWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
const StModal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 36px;

  width: 400px;
  padding: 20px 0;
  background: #f2f2f2;
  border-radius: 41px;
  z-index: 1;

  animation: 0.3s scale ease-in-out;
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.8);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const StInput = styled.input`
  border: none;
  border-radius: 15px;
  width: 80%;
  padding: 10px 0;
`;
const StButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  & > button {
    padding: 10px 20px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    border-radius: 15px;
    background-color: #ff9500;
    & + button {
      background-color: #bdbdbd;
    }
  }
`;
