import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import {View} from 'react-native-web';
import {CommonButton} from '../../../../styles/Common';
import {useState} from 'react';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import SearchUser from '../../../../components/web/SearchUser';
import {showError} from '../../../../services/Utility';

const ForceRegistry = props => {
  const [paid, setPaid] = useState();
  const [showSearchUser, setShowSearchUser] = useState(false);
  const [user, setUser] = useState();

  const changeInput = (label, text) => {
    if (label === 'paid') setPaid(text);
  };

  const doRegistry = () => {
    if (user === undefined) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.forceRegistry + props.quiz.id,
        'put',
        {
          id: user.id,
          paid: paid,
          generalMode: props.quiz.generalMode,
        },
        undefined,
        props.token,
        ['id', 'paid', 'generalMode'],
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== undefined) {
        props.quiz.students = undefined;
        props.updateQuiz(props.quiz);
        props.toggleShowPopUp();
      }
    });
  };

  return (
    <LargePopUp
      title={translator.addStudent}
      toggleShowPopUp={props.toggleShowPopUp}
      btns={
        <CommonButton
          onPress={() => doRegistry()}
          title={commonTranslator.confirm}
        />
      }>
      <View>
        <SearchUser
          show={showSearchUser}
          setLoading={props.setLoading}
          setShow={setShowSearchUser}
          setFinalResult={setUser}
          token={props.token}
        />
        <JustBottomBorderTextInput
          disable={true}
          onPress={e => setShowSearchUser(true)}
          value={user === undefined ? '' : user.nameFa + ' ' + user.lastNameFa}
          placeholder={commonTranslator.wantedUser}
        />
        <JustBottomBorderTextInput
          onChangeText={e => changeInput('paid', e)}
          placeholder={commonTranslator.paid}
        />
      </View>
    </LargePopUp>
  );
};

export default ForceRegistry;
