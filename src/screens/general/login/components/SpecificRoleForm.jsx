import React, {useState} from 'react';
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

  if (obj === undefined) return <></>;
  if (obj.keyVals !== undefined)
    return (
      <JustBottomBorderSelect
        setter={setData}
        subText={obj.help === undefined ? obj.title : obj.help}
        afterSetter={props.setFormUserData}
        args={obj.key}
        values={obj.keyVals}
        value={obj.keyVals.find(elem => {
          return elem.id === data;
        })}
      />
    );
  if (props.signUp) {
    return (
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
    );
  }

  return (
    <JustBottomBorderTextInput
      placeholder={obj.isMandatory ? '* ' + obj.title : obj.title}
      subText={obj.help === undefined ? obj.title : obj.help}
      justNum={obj.isJustNum ? true : undefined}
      type={obj.type}
      value={data}
      style={{backgroundColor: vars.transparent}}
      onChangeText={e => {
        setData(e);
        props.setFormUserData(obj.key, e);
      }}
    />
  );
}

export default SpecificRoleForm;
