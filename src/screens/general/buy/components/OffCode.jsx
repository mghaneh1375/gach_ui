import {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
import {showSuccess} from '@/services/utility';
import {CommonButton} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import commonTranslator from '@/translator/common';
function OffCode(props) {
  const [offcode, setOffcode] = useState();
  const checkCode = async () => {
    props.setLoading(true);
    try {
      const res = await generalRequest(
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
