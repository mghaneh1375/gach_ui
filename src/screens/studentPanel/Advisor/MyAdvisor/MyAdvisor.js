import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {showSuccess} from '../../../../services/Utility';
import {CommonWebBox, PhoneView} from '../../../../styles/Common';
import commonTranslator from '../../../../translator/Common';
import Card from '../../../general/Advisors/Card';

function MyAdvisor(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [myAdvisor, setMyAdvisor] = useState();

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
    });
  }, [dispatch, state.token, props]);

  useEffectOnce(() => {
    fetchData();
  });

  return (
    <CommonWebBox header={commonTranslator.myAdvisor}>
      {myAdvisor !== undefined && (
        <Card
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
      )}
    </CommonWebBox>
  );
}

export default MyAdvisor;
