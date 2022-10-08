import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import translator from '../../Translator';
import MyCustomUploadAdapterPlugin from '../../../../../services/MyUploadAdapter';
import {
  CommonButton,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../../styles/Common';
import {useState} from 'react';
import UploadFile from '../../../../../components/web/UploadFile';
import {routes} from '../../../../../API/APIRoutes';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';

const QuizAnswerSheetInfo = props => {
  let ckEditor = null;
  const [showUploadFile, setShowUploadFile] = useState(false);

  const toggleShowUploadFile = () => {
    setShowUploadFile(!showUploadFile);
  };

  return (
    <MyView>
      <PhoneView style={{...styles.gap15}}>
        <SimpleText
          style={{...styles.alignSelfCenter, ...styles.BlueBold}}
          text={'پیوست آزمون'}
        />
        <SimpleFontIcon
          onPress={() => props.openFileSelector()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView style={{marginTop: 20}}>
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
          accept={['video/*', '.pdf']}
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

      <MyView style={{marginTop: 20}}>
        <SimpleText text={translator.descBefore} />
        <CKEditor
          editor={ClassicEditor}
          config={{
            customValues: {token: props.token},
            extraPlugins: [MyCustomUploadAdapterPlugin],
            placeholder: translator.descBefore,
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

      <MyView style={{marginTop: 20}}>
        <SimpleText text={translator.descAfter} />
        <CKEditor
          editor={ClassicEditor}
          config={{
            customValues: {token: props.token},
            extraPlugins: [MyCustomUploadAdapterPlugin],
            placeholder: translator.descAfter,
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
