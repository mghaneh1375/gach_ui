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
    <>
      <PhoneView style={{...styles.justifyContentCenter}}>
        <CommonButton
          onPress={() => props.navigate('/myLifeStyle')}
          title={'تغییر برنامه ریزی روزانه'}
        />
        {myAdvisors !== undefined &&
          myAdvisors !== null &&
          myAdvisors.length > 0 && (
            <>
              <CommonButton
                theme={'dark'}
                onPress={() => window.open('/mySchedules')}
                title={'برنامه های مطالعه'}
              />

              <CommonButton
                theme={'orangeRed'}
                onPress={() => props.navigate('/myAdvisor/quiz')}
                title={'آزمون ها'}
              />
            </>
          )}
      </PhoneView>
      <CommonWebBox header={'لیست مشاوران من'} />

      <PhoneView
        style={{
          ...styles.gap50,
          ...styles.marginTop20,
        }}>
        {myAdvisors !== undefined &&
          myAdvisors !== null &&
          myAdvisors.map((myAdvisor, index) => {
            return (
              <Card
                key={index}
                setRate={async rate => {
                  dispatch({loading: true});
                  let res = await generalRequest(
                    routes.rateToAdvisor + myAdvisor.id,
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
                    myAdvisor.myRate = rate;
                    myAdvisor.rate = res;
                    let tmp = myAdvisors.map(e => {
                      if (e.id == myAdvisor.id) return myAdvisor;
                      return e;
                    });
                    setMyAdvisors(tmp);
                  }
                }}
                rate={myAdvisor.myRate}
                isMyAdvisor={true}
                showMyAdvisor={false}
                hasOpenRequest={false}
                data={myAdvisor}
                onRemove={async () => {
                  dispatch({loading: true});
                  let res = await generalRequest(
                    routes.cancelAdvisor + myAdvisor.id,
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
                btn={
                  <CommonButton
                    onPress={() =>
                      window.open(
                        '/ticket?section=advisor&userId=' + myAdvisor.id,
                      )
                    }
                    theme={'dark'}
                    title={'صحبت با مشاور'}
                  />
                }
              />
            );
          })}
      </PhoneView>
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
      {sessions !== undefined && sessions.length > 0 && (
        <CommonWebBox header={'جلسات آنلاین'}>
          <PhoneView>
            {sessions.map((e, index) => {
              return (
                <CommonButton
                  key={index}
                  title={'رفتن به اتاق جلسه با ' + e.advisor}
                  theme={'dark'}
                  onPress={() => window.open(e.url)}
                />
              );
            })}
          </PhoneView>
        </CommonWebBox>
      )}
    </>
  );
}

export default MyAdvisor;
