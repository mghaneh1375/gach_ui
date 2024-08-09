import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {dispatchUsersContext, usersContext} from './Context';
import Translator from '../Translator';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';
import {setPriority} from './Utility';

function SetPriority(props) {
  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [teachPriority, setTeachPriority] = useState();
  const [advisorPriority, setAdvisorPriority] = useState();

  const [wantedUser, setWantedUser] = useState();

  React.useEffect(() => {
    if (props.wantedUser === undefined) return;
    setWantedUser(props.wantedUser);
  }, [props.wantedUser]);

  React.useEffect(() => {
    if (state.selectedUser === undefined) return;
    setWantedUser(state.selectedUser);
  }, [state.selectedUser]);

  React.useEffect(() => {
    if (wantedUser == undefined) return;
    setAdvisorPriority(
      wantedUser.advisorPriority ? wantedUser.advisorPriority : 1000,
    );
    setTeachPriority(
      wantedUser.teachPriority ? wantedUser.teachPriority : 1000,
    );
  }, [wantedUser]);

  if (wantedUser === undefined) return <></>;

  return (
    <CommonWebBox
      header={'تعیین اولویت نمایش برای  ' + wantedUser.name}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={styles.gap10}>
        {advisorPriority !== undefined && (
          <JustBottomBorderTextInput
            value={advisorPriority}
            onChangeText={e => setAdvisorPriority(e)}
            placehoder={Translator.advisorPriority}
            subText={Translator.advisorPriority}
          />
        )}
        {teachPriority !== undefined && (
          <JustBottomBorderTextInput
            value={teachPriority}
            onChangeText={e => setTeachPriority(e)}
            placehoder={Translator.teachPriority}
            subText={Translator.teachPriority}
          />
        )}
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res = await setPriority(
              advisorPriority,
              teachPriority,
              wantedUser.id,
              props.token,
            );
            props.setLoading(false);
            if (res !== null) {
              wantedUser.advisorPriority = advisorPriority;
              wantedUser.teachPriority = teachPriority;
              if (state.selectedUser !== undefined)
                dispatch({selectedUser: state.selectedUser});
            }
          }}
          title={commonTranslator.confirm}
          theme={'dark'}
        />
      </PhoneView>
    </CommonWebBox>
  );
}

export default SetPriority;
