import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {showSuccess} from '../../../services/Utility';
import {PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Card from './Card';

function Advisors(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const [myAdvisor, setMyAdvisor] = useState();
  const [hasOpenRequest, setHasOpenRequest] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all(
      state.token !== undefined && state.token !== null
        ? [
            generalRequest(
              routes.getAllAdvisors,
              'get',
              undefined,
              'data',
              undefined,
            ),
            generalRequest(
              routes.getMyAdvisor,
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.hasOpenRequest,
              'get',
              undefined,
              'data',
              state.token,
            ),
          ]
        : [
            generalRequest(
              routes.getAllAdvisors,
              'get',
              undefined,
              'data',
              undefined,
            ),
          ],
    ).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      if (state.token !== undefined && state.token !== null) {
        if (res[1] == null || res[2] == null) {
          props.navigate('/');
          return;
        }

        setMyAdvisor(res[1].id !== undefined ? res[1] : undefined);
        setHasOpenRequest(res[2] === 'yes');
      }

      setData(res[0]);
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <PhoneView
      style={{...styles.gap60, ...styles.margin30, ...styles.marginRight60}}>
      {data !== undefined &&
        data.map((elem, index) => {
          return (
            <Card
              isMyAdvisor={
                myAdvisor !== undefined ? elem.id === myAdvisor.id : false
              }
              hasOpenRequest={hasOpenRequest}
              key={index}
              data={elem}
              onSelect={async () => {
                dispatch({loading: true});
                let res = await generalRequest(
                  routes.sendAdvisorAcceptanceRequest + elem.id,
                  'post',
                  undefined,
                  'data',
                  state.token,
                );
                dispatch({loading: false});
                if (res !== null) {
                  setHasOpenRequest(true);
                  showSuccess(
                    'درخواست شما با موفقیت ثبت گردید و پس از بررسی مشاور نتیجه به اطلاع شما خواهد رسید',
                  );
                }
              }}
            />
          );
        })}
    </PhoneView>
  );
}

export default Advisors;
