import styled from 'styled-components';
import lock from '../assets/lock.png';
import { Letter } from '../types/Letter';
import Modal from '../components/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LetterProps {
  letterInfo: Letter;
}

export default function Letters({ letterInfo }: LetterProps) {
  const navigate = useNavigate();

  const { _id, name, content, hint, password, images } = letterInfo;
  const [isClickModal, setIsClickModal] = useState<boolean>(false);
  const [clickedInfo, setClickedInfo] = useState<Pick<Letter, '_id' | 'hint' | 'password'> | null>({
    _id: '',
    hint: '',
    password: '',
  });
  const [isVerified, setIsVerified] = useState<boolean>(false);

  return (
    <>
      {clickedInfo !== null && (
        <Modal
          hidden={!isClickModal}
          hideModal={() => setIsClickModal(false)}
          letterInfo={clickedInfo}
          isVerified={(isCorrect: boolean) => setIsVerified(isCorrect)}
        />
      )}
      <StImageWrapper key={_id}>
        {!isVerified ? (
          <img
            src={lock}
            onClick={() => {
              setIsClickModal(true);
              setClickedInfo({
                _id: _id,
                hint: hint,
                password: password,
              });
            }}
          />
        ) : (
          <StLetter>
            <StLetterImage>
              {images?.map((url: string) => (
                <StImage key={url} url={url} />
              ))}
            </StLetterImage>
            <h1>
              <span>{name}</span>님이 남긴 편지에요.
            </h1>
            <p>{content}</p>
            <StLink
              type="button"
              onClick={() => {
                navigate('/edit', { state: letterInfo });
              }}
            >
              내맘대로 수정하기
            </StLink>
          </StLetter>
        )}
      </StImageWrapper>
    </>
  );
}
const StImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  & > img {
    width: 250px;
  }
`;
const StLetter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ffebd0;
  border-radius: 10px;

  gap: 15px;
  width: 300px;
  height: 100%;
  padding: 10px;
  text-align: center;
  & > h1 {
    font-size: 18px;
    & > span {
      font-weight: bold;
    }
  }
`;
const StLetterImage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
`;
const StImage = styled.img<{ url: string }>`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-image: url(${({ url }) => url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
const StLink = styled.button`
  background-color: #ff9500;
  padding: 10px 20px;
  border-radius: 15px;
  color: #fff;
  font-weight: bold;
`;
