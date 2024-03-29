import styled from 'styled-components';
import { useRef } from 'react';
import { Letter } from '../types/Letter';
import { useNavigate } from 'react-router-dom';
import { client } from '../services';

interface LetterFormProps {
  letterInfo: Letter | null;
}

type inputType = {
  name: string;
  password: string;
  hint: string;
  content: string;
};
type bodyType = Record<keyof inputType, string>;

export default function LetterForm({ letterInfo }: LetterFormProps) {
  let navigate = useNavigate();
  const isEditing = letterInfo ? true : false;
  const inputRef = useRef<HTMLInputElement>(null);

  const inputInfo = [
    { label: '이름', id: 'name', placeholder: '이름이 뭐에요?' },
    {
      label: '내용',
      id: 'content',
      placeholder: '무슨 내용의 편지를 써볼까요?',
    },
    {
      label: '비밀번호',
      id: 'password',
      placeholder: '비밀번호를 통해 편지를 잠궈보아요.',
      type: 'password',
    },
    {
      label: '비밀번호 힌트',
      id: 'hint',
      placeholder: '누군가 내 비밀편지를 보도록 비밀번호 힌트를 주세요.',
    },
  ];

  const onSubmitForm = async (e: React.FormEvent<HTMLInputElement | HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement;

    if (!isEditing) {
      const formData = new FormData();
      [...target.childNodes].forEach((t) => {
        [...t.childNodes].forEach((input: ChildNode | HTMLInputElement) => {
          if (input.nodeName === 'INPUT' && input instanceof HTMLInputElement) {
            if (input.type === 'file' && input.files) {
              Array.from(input.files).forEach((file) => {
                formData.append(input.id, file);
              });
            } else {
              formData.append(input.id, input.value);
            }
          }
        });
      });

      try {
        await client.post('/letter', formData);
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        let body: bodyType = {
          name: '',
          password: '',
          hint: '',
          content: '',
        };
        [...target.childNodes].forEach((t) => {
          [...t.childNodes].forEach((input: ChildNode | HTMLInputElement) => {
            if (input.nodeName === 'INPUT' && input instanceof HTMLInputElement) {
              if (
                input.id === 'name' ||
                input.id === 'hint' ||
                input.id === 'password' ||
                input.id === 'content'
              ) {
                body[input.id] = input.value;
              }
              // let id = input.id as keyof typeof body;
              // body[id] = input.value;
            }
          });
        });

        // await client.patch(`/letter/${letterInfo?._id}`, body);
        // navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const fillInputValue = (ref: HTMLInputElement) => {
    if (ref && letterInfo) {
      if (ref.id === 'name' || ref.id === 'content' || ref.id === 'hint' || ref.id === 'password')
        ref.value = letterInfo[ref.id] as string;
    }
  };

  return (
    <StWrapper
      onSubmit={(e: React.FormEvent<HTMLInputElement | HTMLFormElement>) => onSubmitForm(e)}
    >
      {inputInfo.map(({ label, id, placeholder, type }) => (
        <StInputWrapper key={id}>
          <label htmlFor={id}>{label}</label>
          <input type={type || 'text'} ref={fillInputValue} placeholder={placeholder} id={id} />
        </StInputWrapper>
      ))}
      {!isEditing && (
        <StInputWrapper>
          <label htmlFor="images">썸네일</label>
          <FileUploadButton
            onClick={(e) => {
              e.preventDefault();
              inputRef.current && inputRef.current.click();
            }}
          >
            이미지 업로드(jpg, jpeg, png)
          </FileUploadButton>
          <input
            type="file"
            accept="image/*"
            id="images"
            multiple
            ref={inputRef}
            style={{ display: 'none' }}
          />
        </StInputWrapper>
      )}

      <SubmitButton type="submit">{letterInfo ? '몰래 수정하기' : '비밀편지 보내기'}</SubmitButton>
    </StWrapper>
  );
}
const StWrapper = styled.form`
  display: flex;
  flex-direction: column;
  margin: 30px 0;

  width: 500px;
  gap: 35px;
  padding: 20px;
  border-radius: 18px;
  box-shadow: 5px 5px 10px 5px lightgray;
  background-color: #ffeebb;
  font-size: 20px;
  font-weight: bold;
  & input {
    width: 100%;
    outline: none;
    padding: 10px;
    border: none;
    border-radius: 18px;
  }
`;
const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const SubmitButton = styled.button`
  border-radius: 8px;
  background-color: orange;
  color: white;
  padding: 10px 0;
  border: none;
  font-weight: 700;
  font-size: 32px;
  &:hover {
    transform: scale(0.97);
  }
`;

const FileUploadButton = styled(SubmitButton)`
  padding: 5px 30px;
  font-size: 20px;
  background-color: #f0b86e;
`;
