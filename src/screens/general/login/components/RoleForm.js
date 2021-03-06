import React, {useState} from 'react';
import {View} from 'react-native';
import {
  BigBoldBlueTextInline,
  BlueTextFromStart,
  CommonButton,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import {RoleCard} from '../../../../styles/Common/RoleCard';
import commonTranslator from './../../../../tranlates/Common';
import vars from '../../../../styles/root';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {checkSendRoleForm, getRoleForms} from './Utility';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontIcon} from '../../../../styles/Common/FontIcon';

const RoleForm = props => {
  const [userRoleFormData, setUserRoleFormData] = useState({});
  const [roleForms, setRoleForms] = useState();
  const [role, setRole] = useState('student');
  const [step, setStep] = useState('role'); // available values: [role, form]
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking || roleForms !== undefined) return;
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([getRoleForms()]).then(res => {
      props.setLoading(false);
      if (res[0] !== undefined) setRoleForms(res[0]);
      setIsWorking(false);
    });
  }, [props, roleForms, isWorking]);

  const changeRole = r => {
    setRole(r);
    setUserRoleFormData({});
    setStep('form');
  };

  const setFormUserData = (key, val) => {
    userRoleFormData[key] = val;
    setUserRoleFormData(userRoleFormData);
  };

  return (
    <View>
      {step === 'role' && (
        <View>
          <BigBoldBlueTextInline text={commonTranslator.congratulations} />

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

      {step === 'form' && role !== undefined && (
        <View style={{marginTop: 20}}>
          <FontIcon
            onPress={() => setStep('role')}
            parentStyle={{
              alignSelf: 'flex-end',
              marginLeft: 20,
              marginBottom: 20,
            }}
            back={vars.YELLOW}
            kind={'normal'}
            theme={'rect'}
            icon={faAngleLeft}
          />
          {roleForms
            .find(elem => elem.role === role)
            .data.map(function (obj, i) {
              return (
                <CommonTextInput
                  style={{marginTop: 10}}
                  key={i}
                  placeholder={obj.isMandatory ? '* ' + obj.title : obj.title}
                  subText={obj.help === undefined ? obj.title : obj.help}
                  justNum={obj.isJustNum ? true : undefined}
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
            onPress={() => {
              userRoleFormData['role'] = role;
              checkSendRoleForm(
                userRoleFormData,
                props.setLoading,
                props.navigate,
                props.redirectTo,
                props.token,
              );
            }}
            title={commonTranslator.confirm}
          />
        </View>
      )}
    </View>
  );
};

export default RoleForm;
