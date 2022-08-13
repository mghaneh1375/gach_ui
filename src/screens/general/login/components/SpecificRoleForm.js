import React, {useState} from 'react';
import {View} from 'react-native';
import {MyView} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';

function SpecificRoleForm(props) {
  const [obj, setObj] = useState();
  const [data, setData] = useState();

  React.useEffect(() => {
    setObj(props.obj);
    if (props.obj !== undefined && props.obj.value !== undefined)
      setData(props.obj.value);
  }, [props.obj]);

  return (
    <MyView>
      {obj !== undefined && obj.keyVals !== undefined && (
        <JustBottomBorderSelect
          setter={setData}
          afterSetter={props.setFormUserData}
          args={obj.key}
          values={obj.keyVals}
          value={obj.keyVals.find(elem => {
            console.log(elem.id);
            console.log(data);
            return elem.id === data;
          })}
        />
      )}

      {obj !== undefined && obj.keyVals === undefined && (
        <CommonTextInput
          placeholder={obj.isMandatory ? '* ' + obj.title : obj.title}
          subText={obj.help === undefined ? obj.title : obj.help}
          justNum={obj.isJustNum ? true : undefined}
          type={obj.type}
          value={data}
          onChangeText={e => {
            setData(e);
            props.setFormUserData(obj.key, data);
          }}
        />
      )}
    </MyView>
  );
}

export default SpecificRoleForm;
