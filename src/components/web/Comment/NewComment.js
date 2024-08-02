import {useState} from 'react';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {showSuccess} from '../../../services/Utility';
import {CommonButton, MyView} from '../../../styles/Common';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../translator/Common';
import Translate from './translate';

function NewComment(props) {
  const [desc, setDesc] = useState();

  return (
    <MyView>
      <JustBottomBorderTextInput
        placeholder={Translate.desc}
        subText={Translate.desc}
        value={desc}
        onChangeText={e => setDesc(e)}
        multiline={true}
      />
      <CommonButton
        title={commonTranslator.confirm}
        theme={'dark'}
        onPress={async () => {
          props.setLoading(true);
          const res = await generalRequest(
            routes.writeComments + props.refId + '/' + props.section,
            'post',
            {comment: desc},
            undefined,
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess(Translate.submited);
            props.submited();
          }
        }}
      />
    </MyView>
  );
}

export default NewComment;
