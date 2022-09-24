import {dispatchStateContext} from '../../../../App';
import React, {useState} from 'react';

function MyQuizzes(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');
  const [recp, setRecp] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  return <></>;
}

export default MyQuizzes;
