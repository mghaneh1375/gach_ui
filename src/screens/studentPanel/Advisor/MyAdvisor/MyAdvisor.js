import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {showSuccess} from '../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';
import Card from '../../../general/Advisors/Card';

function MyAdvisor(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [myAdvisor, setMyAdvisor] = useState();
  const [rate, setRate] = useState(0);

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getMyAdvisor,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      setMyAdvisor(res[0]);
      setRate(res[0].myRate);
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <CommonWebBox header={commonTranslator.myAdvisor}>
      {myAdvisor !== undefined && (
        <MyView>
          <PhoneView style={{...styles.marginRight60}}>
            <Card
              setRate={async rate => {
                dispatch({loading: true});
                let res = await generalRequest(
                  routes.rateToAdvisor,
                  'put',
                  {
                    rate: rate,
                  },
                  'rate',
                  state.token,
                );
                dispatch({loading: false});
                if (res !== null) {
                  showSuccess();
                  setRate(rate);
                  setMyAdvisor({
                    ...myAdvisor,
                    rate: res,
                  });
                }
              }}
              rate={rate}
              isMyAdvisor={true}
              hasOpenRequest={false}
              data={myAdvisor}
              onRemove={async () => {
                dispatch({loading: true});
                let res = await generalRequest(
                  routes.cancelAdvisor,
                  'delete',
                  undefined,
                  undefined,
                  state.token,
                );
                dispatch({loading: false});
                if (res !== null) {
                  showSuccess();
                  props.navigate('/advisors');
                }
              }}
            />
          </PhoneView>
          <EqualTwoTextInputs>
            <CommonButton title={'صحبت با مشاور'} />
            <CommonButton
              onPress={() => props.navigate('/myAdvisor/quiz')}
              title={'آزمون ها'}
            />
            <CommonButton title={'تغییر برنامه ریزی روزانه'} />
            <CommonButton title={'برنامه های مطالعه'} />
          </EqualTwoTextInputs>
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default MyAdvisor;
