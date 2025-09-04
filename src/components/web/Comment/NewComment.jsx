import {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
import {showSuccess} from '../../../services/utility';
import {CommonButton, MyView} from '../../../styles/CommonComponents.jsx';
import JustBottomBorderTextInput from '../../../styles/common/JustBottomBorderTextInput.jsx';
import commonTranslator from '../../../translator/common';
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
            {
              comment: desc,
            },
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
