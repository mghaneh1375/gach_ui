import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonButton, SimpleText} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {updateForm} from './Utility';
import {fetchUser, setCacheItem} from '../../../../API/User';
import {showSuccess} from '../../../../services/Utility';

const UpdateForm = props => {
  const [forms, setForms] = useState();

  React.useEffect(() => {
    if (forms !== undefined || props.forms === undefined) return;
    setForms(
      props.forms.map(elem => {
        let form = {role: elem.role};
        elem.data.forEach(field => {
          form[field.key] = field.value;
        });
        return form;
      }),
    );
  }, [props.forms, forms]);

  const changeForm = (role, key, value) => {
    let allForms = forms.map(elem => {
      if (elem.role === role) elem[key] = value;
      return elem;
    });

    setForms(allForms);
  };

  const change = async () => {
    let hasAnyChange = false;
    let hasAnyErr = false;

    props.setLoading(true);
    forms.forEach(async form => {
      if (hasAnyErr) return;
      let res = await updateForm(props.token, props.userId, form);
      if (res !== null) hasAnyChange = true;
      else hasAnyErr = true;
    });

    if (hasAnyChange && !hasAnyErr)
      if (props.userId === undefined) {
        setCacheItem('user', undefined);
        fetchUser(props.token, user => {
          props.setLoading(false);
          showSuccess(commonTranslator.success);
        });
      } else showSuccess(commonTranslator.success);

    props.setLoading(false);
  };

  return (
    <View>
      {forms !== undefined &&
        props.forms.map((elem, index) => {
          return (
            <View key={index}>
              <SimpleText text={translator.formData + elem.roleFa} />
              {elem.data.map((itr, idx) => {
                return (
                  <JustBottomBorderTextInput
                    value={forms.find(elem => elem.role === elem.role)[itr.key]}
                    placeholder={itr.title}
                    onChangeText={e => changeForm(elem.role, itr.key, e)}
                    subText={itr.help !== undefined ? itr.help : itr.title}
                    justNum={itr.isJustNum ? true : undefined}
                    key={idx}
                  />
                );
              })}
              <CommonButton
                onPress={() => change()}
                theme={'dark'}
                title={commonTranslator.change}
              />
            </View>
          );
        })}
    </View>
  );
};

export default UpdateForm;
