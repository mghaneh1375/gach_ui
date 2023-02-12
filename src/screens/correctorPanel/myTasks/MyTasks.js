import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CommonWebBox} from '../../../styles/Common';

function MyTasks(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const fetchData = React.useCallback(() => {
    setLoading(true);

    Promise.all([
      generalRequest(routes.getMyTasks, 'get', undefined, 'data', state.token),
    ]).then(res => {
      setLoading(false);

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      setData(res[0]);
    });
  }, [props.navigate]);

  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);

  return <CommonWebBox header={'کارهای من'}>
      {data !== undefined && }
  </CommonWebBox>;
}

export default MyTasks;
