import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {statusKeyVals} from '../../question/components/KeyVals';
import Translator from '../Translate';
import commonTranslator from '../../../../translator/Common';

import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyCustomUploadAdapterPlugin from '../../../../services/MyUploadAdapter';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {trueFalseValues} from '../../../../services/Utility';
import {contentContext, dispatchContentContext} from './Context';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {fetchContent, fetchContents, store} from './Utility';

function Create(props) {
  let ckEditor = null;

  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [visibility, setVisibility] = useState();
  const [description, setDescription] = useState();
  const [preReq, setPreReq] = useState();
  const [title, setTitle] = useState();
  const [teacher, setTeacher] = useState();
  const [price, setPrice] = useState();
  const [sessionsCount, setSessionsCount] = useState();
  const [teacherBio, setTeacherBio] = useState();
  const [hasCert, setHasCert] = useState();
  const [duration, setDuration] = useState();
  const [certId, setCertId] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [certs, setCerts] = useState();
  const [tags, setTags] = useState([]);
  const [quizzes, setQuizzes] = useState();
  const [hasExam, setHasExam] = useState();
  const [finalExamId, setFinalExamId] = useState();
  const [finalExamMinMark, setFinalExamMinMark] = useState();

  const fetchCertification = React.useCallback(() => {
    if (isWorking || state.certifications !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getAllCertsDigest,
        'get',
        undefined,
        'data',
        props.token,
      ),
      generalRequest(
        routes.distinctTagsContents,
        'get',
        undefined,
        'data',
        props.token,
      ),
      generalRequest(
        routes.getAllQuizzesDigest,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (!props.isInEditMode) props.setLoading(false);

      if (res[0] === null || res[1] === null || res[2] === null) {
        props.setMode('list');
        props.setLoading(false);
        return;
      }
      dispatch({certifications: res[0], tags: res[1], quizzes: res[2]});
      setCerts(res[0]);
      setQuizzes(res[2]);

      if (!props.isInEditMode) setIsWorking(false);

      if (props.isInEditMode !== undefined && props.isInEditMode) {
        Promise.all([fetchContent(state.selectedContent.id, props.token)]).then(
          res => {
            props.setLoading(false);

            if (res[0] === null) {
              props.setMode('list');
              return;
            }

            setVisibility(res[0].visibility);
            setDescription(res[0].description);
            setPreReq(res[0].preReq);
            setTitle(res[0].title);
            setTeacher(res[0].teacher);
            setPrice(res[0].price);
            setSessionsCount(res[0].sessionsCount);
            setTeacherBio(res[0].teacherBio);
            setHasCert(res[0].hasCert);
            setDuration(res[0].duration);

            if (res[0].hasCert) setCertId(res[0].certId);
            setTags(res[0].tags);
            setHasExam(res[0].hasFinalExam);
            if (res[0].hasFinalExam) {
              setFinalExamId(res[0].finalExamId);
              setFinalExamMinMark(res[0].finalExamMinMark);
            }

            setIsWorking(false);
          },
        );
      }
    });
  }, [isWorking, props, state.certifications, dispatch, state.selectedContent]);

  React.useEffect(() => {});

  React.useEffect(() => {
    if (state.certifications === undefined) fetchCertification();
  }, [state.certifications, fetchCertification]);

  return (
    <CommonWebBox
      header={Translator.addNewItem}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      {!isWorking && (
        <PhoneView style={{gap: 10}}>
          <JustBottomBorderTextInput
            placeholder={Translator.title}
            onChangeText={e => setTitle(e)}
            value={title}
            subText={Translator.title}
          />
          <JustBottomBorderTextInput
            multi={true}
            addNotFound={true}
            resultPane={true}
            setSelectedItem={item => {
              setTags(
                item.map(elem => {
                  return elem.name;
                }),
              );
              if (item.length > 0) {
                let tmp = state.tags;
                item.forEach(itr => {
                  if (
                    state.tags.find(elem => elem.id === itr.id) === undefined
                  ) {
                    tmp.push(itr);
                  }
                });
                dispatch({tags: tmp});
              }
            }}
            values={state.tags}
            value={tags.map((elem, index) => {
              return {id: index, title: elem};
            })}
            reset={false}
            placeholder={Translator.tags}
            subText={Translator.tags}
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
            placeholder={commonTranslator.visibility}
            subText={commonTranslator.visibility}
            setter={setVisibility}
            values={statusKeyVals}
            value={statusKeyVals.find(elem => elem.id === visibility)}
          />

          <JustBottomBorderTextInput
            placeholder={Translator.sessionsCount}
            onChangeText={e => setSessionsCount(e)}
            value={sessionsCount}
            justNum={true}
            subText={Translator.sessionsCount}
          />

          <JustBottomBorderSelect
            placeholder={Translator.hasCert}
            subText={Translator.hasCert}
            setter={setHasCert}
            values={trueFalseValues}
            value={trueFalseValues.find(elem => elem.id === hasCert)}
          />

          {hasCert !== undefined && hasCert && (
            <JustBottomBorderTextInput
              placeholder={Translator.duration}
              subText={Translator.duration}
              onChangeText={e => setDuration(e)}
              value={duration}
              justNum={true}
            />
          )}

          {hasCert !== undefined && hasCert && certs !== undefined && (
            <JustBottomBorderSelect
              value={
                certId === undefined
                  ? {}
                  : certs.filter(element => {
                      return element.id === certId;
                    })[0]
              }
              placeholder={Translator.cert}
              subText={Translator.cert}
              setter={setCertId}
              values={certs}
            />
          )}

          <JustBottomBorderSelect
            placeholder={Translator.hasExam}
            subText={Translator.hasExam}
            setter={setHasExam}
            values={trueFalseValues}
            value={trueFalseValues.find(elem => elem.id === hasExam)}
          />

          {hasExam !== undefined && hasExam && (
            <JustBottomBorderTextInput
              placeholder={Translator.finalExamMinMark}
              subText={Translator.finalExamMinMark}
              onChangeText={e => setFinalExamMinMark(e)}
              value={finalExamMinMark}
              justNum={true}
            />
          )}

          {hasExam !== undefined && hasExam && quizzes !== undefined && (
            <JustBottomBorderTextInput
              resultPane={true}
              reset={false}
              value={
                finalExamId === undefined
                  ? ''
                  : quizzes.filter(element => {
                      return element.id === finalExamId;
                    })[0].name
              }
              placeholder={Translator.finalExam}
              subText={Translator.finalExam}
              setSelectedItem={item => setFinalExamId(item.id)}
              values={quizzes}
            />
          )}
        </PhoneView>
      )}

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
      <EqualTwoTextInputs>
        <CommonButton
          onPress={() => props.setMode('list')}
          title={commonTranslator.back}
        />
        <CommonButton
          onPress={async () => {
            let data = {
              visibility: visibility,
              description: description,
              preReq: preReq,
              title: title,
              teacher: teacher,
              price: price,
              sessionsCount: sessionsCount,
              teacherBio: teacherBio,
              tags: tags,
            };

            if (hasCert) {
              data.duration = duration;
              data.certId = certId;
            }

            if (hasExam) {
              data.finalExamId = finalExamId;
              data.finalExamMinMark = finalExamMinMark;
            }

            props.setLoading(true);
            let res = await store(props.token, data);

            props.setLoading(false);

            if (res != null) {
              let contents = state.contents;
              contents.push(res.data);
              dispatch({contents: contents});
              props.setMode('list');
            }
          }}
          title={commonTranslator.confirm}
          theme="dark"
        />
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Create;
