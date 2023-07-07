import React, {useState} from 'react';
import {CommonWebBox} from '../../../styles/Common';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {getProgressData} from './components/Utility';

function Progress(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();

  const params = useParams();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([getProgressData(state.token, params.userId)]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      setData(res[0]);
      console.log(res[0]);
    });
  }, [dispatch, props, params.userId, state.token]);

  useEffectOnce(() => {
    if (params.userId === undefined) {
      props.navigate('/');
      return;
    }
    fetchData();
  }, [fetchData]);

  return <CommonWebBox></CommonWebBox>;
}

export default Progress;
