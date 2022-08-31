import React, {useState} from 'react';
import {MyView} from 'react-native-multi-selectbox';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {formatPrice} from '../../../services/Utility';
import {CommonWebBox, PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import OffsCard from './OffsCard/OffsCard';
import ProgressCard from './ProgressCard/ProgressCard';
import Translate from './Translate';
import {getMyOffs} from './Utility';

function MyOffs(props) {
  const [discount, setDiscount] = useState(false);
  const [bonus, setBonus] = useState(false);

  const [data, setData] = useState();
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
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getMyOffs(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
    });
  }, [navigate, props.token, dispatch]);

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
          style={{...styles.cursor_pointer}}
          circleText={data === undefined ? 0 : data.length}
        />
        <ProgressCard
          header={Translate.bonus}
          theme={vars.ORANGE_RED}
          color={bonus ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={bonus ? '90%' : '10%'}
          onPress={() => toggleBonus()}
          style={{...styles.cursor_pointer}}
          circleText={0}
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
          {/* {data !== undefined &&
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
            })} */}
          <CommonWebBox header={Translate.bonus}></CommonWebBox>
        </PhoneView>
      )}
    </MyView>
  );
}

export default MyOffs;
