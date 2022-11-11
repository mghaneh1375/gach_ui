import React, {useState} from 'react';
import {CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {statusKeyVals} from '../../question/components/KeyVals';
import Translator from '../Translate';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../../../../services/MyUploadAdapter';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';

function Create(props) {
  let ckEditor = null;

  const [visibility, setVisibility] = useState();
  const [description, setDescription] = useState();
  const [preReq, setPreReq] = useState();
  const [title, setTitle] = useState();
  const [teacher, setTeacher] = useState();
  const [price, setPrice] = useState();
  const [teacherBio, setTeacherBio] = useState();

  return (
    <CommonWebBox
      header={Translator.addNewItem}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView>
        <JustBottomBorderTextInput
          placeholder={Translator.title}
          onChangeText={e => setTitle(e)}
          value={title}
          subText={Translator.title}
        />
        <JustBottomBorderTextInput
          placeholder={Translator.price}
          onChangeText={e => setPrice(e)}
          value={price}
          justNum={true}
          subText={Translator.price}
        />
        <JustBottomBorderTextInput
          placeholder={Translator.teacher}
          onChangeText={e => setTeacher(e)}
          value={teacher}
          subText={Translator.teacher}
        />
        <JustBottomBorderSelect
          placeholder={Translator.visibility}
          subText={Translator.visibility}
          setter={setVisibility}
          values={statusKeyVals}
          value={statusKeyVals.find(elem => elem.id === visibility)}
        />
      </PhoneView>

      <CKEditor
        editor={ClassicEditor}
        config={{
          customValues: {token: props.token},
          extraPlugins: [MyCustomUploadAdapterPlugin],
          placeholder: Translator.description,
        }}
        data={description === undefined ? '' : description}
        onReady={editor => {
          ckEditor = editor;
        }}
        onChange={(event, editor) => {
          setDescription(editor.getData());
        }}
      />

      <CKEditor
        editor={ClassicEditor}
        config={{
          customValues: {token: props.token},
          extraPlugins: [MyCustomUploadAdapterPlugin],
          placeholder: Translator.teacherBio,
        }}
        data={teacherBio === undefined ? '' : teacherBio}
        onReady={editor => {
          ckEditor = editor;
        }}
        onChange={(event, editor) => {
          setTeacherBio(editor.getData());
        }}
      />

      <CKEditor
        editor={ClassicEditor}
        config={{
          customValues: {token: props.token},
          extraPlugins: [MyCustomUploadAdapterPlugin],
          placeholder: Translator.preReq,
        }}
        data={preReq === undefined ? '' : preReq}
        onReady={editor => {
          ckEditor = editor;
        }}
        onChange={(event, editor) => {
          setPreReq(editor.getData());
        }}
      />
    </CommonWebBox>
  );
}

export default Create;
