import {generalRequest} from '../../api/utility';
import {CommonButton} from '../../styles/CommonComponents.jsx';
import {LargePopUp} from '../../styles/common/PopUp.jsx';
import commonTranslator from '../../translator/common';
const ConfirmationBatchOpPane = props => {
  const doOp = () => {
    if (props.url === undefined || props.url === null) {
      props.afterFunc(props.data);
      return;
    }
    props.setLoading(true);
    Promise.all([
      generalRequest(
        props.url,
        props.method === undefined ? 'delete' : props.method,
        props.data,
        props.expected,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        props.afterFunc(res[0]);
      }
    });
  };
  return (
    <LargePopUp
      toggleShowPopUp={props.toggleShowPopUp}
      btns={
        <CommonButton
          title={commonTranslator.yes}
          onPress={() => {
            doOp();
          }}
          theme={'dark'}
        />
      }
      title={
        props.warning === undefined
          ? commonTranslator.sureRemove
          : props.warning
      }
    />
  );
};
export default ConfirmationBatchOpPane;
