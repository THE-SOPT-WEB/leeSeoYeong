import { api } from "./api";
import { Store } from "../types";

interface Location {
  x: number;
  y: number;
}
export const getLocationBasedSearch = async (): Promise<Store[]> => {
  const location = await getLocation();
  const { x, y } = location;

  const { data } = await api.get("", {
    params: {
      x: x,
      y: y,
      radius: 1000,
      query: "노래방",
    },
  });
  return data.documents;
};

export const getStoreBasedTown = async (town: string): Promise<Store[]> => {
  const location = await getLocation();
  const { x, y } = location;

  const { data } = await api.get("", {
    params: {
      x: x,
      y: y,
      radius: 1000,
      query: `${town}노래방`,
    },
  });
  return data.documents;
};

export const getLocation = (): Location | Promise<Location> => {
  if ("geolocation" in navigator) {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {
            coords: { latitude: y, longitude: x },
          } = position;
          resolve({ x, y });
        },
        (e) => {
          alert("HTTPS 연결을 확인해주세요.");
        }
      );
    });
  }

  return { x: 37.5426165, y: 126.962994 };
};
