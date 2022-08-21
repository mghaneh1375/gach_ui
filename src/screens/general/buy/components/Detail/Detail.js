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
  const [isWorking, setIsWorking] = useState(false);

  // React.useEffect(() => {

  //   setIsWorking(true);
  //   props.setLoading(true);
  //   Promise.all([fetchPackageQuizzes(props.token, props.package.id)]).then(
  //     res => {
  //       props.setLoading(false);
  //       if (res[0] === null) {
  //         props.setMode('list');
  //         return;
  //       }
  //       dispatch({quizzes: res[0]});
  //       props.package.quizzesDoc = res[0];
  //       props.setPackage(props.package);
  //       setIsWorking(false);
  //     },
  //   );
  // }, [props, isWorking, dispatch, state.quizzes]);

  return (
    <MyView>
      <Info isAdmin={false} setMode={props.setMode} package={state.package} />
      <List token={props.token} setLoading={props.setLoading} />
    </MyView>
  );
}

export default Detail;
