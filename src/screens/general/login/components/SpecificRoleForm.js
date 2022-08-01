import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';

function SpecificRoleForm(props) {
  const [obj, setObj] = useState();
  const [data, setData] = useState();

  React.useEffect(() => {
    setObj(props.obj);
  }, [props.obj]);

  return (
    <View>
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
    </View>
  );
}

export default SpecificRoleForm;
