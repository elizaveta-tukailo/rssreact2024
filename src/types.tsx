export type InputValue = {
  value: string;
};
export type Item = {
  id?: number;
  name: string;
  height: number;
  hair_color: string;
  skin_color: string;
  gender: string;
};
export type State = {
  error: null;
  isLoaded: boolean;
  items: Item[];
};
