import {generalRequest} from '../../API/Utility';
import {CommonButton} from '../../styles/Common';
import {LargePopUp} from '../../styles/Common/PopUp';
import commonTranslator from '../../translator/Common';

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
      }></LargePopUp>
  );
};

export default ConfirmationBatchOpPane;
