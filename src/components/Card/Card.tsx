import { PureComponent } from 'react';
import styles from './Card.module.css';

interface CardProps {
  name: string;
  height: number;
  hair_color: string;
  skin_color: string;
  gender: string;
}

class PeopleItem extends PureComponent<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.people__item}>
        <div className={styles.item__name}>{this.props.name}</div>
        <div className={styles.item__info}>
          <div>Height: {this.props.height}</div>
          <div>Hair color: {this.props.hair_color}</div>
          <div>Skin color: {this.props.skin_color}</div>
          <div>Gender: {this.props.gender} </div>
        </div>
      </div>
    );
  }
}
export default PeopleItem;
