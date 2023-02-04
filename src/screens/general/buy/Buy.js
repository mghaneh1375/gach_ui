import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './components/List/List';
import {PackageProvider} from './components/Context';
import Detail from './components/Detail/Detail';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';

function Buy(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [packageId, setPackageId] = useState();
  const [quizId, setQuizId] = useState();

  const [mode, setMode] = useState();
  const params = useParams();

  React.useEffect(() => {
    if (packageId == undefined) return;
    setMode('detail');
  }, [packageId]);

  React.useEffect(() => {
    if (quizId == undefined) return;
    setMode('single');
  }, [quizId]);

  useEffectOnce(() => {
    if (params.packageId !== undefined) setPackageId(params.packageId);
    else if (params.quizId !== undefined) setQuizId(params.quizId);
    else setMode('list');
  }, [params]);

  React.useEffect(() => {
    if (mode !== 'list') {
      dispatch({
        isFilterMenuVisible: false,
        isRightMenuVisible: !state.isInPhone && state.user !== null,
      });
    } else
      dispatch({
        isRightMenuVisible: false,
        isFilterMenuVisible: !state.isInPhone,
      });
  }, [mode, dispatch, state.user, state.isInPhone]);

  return (
    <PackageProvider>
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(./assets/images/back3.png)',
        }}></div>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          user={props.user}
          navigate={navigate}
        />
      )}
      {mode === 'single' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          user={props.user}
          navigate={navigate}
          quizId={quizId}
        />
      )}
      {mode === 'detail' && (
        <Detail
          setMode={setMode}
          isRightMenuVisible={state.isRightMenuVisible}
          setLoading={setLoading}
          token={props.token}
          user={props.user}
          navigate={navigate}
          packageId={packageId}
        />
      )}
    </PackageProvider>
  );
}

export default Buy;
