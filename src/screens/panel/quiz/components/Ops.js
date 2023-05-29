import {CommonButton, SimpleText, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import translator from '../Translator';
import commonTranslator from '../../../../translator/Common';
import {
  BASE_SITE_NAME,
  CV_BASE_URL,
  generalRequest,
} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {
  createTaraz,
  finalizeQuizResult,
  generateQuestionPDF,
  transferToOpenQuiz,
} from './Utility';
import {dispatchQuizContext, quizContext} from './Context';
import React, {useState} from 'react';
import Translate from '../../../studentPanel/RunQuiz/Translate';
import {showSuccess} from '../../../../services/Utility';
import UploadFile from '../../../../components/web/UploadFile';

let timerVar;

const Ops = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [showUploadPane, setShowUploadPane] = useState(false);
  const [showLogPane, setShowLogPane] = useState(false);

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

  const toggleVisibility = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.editQuiz + state.selectedQuiz.id,
        'post',
        {
          visibility: !state.selectedQuiz.visibility,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        state.selectedQuiz.visibility = !state.selectedQuiz.visibility;
        dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      }
    });
  };

  const transferToOpenQuizLocal = async () => {
    props.setLoading(true);

    await transferToOpenQuiz(state.selectedQuiz.id, props.token);
    props.setLoading(false);
  };

  const createTarazLocal = async () => {
    props.setLoading(true);

    await createTaraz(
      state.selectedQuiz.id,
      state.selectedQuiz.generalMode,
      props.token,
    );
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
          routes.fetchQuiz +
            state.selectedQuiz.generalMode +
            '/' +
            state.selectedQuiz.id,
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

  const timer = React.useCallback(() => {
    if (state.selectedQuiz.cropped) return;

    timerVar = setTimeout(() => {
      props.setLoading(true);
      Promise.all([
        generalRequest(
          routes.getLogs +
            state.selectedQuiz.generalMode +
            '/' +
            state.selectedQuiz.id,
          'get',
          undefined,
          'data',
          props.token,
        ),
      ]).then(res => {
        props.setLoading(false);

        if (res[0] != null) {
          state.selectedQuiz.logs = res[0].logs;
          state.selectedQuiz.cropped = res[0].cropped;
          dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
        }

        if (res[0] == null || res[0].cropped) {
          clearTimeout(timerVar);
          return;
        }

        timer();
      });
    }, [10000]);
  }, [dispatch, props, state.selectedQuiz]);

  React.useEffect(() => {
    if (showLogPane) timer();
  }, [showLogPane, timer]);

  return (
    <>
      {!showUploadPane && (
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
            {(state.selectedQuiz.mode !== 'tashrihi' ||
              state.selectedQuiz.startRegistry !== undefined) &&
              (state.selectedQuiz.generalMode === 'irysc' ||
                state.selectedQuiz.generalMode === 'onlineStanding') && (
                <CommonButton
                  dir={'rtl'}
                  theme={'transparent'}
                  onPress={() => toggleVisibility()}
                  title={
                    state.selectedQuiz.visibility
                      ? commonTranslator.toHide
                      : commonTranslator.toShow
                  }
                />
              )}
            {(state.selectedQuiz.mode !== 'tashrihi' ||
              state.selectedQuiz.startRegistry !== undefined) && (
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
                title={Translate.review}
              />
            )}
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => changeMode('student')}
              title={translator.studentsList}
            />
            {state.selectedQuiz.generalMode !== 'onlineStanding' && (
              <CommonButton
                onPress={() => createTarazLocal()}
                dir={'rtl'}
                theme={'transparent'}
                title={translator.createTaraz}
              />
            )}
            {state.selectedQuiz.reportStatus === 'ready' &&
              state.selectedQuiz.generalMode === 'irysc' && (
                <CommonButton
                  dir={'rtl'}
                  theme={'transparent'}
                  title={translator.gift}
                  onPress={() =>
                    finalizeQuizResult(state.selectedQuiz.id, props.token)
                  }
                />
              )}
            {state.selectedQuiz.generalMode === 'irysc' &&
              state.selectedQuiz.mode !== 'tashrihi' && (
                <CommonButton
                  dir={'rtl'}
                  theme={'transparent'}
                  title={translator.transferToOpenQuiz}
                  onPress={() => transferToOpenQuizLocal()}
                />
              )}
            {state.selectedQuiz.reportStatus === 'ready' && (
              <CommonButton
                onPress={() => props.setMode('ranking')}
                dir={'rtl'}
                theme={'transparent'}
                title={translator.seeRanking}
              />
            )}
            {state.selectedQuiz.generalMode === 'onlineStanding' &&
              state.selectedQuiz.status === 'finished' && (
                <CommonButton
                  onPress={() => props.setMode('ranking')}
                  dir={'rtl'}
                  theme={'transparent'}
                  title={commonTranslator.report}
                />
              )}
            {state.selectedQuiz.generalMode !== 'onlineStanding' && (
              <CommonButton
                onPress={() => props.setMode('report')}
                dir={'rtl'}
                theme={'transparent'}
                title={commonTranslator.report}
              />
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
            {state.selectedQuiz.mode === 'tashrihi' && (
              <CommonButton
                dir={'rtl'}
                theme={'transparent'}
                onPress={async () => {
                  props.setLoading(true);
                  await generateQuestionPDF(
                    state.selectedQuiz.id,
                    state.selectedQuiz.generalMode,
                    props.token,
                  );

                  props.setLoading(false);
                }}
                title={translator.generateQuestionPDF}
              />
            )}
            {state.selectedQuiz.mode !== 'tashrihi' && (
              <CommonButton
                title={translator.keySheet}
                dir={'rtl'}
                theme={'transparent'}
                onPress={() => props.setMode('key')}
              />
            )}
            {state.selectedQuiz.mode === 'tashrihi' && (
              <CommonButton
                title={translator.correctors}
                dir={'rtl'}
                theme={'transparent'}
                onPress={() => props.setMode('correctors')}
              />
            )}
            {state.selectedQuiz.mode === 'tashrihi' &&
              state.selectedQuiz.isQRNeeded !== undefined &&
              state.selectedQuiz.isQRNeeded && (
                <CommonButton
                  title="نمایش لاگ ها"
                  dir={'rtl'}
                  theme={'transparent'}
                  onPress={() => setShowLogPane(true)}
                />
              )}
            {state.selectedQuiz.mode === 'tashrihi' &&
              state.selectedQuiz.isQRNeeded && (
                <CommonButton
                  title={'دانلود پاسخ برگ'}
                  dir={'rtl'}
                  theme={'transparent'}
                  onPress={() => downloadAnswerSheet()}
                />
              )}
            {state.selectedQuiz.mode === 'tashrihi' &&
              state.selectedQuiz.isQRNeeded && (
                <CommonButton
                  title={'آپلود پاسخ برگها'}
                  dir={'rtl'}
                  theme={'transparent'}
                  onPress={() => setShowUploadPane(true)}
                />
              )}
            {(state.selectedQuiz.mode !== 'tashrihi' ||
              state.selectedQuiz.startRegistry !== undefined) && (
              <CommonButton
                title={translator.copyLink}
                dir={'rtl'}
                theme={'transparent'}
                onPress={() => {
                  if (state.selectedQuiz.generalMode === 'onlineStanding')
                    navigator.clipboard.writeText(
                      BASE_SITE_NAME +
                        'onlineStandingQuizRegistration/' +
                        state.selectedQuiz.id,
                    );
                  else
                    navigator.clipboard.writeText(
                      BASE_SITE_NAME + 'buy/' + state.selectedQuiz.id,
                    );
                  showSuccess('لینک کپی شد!');
                }}
              />
            )}
          </PhoneView>
        </LargePopUp>
      )}
      {showLogPane && (
        <LargePopUp
          title={'لاگ ها'}
          toggleShowPopUp={() => setShowLogPane(false)}>
          {state.selectedQuiz.logs === undefined && (
            <SimpleText text={'در حال گرفتن داده ها'} />
          )}
          {state.selectedQuiz.logs !== undefined && (
            <SimpleText text={state.selectedQuiz.logs} />
          )}
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
              state.selectedQuiz.logs = undefined;
              state.selectedQuiz.cropped = false;
              dispatch({selectedQuiz: state.selectedQuiz});
              showSuccess();
              setShowUploadPane(false);
              setShowLogPane(true);
            }
          }}
        />
      )}
    </>
  );
};

export default Ops;
