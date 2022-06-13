import { client } from '.';
import { Letter } from '../types/Letter';

const PREFIX_URL = '/letter';

export const getLetters = async () => {
  try {
    const response = await client.get(`${PREFIX_URL}`);
    if (response !== null) {
      console.log('res: ' + response.data);
      return response.data.map((res: Letter) => ({
        title: res.title,
        password: res.password,
        hint: res.hint,
        content: res.content,
        images: res.images,
      }));
    } else throw '서버 통신 실패';
  } catch (err) {
    console.log(err);
    return null;
  }
};
