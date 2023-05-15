import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {CommonWebBox, SimpleText} from '../../../../styles/Common';

function DoHW(props) {
  const [hw, setHw] = useState();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const params = useParams();

  const fetchData = React.useCallback(() => {
    dispatch({loading: 'true'});

    Promise.all([
      generalRequest(
        routes.getMyHW + params.hwId,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: 'false'});
    });
  }, [dispatch, params, state.token]);

  useEffectOnce(() => {
    if (params.hwId === undefined) {
      props.navigate('/');
      return;
    }
    fetchData();
  });

  return (
    <CommonWebBox>
      {hw !== undefined && (
        <>
          <SimpleText text={hw.title} />
        </>
      )}
    </CommonWebBox>
  );
}

export default DoHW;
