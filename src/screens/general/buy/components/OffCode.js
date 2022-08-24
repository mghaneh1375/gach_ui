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
        showSuccess(commonTranslator.successOffCode);
        props.setResult(res.amount, res.type, offcode);
        props.toggleShowPopUp();
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
