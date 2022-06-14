export interface Letter {
  _id: string;
  name?: string;
  title: string;
  password: string;
  hint: string;
  content: string;
  images: string[] | null;
}
