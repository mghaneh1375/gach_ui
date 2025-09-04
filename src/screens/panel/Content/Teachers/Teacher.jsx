import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {PhoneView} from '@/styles';
import {FontIcon} from '../../../../styles/common/FontIcon';
import JustBottomBorderTextInput from '../../../../styles/common/JustBottomBorderTextInput';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import {showSuccess} from '../../../../services/utility';
import React, {useState} from 'react';
import {styles} from '../../../../styles/common/styles';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../../../../services/myUploadAdapter';
import {CKEditorToolbar} from '../../../../services/utility';
function Teacher(props) {
  const [name, setName] = useState(props.name);
  const [nid, setNid] = useState(props.nid);
  const [bio, setBio] = useState(props.bio);
  return (
    <PhoneView
      style={{
        ...styles.gap10,
      }}>
      <JustBottomBorderTextInput value={name} onChangeText={e => setName(e)} />
      <JustBottomBorderTextInput
        placeholder={'کدملی دبیر در سایت آیریسک (اختیاری)'}
        subText={'کدملی دبیر در سایت آیریسک (اختیاری)'}
        value={nid}
        onChangeText={e => setNid(e)}
      />
      <CKEditor
        editor={ClassicEditor}
        config={{
          customValues: {
            token: props.token,
          },
          extraPlugins: [MyCustomUploadAdapterPlugin],
          placeholder: 'متن  درباره استاد(اختیاری)',
          ...CKEditorToolbar,
        }}
        data={bio === undefined ? '' : bio}
        onReady={editor => {
          CKEditor = editor;
        }}
        onChange={(event, editor) => {
          setBio(editor.getData());
        }}
      />

      <FontIcon
        icon={faEdit}
        theme={'orangeRed'}
        kind={'normal'}
        onPress={async () => {
          props.setLoading(true);
          const data = {
            oldName: props.name,
            newName: name,
          };
          if (nid !== undefined && nid !== null && nid.length > 0)
            data.NID = nid;
          if (bio !== undefined) data.bio = bio;
          const res = await generalRequest(
            routes.changeTeacherName,
            'post',
            data,
            undefined,
            props.token,
          );
          props.setLoading(false);
          if (res != null) showSuccess();
        }}
      />
    </PhoneView>
  );
}
export default Teacher;
