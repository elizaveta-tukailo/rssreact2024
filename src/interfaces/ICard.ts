interface ICard {
  id?: number;
  name: string;
  image: string;
  status?: string;
  species: string;
  type: string;
  gender: string;
  planet: string;
  created?: string;
  location?: {
    name: string;
    url: string;
  };
}
export default ICard;
