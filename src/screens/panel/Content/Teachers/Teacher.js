import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {PhoneView} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import React, {useState} from 'react';
import {styles} from '../../../../styles/Common/Styles';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../../../../services/MyUploadAdapter';
import {CKEditorToolbar} from '../../../../services/Utility';

function Teacher(props) {
  const [name, setName] = useState(props.name);
  const [nid, setNid] = useState(props.nid);
  const [bio, setBio] = useState(props.bio);

  return (
    <PhoneView style={{...styles.gap10}}>
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
          customValues: {token: props.token},
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
