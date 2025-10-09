import {
  CommonButton,
  MyView,
  PhoneView,
  SimpleFontIcon,
  SimpleText,
} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput';
import {LargePopUp} from '@/styles/common/PopUp';
import {styles} from '@/styles/common/styles';
import vars from '@/styles/root';
import commonTranslator from '@/translator/common';
import {faFolder, faTrash} from '@fortawesome/free-solid-svg-icons';
import {useFilePicker} from 'use-file-picker';
import translator from '../../translator';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {showError} from '@/services/utility';
import {routes} from '@/api/apiRoutes';
import {fileRequest, generalRequest} from '@/api/utility';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect';

function AutoAddPopUp({token, toggleShow, setLoading}) {
  const [isWorking, setIsWorking] = useState(false);
  const [openFileSelector, {filesContent, errors, clear}] = useFilePicker({
    maxFileSize: 5,
    accept: ['pdf', 'xlsx', 'xlx', 'xls'],
    multiple: true,
    readAs: 'ArrayBuffer',
  });
  const [selectedKindQuiz, setSelectedKindQuiz] = useState();
  const [availableQuizzes, setAvailableQuizzes] = useState();
  const [selectedQuiz, setSelectedQuiz] = useState();
  const [message, setMessage] = useState();
  const [errorsResult, setErrorsResult] = useState();

  const quizKinds = useMemo(
    () => [
      {
        item: 'آزمون باز',
        id: 'OPEN',
      },
      {
        item: 'آزمون پشت میز',
        id: 'IRYSC',
      },
    ],
    [],
  );

  const fetchQuizzes = useCallback(() => {
    setLoading(true);
    Promise.all([
      generalRequest(
        routes.quizDigests + '?mode=' + selectedKindQuiz,
        'get',
        undefined,
        'data',
        token,
      ),
    ]).then(res => {
      if (res[0] !== null) {
        setAvailableQuizzes(
          res[0].map(e => ({
            id: e.id,
            item: e.title,
          })),
        );
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKindQuiz]);

  useEffect(() => {
    if (!selectedKindQuiz) return;
    fetchQuizzes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedKindQuiz]);

  const doUpload = () => {
    if (!isWorking && filesContent.length === 3) {
      const questionFile = filesContent.find(f =>
        f.name.startsWith('questions'),
      );
      const answerFile = filesContent.find(f => f.name.startsWith('answers'));
      const infoFile = filesContent.find(f => f.name.startsWith('info'));

      if (!questionFile || !answerFile || !infoFile) {
        showError('نام فایلها مطابق فرمت تعیین شده نمی باشد');
        return;
      }
      setIsWorking(true);
      setLoading(true);
      const data = new FormData();
      var questionblob = new Blob([new Uint8Array(questionFile.content)]);
      var answerblob = new Blob([new Uint8Array(answerFile.content)]);
      var infoblob = new Blob([new Uint8Array(infoFile.content)]);

      data.append('questionPdf', questionblob, questionFile.name);
      data.append('answerPdf', answerblob, answerFile.name);
      data.append('questionsInfo', infoblob, infoFile.name);
      Promise.all([
        fileRequest(
          routes.cropAndAddQuestionsToQuiz +
            selectedQuiz +
            '/' +
            selectedKindQuiz,
          'post',
          data,
          'data',
          token,
        ),
      ]).then(res => {
        if (res[0] !== null) {
          if (res[0].errors) setErrorsResult(res[0].errors);
          setMessage(res[0].message);
        }
        clear();
        setIsWorking(false);
        setLoading(false);
      });
    } else showError('تعداد فایلها باید 3 باشد');
  };

  return (
    <>
      <LargePopUp
        toggleShowPopUp={toggleShow}
        btns={
          <CommonButton
            onPress={doUpload}
            disabled={
              !selectedKindQuiz ||
              !selectedQuiz ||
              !filesContent ||
              filesContent.length !== 3
            }
            theme={'dark'}
            title={commonTranslator.confirmChanges}
          />
        }
        title={translator.addQuestionsAndAddToQuizAuto}>
        <PhoneView style={styles.gap15}>
          <JustBottomBorderSelect
            values={quizKinds}
            setter={setSelectedKindQuiz}
            value={quizKinds.find(e => e.id === selectedKindQuiz)}
            subText={'نوع آزمون'}
            placeholder={'نوع آزمون'}
          />
          {availableQuizzes && (
            <JustBottomBorderSelect
              values={availableQuizzes}
              setter={setSelectedQuiz}
              value={availableQuizzes.find(e => e.id === selectedQuiz)}
              subText={'آزمون مدنظر'}
              placeholder={'آزمون مدنظر'}
            />
          )}
        </PhoneView>
        <MyView style={(styles.gap15, styles.marginTop20)}>
          {selectedQuiz && (
            <PhoneView>
              <JustBottomBorderTextInput
                style={{minWidth: 250}}
                disable={true}
                placeholder={
                  filesContent.length > 0
                    ? filesContent.map(e => e.name).join('-')
                    : commonTranslator.notChooseFile
                }
                subText={
                  commonTranslator.maxSize +
                  5 +
                  '  مگابایت   - ' +
                  commonTranslator.format +
                  ' ' +
                  'pdf, xlsx, xls, xlx'
                }
              />
              <MyView
                style={{
                  width: 40,
                  height: 40,
                  marginRight: 10,
                }}>
                <SimpleFontIcon onPress={openFileSelector} icon={faFolder} />
              </MyView>
              <MyView
                style={{
                  width: 40,
                  height: 40,
                }}>
                <SimpleFontIcon
                  onPress={clear}
                  style={{
                    color: vars.ORANGE_RED,
                  }}
                  icon={faTrash}
                />
              </MyView>
            </PhoneView>
          )}
        </MyView>

        {errors.length > 0 &&
          errors[0].fileSizeTooSmall &&
          'File size is too small!'}
        {errors.length > 0 &&
          errors[0].fileSizeToolarge &&
          'File size is too large!'}
        {errors.length > 0 &&
          errors[0].readerError &&
          'Problem occured while reading file!'}
        {errors.length > 0 && errors[0].maxLimitExceeded && 'Too many files'}
        {errors.length > 0 &&
          errors[0].minLimitNotReached &&
          'Not enought files'}

        {isWorking &&
          filesContent.map((file, index) => (
            <div key={index}>
              <SimpleText
                text={
                  commonTranslator.uploading +
                  ' ' +
                  file.name +
                  ' ' +
                  commonTranslator.pleaseWait
                }
              />
            </div>
          ))}

        {message && (
          <SimpleText
            style={{marginTop: 10, marginBottom: 10}}
            text={message}
          />
        )}
        <MyView style={{maxHeight: 300, overflow: 'scroll', gap: 10}}>
          {errorsResult &&
            errorsResult.length > 0 &&
            errorsResult.map((error, index) => (
              <SimpleText style={{color: 'red'}} key={index} text={error} />
            ))}
        </MyView>
      </LargePopUp>
    </>
  );
}

export default AutoAddPopUp;
