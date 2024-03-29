import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './components/List/List';
import {PackageProvider} from './components/Context';
import Detail from './components/Detail/Detail';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {getDevice} from '../../../services/Utility';

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

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

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
    if (!isInPhone) {
      if (mode !== 'list') {
        dispatch({
          isFilterMenuVisible: false,
          isRightMenuVisible: state.user !== null,
        });
      } else
        dispatch({
          isRightMenuVisible: false,
          isFilterMenuVisible: true,
        });
    } else if (mode === 'detail') {
      dispatch({
        isFilterMenuVisible: false,
        isRightMenuVisible: false,
        showTopNav: true,
      });
    } else
      dispatch({
        isFilterMenuVisible: true,
        isRightMenuVisible: false,
        showTopNav: false,
      });
  }, [mode, isInPhone, dispatch, state.user]);

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
