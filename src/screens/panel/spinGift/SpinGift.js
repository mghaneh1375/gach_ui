import {dispatchStateContext, globalStateContext} from '../../../App';
import Spinner from './spinner/spinner';
import React from 'react';

function SpinGift(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({loading: status});
  };
  return (
    <Spinner setLoading={setLoading} token={state.token} navigate={navigate} />
  );
}

export default SpinGift;
