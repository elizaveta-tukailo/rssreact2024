interface ICard {
  id: number;
  name: string;
  image: string;
  status?: string;
  species: string;
  type: string;
  gender: string;
  location?: {
    name: string;
    url: string;
  };
}
export default ICard;
