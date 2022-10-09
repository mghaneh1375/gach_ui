import React, {useState} from 'react';
import {CommonWebBox, PhoneView, MyView} from '../../../styles/Common';

import ChangePass from './components/ChangePass';
import UpdateInfo from './components/UpdateInfo';
import UpdatePic from './components/UpdatePic';
import UpdatePassword from './components/UpdatePassword';
import UpdateUsername from './components/UpdateUsername';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {getDevice, getWidthHeight} from '../../../services/Utility';
import {Device} from '../../../models/Device';

const Profile = props => {
  const [user, setUser] = useState(undefined);
  const isApp = getDevice().indexOf(Device.App) !== -1;

  React.useEffect(() => {
    if (props.user === null) {
      // navigate(isApp ? 'Home' : '/');
      return;
    }
    setUser(props.user.user);
  }, [props.user, props.navigate, isApp]);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [showChangePassModal, setshowChangePassModal] = useState(false);

  const toggleChangePassModal = () => {
    setshowChangePassModal(!showChangePassModal);
  };

  const boxWidth = getWidthHeight()[0] - 20;

  return (
    <PhoneView>
      {/* {showChangePassModal && (
        <ChangePass toggleModal={toggleChangePassModal} />
      )} */}
      {user !== undefined && (
        <CommonWebBox
          width={boxWidth}
          child={
            <UpdateInfo
              token={props.token}
              user={user}
              setLoading={setLoading}
            />
          }
        />
      )}
      {/* <CommonWebBox width={boxWidth} child={<UpdatePic />} />
      <CommonWebBox width={boxWidth} child={<UpdateUsername />} />
      <CommonWebBox width={boxWidth} child={<UpdatePassword />} /> */}
    </PhoneView>
  );
};

export default Profile;
