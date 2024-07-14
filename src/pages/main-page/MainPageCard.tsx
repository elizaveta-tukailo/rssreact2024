import styles from './main-page.module.css';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import ICard from '../../interfaces/ICard';

const MainPageCard = (props: ICard) => {
  const [state, setState] = useState('activeCard');

  const activeFilter = (event: React.MouseEvent): void => {
    localStorage.setItem('active', state);
    setState(event.currentTarget.id);
  };
  const activeStyle = localStorage.getItem('active');
  return (
    <div className={styles['main-people__item-wrap']} key={props.id}>
      <div className={styles['main-people__item']}>
        <NavLink
          to={`details/${props.id}`}
          className={
            activeStyle === 'activeCard'
              ? `${styles['main-people__item-image']} ${styles['main-people__item-image--disabled']}`
              : `${styles['main-people__item-image']}`
          }
          onClick={activeFilter}
        >
          <img
            className={styles.itemimg}
            src={props.image}
            alt="person name"
            id="activeCard"
          ></img>
        </NavLink>
      </div>

      <div className={styles['main-people__item-info']}>
        <h3 className={styles['main-people__item-title']}> {props.name} </h3>
        {props.planet && (
          <div className={styles['info__item']}>Planet: {props.planet}</div>
        )}
        {props.gender && (
          <div className={styles['info__item']}>{props.gender}</div>
        )}
      </div>
    </div>
  );
};

export default MainPageCard;
