import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showError, showSuccess} from '../../../../services/Utility';
import {CommonButton} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../tranlates/Common';

function OffCode(props) {
  const [offcode, setOffcode] = useState();

  const checkCode = async () => {
    if (1 == 1) {
      showSuccess(commonTranslator.successOffCode);
      if (offcode == 'c') props.setResult(15000, 'value');
      else props.setResult(offcode === 'a' ? 20 : 10, 'percent');
      props.toggleShowPopUp();
      return;
    }
    props.setLoading(true);
    try {
      let res = await generalRequest(
        routes.checkOffCode,
        'post',
        {
          code: offcode,
          for: props.for,
        },
        'data',
        props.token,
        ['code', 'for'],
      );
      props.setLoading(false);
      if (res !== null) {
        if (res.data.msg === 'ok') {
          showSuccess(commonTranslator.successOffCode);
          props.setResult(res.data.amount, res.data.type);
          props.toggleShowPopUp();
        } else {
          showError(res.data.msg);
        }
      }
    } catch (e) {
      props.setLoading(false);
    }
  };

  return (
    <LargePopUp
      btns={
        <CommonButton
          onPress={() => checkCode()}
          theme={'dark'}
          title={commonTranslator.confirm}
        />
      }
      title={commonTranslator.offcode}
      toggleShowPopUp={props.toggleShowPopUp}>
      <JustBottomBorderTextInput
        placeholder={commonTranslator.offcode}
        subText={commonTranslator.offcode}
        value={offcode}
        onChangeText={e => setOffcode(e)}
      />
    </LargePopUp>
  );
}

export default OffCode;
