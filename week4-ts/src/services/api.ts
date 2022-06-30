import axios from "axios";

export const api = axios.create({
  baseURL: "https://dapi.kakao.com/v2/local/search/keyword",
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_APP_KAKAO_AK}`,
  },
});
