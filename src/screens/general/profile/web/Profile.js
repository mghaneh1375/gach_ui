import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonWebBox} from '../../../../styles/Common';

import ChangePass from '../components/ChangePass';
import UpdateInfo from '../components/UpdateInfo';
import UpdatePic from '../components/UpdatePic';
import UpdatePassword from '../components/UpdatePassword';
import UpdateUsername from '../components/UpdateUsername';
import {globalStateContext, dispatchStateContext} from '../../../../App';

const Profile = props => {
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

  return (
    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
      {showChangePassModal && (
        <ChangePass toggleModal={toggleChangePassModal} />
      )}
      <CommonWebBox
        width={'calc(60% - 20px)'}
        child={<UpdateInfo setLoading={setLoading} />}
      />
      <CommonWebBox width={'calc(40% - 20px)'} child={<UpdatePic />} />
      <CommonWebBox width={'calc(60% - 20px)'} child={<UpdateUsername />} />
      <CommonWebBox width={'calc(60% - 20px)'} child={<UpdatePassword />} />
    </View>
  );
};

export default Profile;
