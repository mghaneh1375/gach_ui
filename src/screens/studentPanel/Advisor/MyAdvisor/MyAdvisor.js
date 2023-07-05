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
  SimpleText,
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

      if (res[0].myRate !== undefined) {
        setMyAdvisor(res[0]);
        setRate(res[0].myRate);
      } else {
        setMyAdvisor(null);
      }
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <CommonWebBox header={commonTranslator.myAdvisor}>
      {myAdvisor !== undefined && myAdvisor !== null && (
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
      )}
      {myAdvisor === null && (
        <MyView style={{...styles.alignItemsCenter}}>
          <SimpleText
            style={{...styles.BlueBold}}
            text={'شما در حال حاضر مشاوری ندارید'}
          />
          <CommonButton
            onPress={() => props.navigate('/advisors')}
            theme={'dark'}
            title={'انتخاب مشاور'}
          />
        </MyView>
      )}

      <EqualTwoTextInputs>
        {myAdvisor !== undefined && myAdvisor !== null && (
          <CommonButton title={'صحبت با مشاور'} />
        )}

        <CommonButton
          onPress={() => props.navigate('/myAdvisor/quiz')}
          title={'آزمون ها'}
        />
        <CommonButton
          onPress={() => props.navigate('/myLifeStyle')}
          title={'تغییر برنامه ریزی روزانه'}
        />
        <CommonButton
          onPress={() => window.open('/mySchedules')}
          title={'برنامه های مطالعه'}
        />
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default MyAdvisor;
