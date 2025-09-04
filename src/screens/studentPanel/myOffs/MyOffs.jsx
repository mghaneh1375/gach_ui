import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext} from '@/App.jsx';
import {formatPrice} from '@/services/utility';
import {MyView, PhoneView} from '@/styles';
import {styles} from '../../../styles/common/styles';
import vars from '../../../styles/root';
import OffsCard from './offsCard/OffsCard.jsx';
import ProgressCard from './progressCard/ProgressCard.jsx';
import Translate from './translate';
import {getMyOffs} from './utility';
import {giveMyGifts} from './utilityBonus';
import GiftOffsCard from './offsCard/OffsCard.jsx';
function MyOffs(props) {
  const [discount, setDiscount] = useState(true);
  const [bonus, setBonus] = useState(false);
  const [data, setData] = useState();
  const [dataBonus, setDataBonus] = useState();
  const toggleDiscount = () => {
    setDiscount(!discount);
    if (bonus) {
      setBonus(!bonus);
    }
  };
  const toggleBonus = () => {
    setBonus(!bonus);
    if (discount === true) {
      setDiscount(!discount);
    }
  };
  // const queryString = require('query-string');
  const navigate = props.navigate;
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const fetchDiscount = React.useCallback(() => {
    dispatch({
      loading: true,
    });
    Promise.all([getMyOffs(props.token)]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
    });
  }, [navigate, props.token, dispatch]);
  const fetchBonus = React.useCallback(() => {
    dispatch({
      loading: true,
    });
    Promise.all([giveMyGifts(props.token)]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setDataBonus(res[0]);
    });
  }, [navigate, props.token, dispatch]);
  useEffectOnce(() => {
    fetchBonus();
    fetchDiscount();
  }, [fetchBonus, fetchDiscount]);
  return (
    <MyView>
      <PhoneView>
        <ProgressCard
          header={Translate.off}
          theme={vars.ORANGE}
          color={discount ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={discount ? '90%' : '10%'}
          onPress={() => toggleDiscount()}
          style={{
            ...styles.cursor_pointer,
          }}
          circleText={data === undefined ? 0 : data.length}
        />
        <ProgressCard
          header={Translate.bonus}
          theme={vars.ORANGE_RED}
          color={bonus ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={bonus ? '90%' : '10%'}
          onPress={() => toggleBonus()}
          style={{
            ...styles.cursor_pointer,
          }}
          circleText={dataBonus === undefined ? 0 : dataBonus.length}
        />
      </PhoneView>

      {discount && (
        <PhoneView>
          {data !== undefined &&
            data.map((elem, index) => {
              return (
                <OffsCard
                  key={index}
                  type={elem.type}
                  code={elem.code}
                  placeUse={elem.sectionFa}
                  expiredAt={elem.expireAt}
                  amount={
                    elem.type === 'value'
                      ? formatPrice(elem.amount)
                      : elem.amount
                  }
                />
              );
            })}
        </PhoneView>
      )}
      {bonus && (
        <PhoneView>
          {dataBonus !== undefined &&
            dataBonus.map((elem, index) => {
              return (
                <GiftOffsCard
                  key={index}
                  type={elem.type}
                  subType={elem.obj?.type}
                  code={elem.obj !== undefined ? elem.obj.code : undefined}
                  placeUse={
                    elem.obj !== undefined ? elem.obj.sectionFa : undefined
                  }
                  expiredAt={
                    elem.obj !== undefined ? elem.obj.expireAt : undefined
                  }
                  createdAt={elem.createdAt}
                  amount={
                    elem.label
                      ? elem.label
                      : elem.type === '' || elem.obj.type === 'value'
                      ? formatPrice(elem.obj.amount)
                      : elem.obj.amount
                  }
                  title={elem.label}
                />
              );
            })}
        </PhoneView>
      )}
    </MyView>
  );
}
export default MyOffs;
