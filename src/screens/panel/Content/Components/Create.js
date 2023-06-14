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
import {showError, trueFalseValues} from '../../../../services/Utility';
import {contentContext, dispatchContentContext} from './Context';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {addFile, fetchContent, removeFile, store, update} from './Utility';
import {styles} from '../../../../styles/Common/Styles';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../ticket/components/Show/AttachBox/AttachBox';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import {typeKeyVals} from '../../offcode/components/Utility';

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
  const [teacher, setTeacher] = useState([]);
  const [price, setPrice] = useState();
  const [sessionsCount, setSessionsCount] = useState();
  const [teacherBio, setTeacherBio] = useState();
  const [hasCert, setHasCert] = useState();
  const [certDuration, setCertDuration] = useState();
  const [certId, setCertId] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [certs, setCerts] = useState();
  const [tags, setTags] = useState([]);
  const [allTags, setAllTags] = useState();
  const [quizzes, setQuizzes] = useState();
  const [hasExam, setHasExam] = useState();
  const [finalExamId, setFinalExamId] = useState();
  const [finalExamMinMark, setFinalExamMinMark] = useState();
  const [teachers, setTeachers] = useState();
  const [slug, setSlug] = useState();
  const [priority, setPriority] = useState();
  const [duration, setDuration] = useState();

  const [off, setOff] = useState();
  const [offType, setOffType] = useState();
  const [offStartAt, setOffStartAt] = useState();
  const [offExpireAt, setOffExpireAt] = useState();

  const removeImg = index => {
    remove(index);
  };

  const removeUploadedImg = async () => {
    props.setLoading(true);
    let res = await removeFile(props.token, state.selectedContent.id);
    props.setLoading(false);
    if (res === null) return;
    setImg(undefined);

    state.selectedContent.img = undefined;
    dispatch({selectedContent: state.selectedContent, needUpdate: true});
  };

  const [img, setImg] = useState();
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['image/*'],
      readAs: 'DataURL',
      multiple: false,
    });

  const [fetchedTeacherBio, setFetchedTeacherBio] = useState();

  const getTeacherBio = React.useCallback(() => {
    if (isWorking || fetchedTeacherBio !== undefined) return;

    props.setLoading(true);
    setIsWorking(true);

    Promise.all([
      generalRequest(
        routes.getTeacherBio,
        'post',
        {teacher: teacher[0]},
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return;

      setFetchedTeacherBio(res[0] === undefined ? '' : res[0]);
      setTeacherBio(res[0]);
      setIsWorking(false);
    });
  }, [props, isWorking, teacher, fetchedTeacherBio]);

  React.useEffect(() => {
    setFetchedTeacherBio(undefined);
  }, [teacher]);

  React.useEffect(() => {
    if (teacher === undefined || teacher.length === 0 || teacher[0] === '') {
      setTeacherBio('');
      return;
    }
    getTeacherBio();
  }, [teacher, getTeacherBio]);

  const fetchCertification = React.useCallback(() => {
    if (isWorking || certs !== undefined) return;

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
        routes.getAllContentQuizzesDigest,
        'get',
        undefined,
        'data',
        props.token,
      ),
      generalRequest(
        routes.distinctTeachersContents,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (!props.isInEditMode) props.setLoading(false);

      if (
        res[0] === null ||
        res[1] === null ||
        res[2] === null ||
        res[3] === null
      ) {
        props.setMode('list');
        props.setLoading(false);
        return;
      }

      setAllTags(
        res[1].map((elem, index) => {
          return {id: index, name: elem};
        }),
      );

      setTeachers(
        res[3].map((elem, index) => {
          return {id: index, name: elem};
        }),
      );
      setCerts(res[0]);
      setQuizzes(res[2]);

      if (!props.isInEditMode) setIsWorking(false);

      if (props.isInEditMode !== undefined && props.isInEditMode) {
        Promise.all([
          fetchContent(state.selectedContent.slug, props.token),
        ]).then(res => {
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
          setPriority(res[0].priority);
          setImg(res[0].img);
          setSessionsCount(res[0].sessionsCount);
          setTeacherBio(res[0].teacherBio);
          setHasCert(res[0].hasCert);
          setDuration(res[0].duration);
          setCertDuration(res[0].certDuration);
          setSlug(res[0].slug);
          setOff(res[0].off);
          setOffType(res[0].offType);
          setOffExpireAt(res[0].offExpiration);
          setOffStartAt(res[0].offStart);

          if (res[0].hasCert) setCertId(res[0].certId);
          setTags(res[0].tags);
          setHasExam(res[0].hasFinalExam);
          if (res[0].hasFinalExam) {
            setFinalExamId(res[0].finalExamId);
            setFinalExamMinMark(res[0].finalExamMinMark);
          }

          setIsWorking(false);
        });
      }
    });
  }, [isWorking, props, certs, state.selectedContent]);

  React.useEffect(() => {
    if (state.certifications === undefined) fetchCertification();
  }, [state.certifications, fetchCertification]);

  return (
    <CommonWebBox
      header={props.isInEditMode ? Translator.editItem : Translator.addNewItem}
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
                let tmp = allTags;
                item.forEach(itr => {
                  if (allTags.find(elem => elem.id === itr.id) === undefined) {
                    tmp.push(itr);
                  }
                });
                setAllTags(tmp);
              }
            }}
            values={allTags}
            value={tags.map((elem, index) => {
              return {id: index, name: elem};
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
            placeholder={Translator.slug}
            onChangeText={e => setSlug(e)}
            value={slug}
            subText={Translator.slug}
          />

          <JustBottomBorderTextInput
            placeholder={Translator.priority}
            onChangeText={e => setPriority(e)}
            value={priority}
            justNum={true}
            subText={Translator.priority}
          />

          <JustBottomBorderTextInput
            placeholder={Translator.duration}
            subText={Translator.duration}
            onChangeText={e => setDuration(e)}
            value={duration}
            justNum={true}
          />

          <JustBottomBorderTextInput
            multi={true}
            addNotFound={true}
            resultPane={true}
            setSelectedItem={item => {
              setTeacher(
                item.map(elem => {
                  return elem.name;
                }),
              );
              if (item.length > 0) {
                let tmp = teachers;
                item.forEach(itr => {
                  if (teachers.find(elem => elem.id === itr.id) === undefined) {
                    tmp.push(itr);
                  }
                });
                setTeachers(tmp);
              }
            }}
            values={teachers}
            value={teacher.map((elem, index) => {
              return {id: index, name: elem};
            })}
            reset={false}
            placeholder={Translator.teacher}
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
              placeholder={Translator.certDuration}
              subText={Translator.certDuration}
              onChangeText={e => setCertDuration(e)}
              value={certDuration}
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

          <JustBottomBorderTextInput
            placeholder={Translator.off}
            subText={
              Translator.off + commonTranslator.col + commonTranslator.optional
            }
            justNum={true}
            onChangeText={e => setOff(e)}
            value={off}
          />

          <JustBottomBorderSelect
            placeholder={Translator.offType}
            subText={Translator.offType}
            setter={setOffType}
            values={typeKeyVals}
            value={typeKeyVals.find(elem => elem.id === offType)}
          />

          <JustBottomBorderDatePicker
            value={offStartAt}
            setter={setOffStartAt}
            placeholder={Translator.offStart}
            subText={Translator.offStart}
          />

          <JustBottomBorderDatePicker
            value={offExpireAt}
            setter={setOffExpireAt}
            placeholder={Translator.offExpire}
            subText={Translator.offExpire}
          />
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

      <PhoneView style={{...styles.gap15}}>
        <SimpleText
          style={{...styles.alignSelfCenter, ...styles.BlueBold}}
          text={Translator.image}
        />
        <SimpleFontIcon
          onPress={() => openFileSelector()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView style={{marginTop: 20}}>
          {img !== undefined && (
            <AttachBox
              filename={img}
              removeAttach={async () => {
                await removeUploadedImg();
              }}
            />
          )}

          {filesContent !== undefined &&
            filesContent.length > 0 &&
            filesContent.map((elem, index) => {
              return (
                <AttachBox
                  key={index}
                  filename={elem.name}
                  fileContent={elem.content}
                  removeAttach={() => {
                    removeImg(index);
                  }}
                />
              );
            })}
        </PhoneView>
      </PhoneView>
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
              slug: slug,
              duration: duration,
              priority: priority,
            };

            if (hasCert) {
              data.certDuration = certDuration;
              data.certId = certId;
            }

            if (hasExam) {
              data.finalExamId = finalExamId;
              data.finalExamMinMark = finalExamMinMark;
            }

            if (off !== undefined) {
              if (
                offExpireAt === undefined ||
                offStartAt === undefined ||
                offType === undefined
              ) {
                showError(commonTranslator.pleaseFillAllFields);
                return;
              }
              data.off = off;
              data.offExpiration = offExpireAt;
              data.offStart = offStartAt;
              data.offType = offType;
            }

            props.setLoading(true);
            let res = props.isInEditMode
              ? await update(props.token, data, state.selectedContent.id)
              : await store(props.token, data);

            if (res != null) {
              let contentId = props.isInEditMode
                ? state.selectedContent.id
                : res.id;

              if (filesContent.length > 0) {
                let img = undefined;

                let fileRes = await addFile(
                  props.token,
                  filesContent[0],
                  contentId,
                );
                if (fileRes !== null && fileRes !== undefined) img = fileRes;

                res.img = img;
                props.setLoading(false);
              } else {
                if (props.isInEditMode) res.img = state.selectedContent.img;
                props.setLoading(false);
              }

              let contents = state.contents;
              if (props.isInEditMode) {
                contents = contents.map(elem => {
                  if (elem.id === state.selectedContent.id) return res;
                  return elem;
                });
              } else contents.push(res);
              dispatch({contents: contents});
              props.setMode('list');
            } else props.setLoading(false);
          }}
          title={commonTranslator.confirm}
          theme="dark"
        />
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Create;
