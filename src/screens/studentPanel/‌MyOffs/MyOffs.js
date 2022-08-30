import React, {useState} from 'react';
import {MyView} from 'react-native-multi-selectbox';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import OffsCard from './OffsCard/OffsCard';
import ProgressCard from './ProgressCard/ProgressCard';
import Translate from './Translate';
import {getMyOffs} from './Utility';

function MyOffs(props) {
  const [discount, setDiscount] = useState(false);

  const [data, setData] = useState();
  const [selectedMyOffs, setSelectedMyOffs] = useState({});
  const toggleDiscount = () => {
    setDiscount(!discount);
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
  console.log(data);
  return (
    <MyView>
      <PhoneView>
        <ProgressCard
          header={Translate.off}
          theme={'orange'}
          color={discount ? vars.WHITE : vars.DARK_BLUE}
          width={250}
          percent={discount ? '90%' : '10%'}
          onPress={() => toggleDiscount()}
          style={{...styles.cursor_pointer}}
        />
      </PhoneView>
      {/* <ProgressCard
          header={Translate.off}
          theme={vars.DARK_BLUE}
          color={'#000'}
          width={250}
          percent={'20%'}
        />
        <ProgressCard
          header={'هر چیزی'}
          theme={vars.ORANGE_RED}
          color={vars.WHITE}
          width={180}
          percent={'90%'}
        />
      
      <ProgressCard
        header={'تخفیف'}
        theme={'orange'}
        color={vars.WHITE}
        width={250}
        percent={'50%'}
      />
      <ProgressCard
        header={'تخفیف'}
        theme={vars.DARK_BLUE}
        color={'#000'}
        width={250}
        percent={'20%'}
      />
      <ProgressCard
        header={'هر چیزی'}
        theme={vars.ORANGE_RED}
        color={vars.WHITE}
        width={180}
        percent={'90%'}
      /> */}

      {discount && (
        <PhoneView>
          {data !== undefined &&
            data.map((elem, index) => {
              // return <OffsCard key={index} text="sad" />;
              return (
                <OffsCard
                  key={index}
                  type={elem.type}
                  code={elem.code}
                  placeUse={elem.sectionFa}
                  expiredAt={elem.expireAt}
                  // percent={'10%'}
                  amount={elem.amount}
                />
              );
            })}
        </PhoneView>
      )}
    </MyView>
  );
}

export default MyOffs;
