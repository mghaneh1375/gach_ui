import React, {useState} from 'react';
import {dispatchPackagesContext, packagesContext} from '../Context';

import {MyView} from '../../../../../styles/Common';
import Info from '../../../../panel/package/components/Detail/Info';
import List from './List';
import SchoolList from './SchoolList';
import vars from '../../../../../styles/root';
import {getDevice} from '../../../../../services/Utility';
import {getPackage} from '../Utility';

function Detail(props) {
  const useGlobalState = () => [
    React.useContext(packagesContext),
    React.useContext(dispatchPackagesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  React.useEffect(() => {
    dispatch({isRightMenuVisible: props.isRightMenuVisible});
  }, [props.isRightMenuVisible, dispatch]);

  const localFetchPackage = React.useCallback(() => {
    if (
      state.package !== undefined ||
      isWorking ||
      props.packageId === undefined
    )
      return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([getPackage(props.token, props.packageId)]).then(res => {
      props.setLoading(false);

      console.log(res[0]);
      if (
        res[0] === null ||
        res[0].items === undefined ||
        res[0].items.length !== 1
      )
        return;

      dispatch({
        off: res[0].off,
        groupRegistrationOff: res[0].groupRegistrationOff,
        package: res[0].items[0],
      });

      setIsWorking(false);
    });
  }, [props, state.package, dispatch, isWorking]);

  React.useEffect(() => {
    if (props.packageId === undefined) return;
    localFetchPackage();
  }, [props.packageId, localFetchPackage]);

  React.useEffect(() => {
    console.log(state.package);
  }, [state.package]);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  return (
    <>
      {state.package !== undefined && (
        <MyView
          style={
            isInPhone
              ? {}
              : props.user === null || props.user === undefined
              ? {
                  maxWidth: vars.LEFT_SECTION_WIDTH,
                  marginRight: vars.RIGHT_MENU_WIDTH / 2,
                  alignSelf: 'unset',
                }
              : !props.isRightMenuVisible
              ? {maxWidth: vars.LEFT_SECTION_WIDTH, alignSelf: 'center'}
              : {}
          }>
          {showInfo && (
            <Info
              isAdmin={false}
              setMode={props.setMode}
              package={state.package}
            />
          )}
          {props.user !== undefined &&
            props.user !== null &&
            props.user.accesses.indexOf('student') === -1 && (
              <SchoolList
                token={props.token}
                user={props.user}
                setLoading={props.setLoading}
                navigate={props.navigate}
                setShowInfo={setShowInfo}
                package={state.package}
              />
            )}
          {(props.user === null ||
            props.user === undefined ||
            props.user.accesses.indexOf('student') !== -1) && (
            <List
              token={props.token}
              user={props.user}
              setLoading={props.setLoading}
              navigate={props.navigate}
              setShowInfo={setShowInfo}
              package={state.package}
            />
          )}
        </MyView>
      )}
    </>
  );
}

export default Detail;
