import {dispatchStateContext, globalStateContext} from '../../../../App';
import React, {useState} from 'react';
import {QuizProvider} from '../../../panel/quiz/components/Context';
import List from './components/List';
import {useParams} from 'react-router';

function MyHWs(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const params = useParams();
  const status = params.mode !== undefined ? params.mode : 'all';

  return (
    <List
      status={status}
      user={state.user}
      advisor={props.advisor === undefined ? false : props.advisor}
      setLoading={setLoading}
      token={state.token}
      navigate={props.navigate}
    />
  );
}

export default MyHWs;
