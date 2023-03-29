import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {CV_BASE_URL, generalRequest} from '../../../../API/Utility';
import UploadFile from '../../../../components/web/UploadFile';
import {showSuccess} from '../../../../services/Utility';
import {CommonButton, PhoneView, SimpleText} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import translator from '../../../panel/quiz/Translator';
import {dispatchMyQuizzesContext, myQuizzesContext} from './Context';
import commonTranslator from '../../../../translator/Common';
import {
  createTaraz,
  generateQuestionPDF,
} from '../../../panel/quiz/components/Utility';

const Ops = props => {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];

  const [showUploadPane, setShowUploadPane] = useState(false);
  const [state, dispatch] = useGlobalState();

  const downloadAnswerSheet = async () => {
    props.setLoading(true);

    let res = await generalRequest(
      CV_BASE_URL + 'generateTashrihiAnswerSheet/' + state.selectedQuiz.id,
      'post',
      {
        mode: 1,
      },
      'data',
      props.token,
    );

    props.setLoading(false);

    if (res != null) {
      fetch(res, {
        method: 'GET',
      })
        .then(response => response.blob())
        .then(blob => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `پاسخنامه.pdf`);

          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        });
    }
  };

  const createTarazLocal = async () => {
    props.setLoading(true);
    await createTaraz(state.selectedQuiz.id, 'school', props.token);
    props.setLoading(false);
  };

  const changeMode = newMode => {
    if (
      newMode === 'update' &&
      state.selectedQuiz.showResultsAfterCorrection === undefined
    ) {
      props.setLoading(true);
      Promise.all([
        generalRequest(
          routes.fetchQuiz + 'school/' + state.selectedQuiz.id,
          'get',
          undefined,
          'data',
          props.token,
        ),
      ]).then(res => {
        props.setLoading(false);
        if (res[0] !== null) {
          dispatch({selectedQuiz: res[0], needUpdate: true});
          props.setMode(newMode);
          props.toggleShowPopUp();
        }
      });
    } else {
      props.setMode(newMode);
      props.toggleShowPopUp();
    }
  };

  const [showFinalizeMsg, setShowFinalizeMsg] = useState(false);

  return (
    <>
      {showFinalizeMsg && (
        <LargePopUp
          title={translator.finalize}
          btns={<CommonButton theme={'dark'} title={commonTranslator.yes} />}
          toggleShowPopUp={() => setShowFinalizeMsg(false)}>
          <SimpleText text={translator.finalizeMsg} />
        </LargePopUp>
      )}
      {!showFinalizeMsg && (
        <LargePopUp
          title={state.selectedQuiz.title}
          toggleShowPopUp={props.toggleShowPopUp}>
          <PhoneView>
            <CommonButton
              onPress={() => changeMode('update')}
              dir={'rtl'}
              theme={'transparent'}
              title={translator.seeInfo}
            />
            <CommonButton
              dir={'rtl'}
              onPress={() => changeMode('question')}
              theme={'transparent'}
              title={translator.editQuestions}
            />

            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() =>
                window.open(
                  '/reviewQuiz/' +
                    state.selectedQuiz.generalMode +
                    '/' +
                    state.selectedQuiz.id,
                  '_blank',
                )
              }
              title={'مرور آزمون'}
            />

            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => changeMode('student')}
              title={translator.studentsList}
            />

            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => changeMode('recp')}
              title={translator.recp}
            />

            {state.selectedQuiz.status === 'init' && (
              <>
                <CommonButton
                  dir={'rtl'}
                  theme="transparent"
                  onPress={() => setShowFinalizeMsg(true)}
                  title={translator.finalize}
                />
              </>
            )}
            {state.selectedQuiz.status === 'finish' && (
              <>
                <CommonButton
                  onPress={() => createTarazLocal()}
                  dir={'rtl'}
                  theme={'transparent'}
                  title={translator.createTaraz}
                />

                <CommonButton
                  onPress={() => props.setMode('report')}
                  dir={'rtl'}
                  theme={'transparent'}
                  title={commonTranslator.report}
                />

                <CommonButton
                  dir={'rtl'}
                  theme={'transparent'}
                  onPress={async () => {
                    props.setLoading(true);
                    await generateQuestionPDF(
                      state.selectedQuiz.id,
                      'school',
                      props.token,
                    );

                    props.setLoading(false);
                  }}
                  title={translator.generateQuestionPDF}
                />
              </>
            )}

            {(state.selectedQuiz.launchMode === 'physical' ||
              state.selectedQuiz.launchMode === 'hybrid') &&
              state.selectedQuiz.mode === 'regular' && (
                <CommonButton
                  dir={'rtl'}
                  theme={'transparent'}
                  onPress={() => props.setMode('CV')}
                  title={translator.correntAnswerSheets}
                />
              )}

            <CommonButton
              title={translator.keySheet}
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => props.setMode('key')}
            />

            <CommonButton
              title={'دانلود پاسخ برگ'}
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => downloadAnswerSheet()}
            />

            <CommonButton
              title={'آپلود پاسخ برگها'}
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => setShowUploadPane(true)}
            />
          </PhoneView>
        </LargePopUp>
      )}

      {showUploadPane && (
        <UploadFile
          url={
            CV_BASE_URL + 'uploadTashrihiAnswerSheets/' + state.selectedQuiz.id
          }
          token={props.token}
          maxFileSize={20}
          accept={['.pdf']}
          toggleShow={() => setShowUploadPane(false)}
          title={'آپلود پاسخ برگها'}
          multi={false}
          setResult={res => {
            if (res) {
              state.selectedQuiz.cropped = false;
              dispatch({selectedQuiz: state.selectedQuiz});
              showSuccess();
              setShowUploadPane(false);
            }
          }}
        />
      )}
    </>
  );
};

export default Ops;
