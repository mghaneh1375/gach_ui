import React, {useState} from 'react';
import {
  BigBoldBlueTextInline,
  BlueTextFromStart,
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {RoleCard} from '../../../../styles/Common/RoleCard';
import commonTranslator from '../../../../translator/Common';
import vars from '../../../../styles/root';
import {checkSendRoleForm, getRoleForms} from './Utility';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import SpecificRoleForm from './SpecificRoleForm';
import {styles} from '../../../../styles/Common/Styles';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {userKeyVals} from '../../../studentPanel/Upgrade/KeyVals';

const RoleFormForSelect = props => {
  const [userRoleFormData, setUserRoleFormData] = useState({});
  const [roleForms, setRoleForms] = useState();
  const [role, setRole] = useState();
  const [step, setStep] = useState('role'); // available values: [role, form]
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (role === undefined) return;
    setStep('form');
  }, [role]);

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
    <MyView>
      <MyView>
        <SimpleText text={commonTranslator.chooseOne} />
        <PhoneView style={{...styles.gap15}}>
          <JustBottomBorderSelect
            values={userKeyVals}
            setter={setRole}
            value={userKeyVals.find(elem => elem.id === role)}
            placeholder={commonTranslator.users}
          />
        </PhoneView>
      </MyView>

      {step === 'form' && role !== undefined && (
        <PhoneView style={{...styles.gap15, ...styles.marginTop20}}>
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
          <MyView>
            <CommonButton
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
        </PhoneView>
      )}
    </MyView>
  );
};

export default RoleFormForSelect;
