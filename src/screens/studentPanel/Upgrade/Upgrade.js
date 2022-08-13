import {Device} from '../../../models/Device';
import {getDevice} from '../../../services/Utility';
import RoleForm from '../../general/login/components/RoleForm';
import React from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CommonWebBox, MyView} from '../../../styles/Common';
import {View} from 'react-native';

function Upgrade(props) {
  const device = getDevice();
  const isApp = device.indexOf(Device.App) !== -1;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <CommonWebBox>
      <MyView style={{width: 400}}>
        <RoleForm
          token={props.token}
          setLoading={setLoading}
          navigate={props.navigate}
          redirectTo={isApp ? 'Home' : '/'}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default Upgrade;
