import {generalRequest} from '../../API/Utility';
import {CommonButton} from '../../styles/Common';
import {LargePopUp} from '../../styles/Common/PopUp';
import commonTranslator from '../../tranlates/Common';

const RemovePane = props => {
  const remove = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(props.url, 'delete', props.data, undefined, props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        props.afterRemoveFunc();
      }
    });
  };

  return (
    <LargePopUp
      toggleShowPopUp={props.toggleShowPopUp}
      btns={
        <CommonButton
          title={commonTranslator.yes}
          onPress={() => remove()}
          theme={'dark'}
        />
      }
      title={commonTranslator.sureRemove}></LargePopUp>
  );
};

export default RemovePane;
