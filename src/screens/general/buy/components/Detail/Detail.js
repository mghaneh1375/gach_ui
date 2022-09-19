import React, {useState} from 'react';
import {fetchPackageQuizzes} from '../Utility';
import {dispatchPackagesContext, packagesContext} from '../Context';

import {MyView} from '../../../../../styles/Common';
import Info from '../../../../panel/package/components/Detail/Info';
import List from './List';

function Detail(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [showInfo, setShowInfo] = useState(true);

  React.useEffect(() => {
    dispatch({isRightMenuVisible: props.isRightMenuVisible});
  }, [props.isRightMenuVisible, dispatch]);

  return (
    <MyView>
      {showInfo && (
        <Info isAdmin={false} setMode={props.setMode} package={state.package} />
      )}
      <List
        token={props.token}
        user={props.user}
        setLoading={props.setLoading}
        navigate={props.navigate}
        setShowInfo={setShowInfo}
        package={state.package}
      />
    </MyView>
  );
}

export default Detail;
