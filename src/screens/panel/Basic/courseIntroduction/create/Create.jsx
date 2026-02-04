import MyCustomUploadAdapterPlugin from '@/services/myUploadAdapter';
import {CKEditorToolbar} from '@/services/utility';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import commonTranslate from '@/translator/common';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import {useState} from 'react';
import {createCourseIntroduction, editCoueseIntroduction} from '../../utility';

function Create(props) {
  const [title, setTitle] = useState(
    props.item !== undefined ? props.item.title : '',
  );
  const [description, setDescription] = useState(
    props.item !== undefined ? props.item.description : '',
  );
  return (
    <MyView>
      <CommonWebBox
        backBtn={true}
        onBackClick={() => props.setMode('list')}
        header={
          props.item === undefined
            ? commonTranslate.add + ' ' + commonTranslate.courseIntroduction
            : commonTranslate.edit
        }>
        <MyView>
          <PhoneView>
            <JustBottomBorderTextInput
              value={title}
              onChangeText={e => setTitle(e)}
              placeholder={props.title}
              subText={commonTranslate.title}
            />
          </PhoneView>
          <PhoneView>
            <CKEditor
              editor={ClassicEditor}
              config={{
                customValues: {
                  token: props.token,
                },
                extraPlugins: [MyCustomUploadAdapterPlugin],
                placeholder: 'توضیحات',
                ...CKEditorToolbar,
              }}
              data={description === undefined ? '' : description}
              onChange={(_, editor) => {
                setDescription(editor.getData());
              }}
            />
          </PhoneView>
          <CommonButton
            onPress={async () => {
              props.setLoading(true);
              let res;
              if (props.item !== undefined) {
                res = await editCoueseIntroduction(props.item.id, props.token, {
                  title: title,
                  description: description,
                });
              } else {
                res = await createCourseIntroduction(props.token, {
                  title: title,
                  description: description,
                });
              }
              props.setLoading(false);
              if (res !== null) {
                props.afterFunc({
                  title: title,
                  id: props.item !== undefined ? props.item.id : res,
                });
                props.setMode('list');
              }
            }}
            title={commonTranslate.confirm}
          />
        </MyView>
      </CommonWebBox>
    </MyView>
  );
}
export default Create;
