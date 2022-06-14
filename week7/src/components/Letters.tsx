import styled from 'styled-components';
import lock from '../assets/lock.png';
import { Letter } from '../types/Letter';
import Modal from '../components/Modal';
import { useState } from 'react';
import { client } from '../services';
import { stringify } from 'querystring';
import { Link } from 'react-router-dom';

interface LetterProps {
  letterInfo: Letter;
}

export default function Letters({ letterInfo }: LetterProps) {
  const [isClickModal, setIsClickModal] = useState<boolean>(false);
  const [clickedInfo, setClickedInfo] = useState<Pick<Letter, '_id' | 'hint' | 'password'> | null>({
    _id: '',
    hint: '',
    password: '',
  });
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [letter, setLetter] = useState<Letter | null>(null);

  const showLetterInfo = async (isCorrect: boolean, _id: string) => {
    setIsVerified(isCorrect);
    try {
      const { data } = await client.get(`/letter/${_id}`);
      setLetter(data.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {clickedInfo !== null && (
        <Modal
          hidden={!isClickModal}
          hideModal={() => setIsClickModal(false)}
          letterInfo={clickedInfo}
          isVerified={(isCorrect: boolean, _id: string) => showLetterInfo(isCorrect, _id)}
        />
      )}
      <StImageWrapper key={letterInfo._id}>
        {!isVerified ? (
          <img
            src={lock}
            onClick={() => {
              setIsClickModal(true);
              setClickedInfo({
                _id: letterInfo._id,
                hint: letterInfo.hint,
                password: letterInfo.password,
              });
            }}
          />
        ) : (
          letter && (
            <StLetter>
              <StLetterImage>
                {letter.images?.map((url: string) => (
                  <StImage key={url} url={url} />
                ))}
              </StLetterImage>
              <h1>
                <span>{letter.name}</span>님이 남긴 편지에요.
              </h1>
              <p>{letter.content}</p>
              <StLink to="/edit">내맘대로 수정하기</StLink>
            </StLetter>
          )
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
const StLink = styled(Link)`
  background-color: #ff9500;
  padding: 10px 20px;
  border-radius: 15px;
  color: #fff;
  font-weight: bold;
`;
