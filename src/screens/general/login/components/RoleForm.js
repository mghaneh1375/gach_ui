import {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {
  BigBoldBlueTextInline,
  BlueTextFromStart,
  CommonButton,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import {RoleCard} from '../../../../styles/Common/RoleCard';
import {TextIcon} from '../../../../styles/Common/TextIcon';
import translator from '..//translate';
import commonTranslator from './../../../../tranlates/Common';
import vars from '../../../../styles/root';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {showError, showSuccess} from '../../../../services/Utility';

const RoleForm = props => {
  const [userRoleFormData, setUserRoleFormData] = useState({});
  const [role, setRole] = useState('student');
  const [step, setStep] = useState('role'); // available values: [role, form]

  const roleForms = [];
  roleForms['school'] = [
    {
      title: translator.schoolName,
      key: 'schoolName',
    },
    {
      title: translator.schoolPhone,
      justNum: true,
      key: 'schoolPhone',
    },
  ];
  roleForms['agent'] = [
    {
      title: translator.stateName,
      justNum: true,
      key: 'stateName',
    },
  ];
  roleForms['advisor'] = [
    {
      title: translator.workYear,
      justNum: true,
      key: 'workYear',
    },
    {
      title: translator.workSchools,
      key: 'workSchools',
    },
    {
      title: translator.bio,
      key: 'bio',
    },
    {
      title: translator.universeField,
      key: 'universeField',
    },
  ];
  roleForms['student'] = [
    {
      title: translator.invitationCode,
      justNum: true,
      help: translator.invitationCodeHelp,
      required: false,
      key: 'invitationCode',
    },
  ];

  const changeRole = r => {
    setRole(r);
    setUserRoleFormData({});
    setStep('form');
  };

  const setFormUserData = (key, val) => {
    userRoleFormData[key] = val;
    setUserRoleFormData(userRoleFormData);
  };

  const checkSendRoleForm = () => {
    userRoleFormData['role'] = role;

    for (var i = 0; i < roleForms[role].length; i++) {
      const field = roleForms[role][i];

      if (field.required !== undefined && !field.required) continue;

      if (
        userRoleFormData[field.key] === undefined ||
        userRoleFormData[field.key].length === 0
      ) {
        showError(commonTranslator.pleaseFillAllFields);
        return;
      }
    }

    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.sendRoleForm,
        'post',
        userRoleFormData,
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] != null) {
        showSuccess('بررسی میشه میگم نتیجه رو');
        setTimeout(function () {
          props.navigate(props.redirectTo);
        }, 2000);
      }
    });
  };

  return (
    <View>
      {step === 'role' && (
        <View>
          <TextIcon>
            <BigBoldBlueTextInline text={commonTranslator.congratulations} />
            {/* <FontIcon icon={faClose}></FontIcon> */}
          </TextIcon>
          <BlueTextFromStart
            style={{marginTop: 20}}
            text={commonTranslator.chooseOne}
          />
          <EqualTwoTextInputs>
            <RoleCard
              text={commonTranslator.student}
              onPress={() => changeRole('student')}
              style={{marginTop: 20}}
              color={vars.ORANGE}
              source={require('./../../../../images/student.png')}
            />
          </EqualTwoTextInputs>

          <EqualTwoTextInputs>
            <RoleCard
              text={commonTranslator.teacher}
              onPress={() => changeRole('teacher')}
              style={{marginTop: 20}}
              source={require('./../../../../images/teacher.png')}
            />
            <RoleCard
              text={commonTranslator.agent}
              style={{marginTop: 20}}
              onPress={() => changeRole('agent')}
              source={require('./../../../../images/agent.png')}
            />
          </EqualTwoTextInputs>

          <EqualTwoTextInputs style={{marginBottom: 20}}>
            <RoleCard
              text={commonTranslator.school}
              style={{marginTop: 20}}
              onPress={() => changeRole('school')}
              source={require('./../../../../images/school.png')}
            />
            <RoleCard
              text={commonTranslator.advisor}
              style={{marginTop: 20}}
              onPress={() => changeRole('advisor')}
              source={require('./../../../../images/consultant.png')}
            />
          </EqualTwoTextInputs>
        </View>
      )}

      {step === 'form' && (
        <View style={{marginTop: 20}}>
          {roleForms[role].map(function (obj, i) {
            return (
              <CommonTextInput
                key={i}
                placeholder={obj.title}
                subText={obj.help}
                justNum={obj.justNum}
                type={obj.type}
                onChangeText={e => setFormUserData(obj.key, e)}
              />
            );
          })}
          <CommonButton
            style={{
              alignSelf: 'flex-start',
              marginTop: 40,
            }}
            onPress={() => checkSendRoleForm()}
            title={commonTranslator.confirm}
          />
        </View>
      )}
    </View>
  );
};

export default RoleForm;
