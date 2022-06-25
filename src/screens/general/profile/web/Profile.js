import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../styles/Common';

import ChangePass from '../components/ChangePass';
import ChangeUsername from '../components/ChangeUsername';
import UpdateInfo from '../components/UpdateInfo';
import UpdatePic from '../components/UpdatePic';
import UpdatePassword from '../components/UpdatePassword';
import UpdateUsername from '../components/UpdateUsername';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';

const Profile = props => {
  const [user, setUser] = useState(undefined);

  const navigate = props.navigate;

  React.useEffect(() => {
    const isApp = getDevice().indexOf(Device.App) !== -1;

    if (props.user === undefined) {
      navigate(isApp ? 'Home' : '/');
      return;
    }
    setUser(props.user.user);
  }, [props.user, navigate]);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [showChangeUsernameModal, setShowChangeUsernameModal] = useState(false);
  const [usernameModalMode, setUsernameModalMode] = useState(false);

  const toggleChangePassModal = () => {
    setShowChangePassModal(!showChangePassModal);
  };

  const toggleChangeUsernameModal = () => {
    setShowChangeUsernameModal(!showChangeUsernameModal);
  };

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {showChangeUsernameModal && (
        <ChangeUsername
          mode={usernameModalMode}
          token={props.token}
          setLoading={setLoading}
          navigate={navigate}
          toggleModal={toggleChangeUsernameModal}
        />
      )}
      {/* {user !== undefined && (
        <CommonWebBox
          width={'calc(65% - 20px)'}
          child={
            <UpdateInfo
              token={props.token}
              user={user}
              setLoading={setLoading}
            />
          }
        />
      )} */}
      {/* <CommonWebBox width={'calc(35% - 20px)'} child={<UpdatePic />} /> */}
      <CommonWebBox
        width={'calc(65% - 20px)'}
        child={
          <UpdateUsername
            setMode={setUsernameModalMode}
            toggleModal={toggleChangeUsernameModal}
          />
        }
      />
      <CommonWebBox
        width={'calc(65% - 20px)'}
        child={
          <ChangePass
            setLoading={setLoading}
            token={props.token}
            toggleModal={toggleChangePassModal}
          />
        }
      />
    </View>
  );
};

export default Profile;
