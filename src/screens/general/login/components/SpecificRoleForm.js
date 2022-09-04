import React, {useState} from 'react';
import {MyView, PhoneView} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import vars from '../../../../styles/root';

function SpecificRoleForm(props) {
  const [obj, setObj] = useState();
  const [data, setData] = useState();

  React.useEffect(() => {
    setObj(props.obj);
    if (props.obj !== undefined && props.obj.value !== undefined)
      setData(props.obj.value);
  }, [props.obj]);

  return (
    <PhoneView style={{gap: 20}}>
      {obj !== undefined && obj.keyVals !== undefined && (
        <JustBottomBorderSelect
          setter={setData}
          afterSetter={props.setFormUserData}
          args={obj.key}
          values={obj.keyVals}
          value={obj.keyVals.find(elem => {
            return elem.id === data;
          })}
        />
      )}

      {obj !== undefined && obj.keyVals === undefined && props.signUp && (
        <CommonTextInput
          placeholder={obj.isMandatory ? '* ' + obj.title : obj.title}
          subText={obj.help === undefined ? obj.title : obj.help}
          justNum={obj.isJustNum ? true : undefined}
          type={obj.type}
          value={data}
          onChangeText={e => {
            setData(e);
            props.setFormUserData(obj.key, e);
          }}
        />
      )}

      {obj !== undefined && obj.keyVals === undefined && !props.signUp && (
        <JustBottomBorderTextInput
          placeholder={obj.isMandatory ? '* ' + obj.title : obj.title}
          subText={obj.help === undefined ? obj.title : obj.help}
          justNum={obj.isJustNum ? true : undefined}
          type={obj.type}
          value={data}
          style={{backgroundColor: vars.transparent}}
          onChangeText={e => {
            setData(e);
            props.setFormUserData(obj.key, data);
          }}
        />
      )}
    </PhoneView>
  );
}

export default SpecificRoleForm;
