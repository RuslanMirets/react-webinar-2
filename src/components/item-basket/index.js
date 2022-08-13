import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import { Link } from 'react-router-dom';
import './styles.css';
import { localize } from '../../utils/localize';
import useSelector from '../../utils/use-selector';

function ItemBasket(props) {
  const cn = bem('ItemBasket');

  const select = useSelector(state => ({
    language: state.localization.language,
  }));

  const callbacks = {
    onRemove: useCallback((e) => props.onRemove(props.item._id), [props.onRemove,  props.item])
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <Link to={`/${props.item._id}`} onClick={props.closeModal}>
          {props.item.title}
        </Link>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(props.item.amount || 0)} {localize['шт'][select.language]}</div>
        <div className={cn('cell')}><button onClick={callbacks.onRemove}>{localize['Удалить'][select.language]}</button></div>
      </div>
    </div>
  )
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  closeModal: propTypes.func,
  onRemove: propTypes.func,
}

ItemBasket.defaultProps = {
  closeModal: () => {},
}

export default React.memo(ItemBasket);
