import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import translator from '../../translator';
import MyCustomUploadAdapterPlugin from '../../../../../services/myUploadAdapter';
import {CommonButton, PhoneView, SimpleText, MyView} from '@/styles';
import {useState} from 'react';
import UploadFile from '@/components/web/UploadFile.jsx';
import {routes} from '@/api/apiRoutes';
import {SimpleFontIcon} from '../../../../../styles/common/FontIcon.jsx';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {styles} from '@/styles/common/styles';
import AttachBox from '../../../ticket/components/show/attachBox/AttachBox.jsx';
import {CKEditorToolbar} from '../../../../../services/utility';
const QuizAnswerSheetInfo = props => {
  let ckEditor = null;
  const [showUploadFile, setShowUploadFile] = useState(false);
  const toggleShowUploadFile = () => {
    setShowUploadFile(!showUploadFile);
  };
  return (
    <MyView>
      <PhoneView
        style={{
          ...styles.gap15,
        }}>
        <SimpleText
          style={{
            ...styles.alignSelfCenter,
            ...styles.BlueBold,
          }}
          text={'پیوست آزمون'}
        />
        <SimpleFontIcon
          onPress={() => props.openFileSelector()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView
          style={{
            marginTop: 20,
          }}>
          {props.attaches !== undefined &&
            props.attaches.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem}
                  removeAttach={async () => {
                    await props.removeUploadedAttach(elem);
                  }}
                />
              );
            })}

          {props.filesContent !== undefined &&
            props.filesContent.length > 0 &&
            props.filesContent.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem.name}
                  fileContent={elem.content}
                  removeAttach={() => {
                    props.removeAttach(index);
                  }}
                />
              );
            })}
        </PhoneView>
      </PhoneView>
      {showUploadFile && (
        <UploadFile
          show={showUploadFile}
          toggleShow={toggleShowUploadFile}
          maxFileSize={20}
          accept={['image/*']}
          expectedRes={'url'}
          url={routes.uploadQuizAttaches}
          title={translator.uploadFile}
          multi={false}
          copyLink={true}
          token={props.token}
        />
      )}
      <PhoneView>
        <CommonButton
          onPress={() => toggleShowUploadFile()}
          title={translator.uploadFile}
        />
      </PhoneView>

      <MyView
        style={{
          marginTop: 20,
        }}>
        <SimpleText text={translator.descBefore} />
        <CKEditor
          editor={ClassicEditor}
          config={{
            customValues: {
              token: props.token,
            },
            extraPlugins: [MyCustomUploadAdapterPlugin],
            placeholder: translator.descBefore,
            ...CKEditorToolbar,
          }}
          data={props.descBefore === undefined ? '' : props.descBefore}
          onReady={editor => {
            ckEditor = editor;
          }}
          onChange={(event, editor) => {
            props.setDescBefore(editor.getData());
          }}
        />
      </MyView>

      <MyView
        style={{
          marginTop: 20,
        }}>
        <SimpleText text={translator.descAfter} />
        <CKEditor
          editor={ClassicEditor}
          config={{
            customValues: {
              token: props.token,
            },
            extraPlugins: [MyCustomUploadAdapterPlugin],
            placeholder: translator.descAfter,
            ...CKEditorToolbar,
          }}
          data={props.descAfter === undefined ? '' : props.descAfter}
          onReady={editor => {
            ckEditor = editor;
          }}
          onChange={(event, editor) => {
            props.setDescAfter(editor.getData());
          }}
        />
      </MyView>
    </MyView>
  );
};
export default QuizAnswerSheetInfo;
