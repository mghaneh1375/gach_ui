import React, {useState} from 'react';
import {
  BigBoldBlueTextInline,
  BlueTextFromStart,
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import {RoleCard} from '../../../../styles/Common/RoleCard';
import commonTranslator from './../../../../translator/Common';
import vars from '../../../../styles/root';
import {checkSendRoleForm, getRoleForms} from './Utility';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import SpecificRoleForm from './SpecificRoleForm';
import {styles} from '../../../../styles/Common/Styles';
import {style} from '../../../../components/web/LargeScreen/Header/style';

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
    if (
      props.forms === undefined ||
      props.forms.find(elem => elem.role === r) === undefined
    )
      setUserRoleFormData({});
    else {
      let form = props.forms.find(elem => elem.role === r);
      let allForms = roleForms;

      allForms = allForms.map(elem => {
        if (elem.role === form.role) return form;
        return elem;
      });

      setRoleForms(allForms);
      let newUserData = {};

      form.data.forEach(elem => {
        newUserData[elem.key] = elem.value;
      });
      setUserRoleFormData(newUserData);
    }
    setStep('form');
  };

  const setFormUserData = (key, val) => {
    userRoleFormData[key] = val;
    setUserRoleFormData(userRoleFormData);
  };

  return (
    <MyView style={{...style.paddingLeft50}}>
      {step === 'role' && (
        <MyView>
          {props.signUp && (
            <BigBoldBlueTextInline text={commonTranslator.congratulations} />
          )}

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
        </MyView>
      )}

      {step === 'form' && role !== undefined && (
        <MyView style={{marginTop: 20, gap: 10}}>
          <PhoneView style={{...styles.alignSelfEnd}}>
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
          </PhoneView>
          {roleForms
            .find(elem => elem.role === role)
            .data.map(function (obj, i) {
              return (
                <SpecificRoleForm
                  key={i}
                  obj={obj}
                  setFormUserData={setFormUserData}
                  signUp={false}
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
                props.userId,
              );
            }}
            title={commonTranslator.confirm}
          />
        </MyView>
      )}
    </MyView>
  );
};

export default RoleForm;
