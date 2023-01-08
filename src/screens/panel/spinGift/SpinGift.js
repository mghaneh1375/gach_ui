import {dispatchStateContext, globalStateContext} from '../../../App';
import Spinner from './spinner/spinner';
import React, {useState} from 'react';
import {useParams} from 'react-router';

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
  const [id, setId] = useState();
  const params = useParams();

  React.useEffect(() => {
    if (params.id === undefined) return;
    setId(params.id);
  }, [params.id]);

  return (
    <>
      {id && (
        <Spinner
          setLoading={setLoading}
          token={state.token}
          navigate={navigate}
          id={id}
        />
      )}
    </>
  );
}

export default SpinGift;
