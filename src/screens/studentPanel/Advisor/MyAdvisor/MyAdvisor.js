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
  const [myAdvisors, setMyAdvisors] = useState();
  const [rate, setRate] = useState(0);
  const [sessions, setSessions] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getMyAdvisors,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      if (res[0] === null) {
        dispatch({loading: false});
        props.navigate('/');
        return;
      }

      if (res[0].length > 0) {
        setMyAdvisors(res[0]);
        // setRate(res[0].myRate);

        Promise.all([
          generalRequest(
            routes.getMyCurrentRoom,
            'get',
            undefined,
            'data',
            state.token,
          ),
        ]).then(r => {
          dispatch({loading: false});

          if (r[0] != null) {
            setSessions(r[0]);
          }
        });
      } else {
        dispatch({loading: false});
        setMyAdvisors(null);
      }
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <CommonWebBox header={commonTranslator.myAdvisor}>
      <PhoneView>
        <CommonButton
          onPress={() => props.navigate('/myLifeStyle')}
          title={'تغییر برنامه ریزی روزانه'}
        />
        <CommonButton
          onPress={() => window.open('/mySchedules')}
          title={'برنامه های مطالعه'}
        />
      </PhoneView>

      {myAdvisors !== undefined &&
        myAdvisors !== null &&
        myAdvisors.map((myAdvisor, index) => {
          return (
            <>
              <PhoneView style={{...styles.marginRight60}} key={index}>
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
                      setMyAdvisors({
                        ...myAdvisors,
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
                {myAdvisors !== undefined && myAdvisors !== null && (
                  <CommonButton
                    onPress={() =>
                      window.open(
                        '/ticket?section=advisor&userId=' + myAdvisor.id,
                      )
                    }
                    title={'صحبت با مشاور'}
                  />
                )}

                <CommonButton
                  onPress={() => props.navigate('/myAdvisor/quiz')}
                  title={'آزمون ها'}
                />
              </EqualTwoTextInputs>
            </>
          );
        })}
      {myAdvisors === null && (
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

      {sessions !== undefined &&
        sessions.map((e, index) => {
          return (
            <CommonButton
              key={index}
              title={'رفتن به اتاق جلسه با ' + e.advisor}
              theme={'dark'}
              onPress={() => window.open(e.url)}
            />
          );
        })}
    </CommonWebBox>
  );
}

export default MyAdvisor;
