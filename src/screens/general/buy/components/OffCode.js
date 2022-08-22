import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import commonTranslator from '../../../../tranlates/Common';

function OffCode(props) {
  const [offcode, setOffcode] = useState();

  const checkCode = async () => {
    let res = await generalRequest(routes.checkOffCode);
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
