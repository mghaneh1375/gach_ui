import React, {useState} from 'react';
import {CommonButton, SimpleText, MyView} from '../../../../styles/Common';
import translator from '../translate';
import commonTranslator from '../../../../translator/Common';
import {updateForm} from './Utility';
import {fetchUser, setCacheItem} from '../../../../API/User';
import {showSuccess} from '../../../../services/Utility';
import SpecificRoleForm from '../../login/components/SpecificRoleForm';

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

  const change = async index => {
    // let hasAnyChange = false;
    // let hasAnyErr = false;

    props.setLoading(true);
    // forms.forEach(async form => {
    // if (hasAnyErr) return;
    let res = await updateForm(props.token, props.userId, forms[index]);
    // if (res !== null) hasAnyChange = true;
    // else hasAnyErr = true;
    // });

    if (res !== null) {
      if (props.userId === undefined) {
        await setCacheItem('user', undefined);
        await fetchUser(props.token, user => {
          props.setLoading(false);
          showSuccess(commonTranslator.success);
        });
      } else showSuccess(commonTranslator.success);

      props.setLoading(false);
    }

    // if (hasAnyChange && !hasAnyErr)
    //   if (props.userId === undefined) {
    //     await setCacheItem('user', undefined);
    //     await fetchUser(props.token, user => {
    //       props.setLoading(false);
    //       showSuccess(commonTranslator.success);
    //     });
    //   } else showSuccess(commonTranslator.success);

    // props.setLoading(false);
  };

  return (
    <MyView>
      {forms !== undefined &&
        props.forms.map((elem, index) => {
          return (
            <MyView key={index}>
              <SimpleText text={translator.formData + elem.roleFa} />
              {elem.data.map(function (obj, i) {
                return (
                  <SpecificRoleForm
                    key={i}
                    obj={obj}
                    setFormUserData={(key, val) => {
                      changeForm(elem.role, key, val);
                    }}
                    signUp={false}
                  />
                );
              })}
              {/* {elem.data.map((itr, idx) => {
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
              })} */}
              <CommonButton
                onPress={() => change(index)}
                theme={'dark'}
                title={commonTranslator.change}
              />
            </MyView>
          );
        })}
    </MyView>
  );
};

export default UpdateForm;
