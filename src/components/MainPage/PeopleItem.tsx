import { PureComponent } from 'react';
import classes from './MainPage.module.css';
import { Item } from '../../types';

class PeopleItem extends PureComponent<Item> {
  constructor(props: Item) {
    super(props);
  }
  render() {
    return (
      <div className={classes.item__wrapper}>
        <div className={classes.item__name}>{this.props.name}</div>
        <div className={classes.item__info}>
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
