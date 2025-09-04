import React, {useState} from 'react';
import {useParams} from 'react-router';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {PackageProvider} from './components/Context';
import Detail from './components/Detail/Detail';
import List from './components/List';
import {getDevice} from '../../../services/Utility';
import PhoneDetail from './components/Detail/PhoneDetail';

function Packages(props) {
  const [mode, setMode] = useState();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const params = useParams();
  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    if (params.slug === undefined) setMode('list');
    else setMode('detail');
  }, [params]);

  return (
    <PackageProvider>
      {mode !== undefined && mode === 'list' && (
        <List
          navigate={props.navigate}
          setMode={setMode}
          token={state.token}
          setLoading={setLoading}
          isInMyMode={props.isInMyMode}
        />
      )}
      {mode !== undefined && mode === 'detail' && !isInPhone && (
        <Detail
          navigate={props.navigate}
          slug={params.slug}
          token={state.token}
          user={state.user}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
      {mode !== undefined && mode === 'detail' && isInPhone && (
        <PhoneDetail
          navigate={props.navigate}
          slug={params.slug}
          token={state.token}
          user={state.user}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
    </PackageProvider>
  );
}

export default Packages;
