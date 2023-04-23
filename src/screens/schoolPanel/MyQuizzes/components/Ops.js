import React, {useState, useRef} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {CV_BASE_URL, generalRequest} from '../../../../API/Utility';
import UploadFile from '../../../../components/web/UploadFile';
import {
  formatPrice,
  showError,
  showSuccess,
} from '../../../../services/Utility';
import {
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import translator from '../../../panel/quiz/Translator';
import {dispatchMyQuizzesContext, myQuizzesContext} from './Context';
import commonTranslator from '../../../../translator/Common';
import {
  createTaraz,
  generateQuestionPDF,
} from '../../../panel/quiz/components/Utility';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {setCacheItem} from '../../../../API/User';
import SuccessTransaction from '../../../../components/web/SuccessTransaction/SuccessTransaction';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import CV from '../../../panel/quiz/components/CV/CV';
import Ranking from './Ranking/Ranking';

const Ops = props => {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];

  const [showUploadPane, setShowUploadPane] = useState(false);
  const [state, dispatch] = useGlobalState();

  const [showChoosePageTheme, setShowChoosePageTheme] = useState(false);

  const downloadAnswerSheet = async () => {
    if (theme === undefined || size === undefined) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }
    props.setLoading(true);

    let res = await generalRequest(
      CV_BASE_URL +
        'generateSchoolAnswerSheet/' +
        state.selectedQuiz.id +
        '/' +
        theme +
        '/' +
        size,
      'post',
      undefined,
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
  const [offcode, setOffcode] = useState();
  const [priceInfo, setPriceInfo] = useState();
  const [refId, setRefId] = useState();
  const ref = useRef();
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [transactionId, setTransactionId] = useState();

  const toggleVisibility = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.editQuiz + 'school/' + state.selectedQuiz.id,
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

  React.useEffect(() => {
    if (refId === undefined) return;

    setTimeout(() => {
      ref.current.submit();
    }, 1000);
  }, [refId]);

  const themes = [
    {item: 'قرمز', id: 'RED'},
    {item: 'آبی ', id: 'BLUE'},
    {item: 'سبز', id: 'GREEN'},
    {item: 'سفید', id: 'WHITE'},
  ];

  const sizes = [
    {item: 'A5', id: 'A5'},
    {item: 'A4', id: 'A4'},
  ];

  const [theme, setTheme] = useState();
  const [size, setSize] = useState();
  const [showCV, setShowCV] = useState(false);
  const [showRanking, setShowRanking] = useState(false);

  React.useEffect(() => {
    props.setShowList(!showCV);
  }, [showCV, props]);

  React.useEffect(() => {
    props.setShowList(!showRanking);
  }, [showRanking, props]);

  return (
    <>
      {showRanking && (
        <Ranking
          setLoading={props.setLoading}
          setMode={props.setMode}
          token={props.token}
          quizMode={state.selectedQuiz.mode}
          quizId={state.selectedQuiz.id}
          quizName={state.selectedQuiz.name}
        />
      )}
      {showCV && (
        <CV
          state={state}
          dispatch={dispatch}
          setLoading={props.setLoading}
          setMode={mode => {
            setShowCV(false);
          }}
          token={props.token}
        />
      )}
      {showChoosePageTheme && (
        <LargePopUp
          title={'دانلود پاسخ برگها'}
          btns={
            <CommonButton
              onPress={() => downloadAnswerSheet()}
              theme={'dark'}
              title={commonTranslator.confirm}
            />
          }
          toggleShowPopUp={() => setShowChoosePageTheme(false)}>
          <PhoneView>
            <JustBottomBorderSelect
              placeholder={'تم موردنظر'}
              subText={'تم موردنظر'}
              setter={setTheme}
              values={themes}
              value={
                theme === undefined
                  ? undefined
                  : themes.find(elem => elem.id === theme)
              }
            />
            <JustBottomBorderSelect
              placeholder={'اندازه موردنظر'}
              subText={'اندازه موردنظر'}
              setter={setSize}
              values={sizes}
              value={
                size === undefined
                  ? undefined
                  : sizes.find(elem => elem.id === size)
              }
            />
          </PhoneView>
        </LargePopUp>
      )}
      {showFinalizeMsg && (
        <LargePopUp
          title={translator.finalize}
          btns={
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                let res = await generalRequest(
                  routes.finalizeSchoolQuiz + state.selectedQuiz.id,
                  'post',
                  offcode === undefined ? undefined : {off: offcode},
                  ['action', 'refId', 'transactionId'],
                  props.token,
                );
                props.setLoading(false);
                if (res.action === 'success') {
                  let user = props.user;
                  user.user.money = res.refId;
                  await setCacheItem('user', JSON.stringify(user));
                  setTransactionId(res.transactionId);
                  setShowFinalizeMsg(false);
                  setShowSuccessTransaction(true);
                  state.selectedQuiz.status = 'finish';
                  dispatch({
                    selectedQuiz: state.selectedQuiz,
                    needUpdate: true,
                  });
                } else if (res.action === 'pay') {
                  setRefId(res.refId);
                }
              }}
              theme={'dark'}
              title={translator.finalize}
            />
          }
          toggleShowPopUp={() => setShowFinalizeMsg(false)}>
          <SimpleText text={translator.finalizeMsg} />
          {priceInfo !== undefined && (
            <MyView>
              <SimpleText
                text={'مبلغ آزمون: ' + formatPrice(priceInfo.total)}
              />
              <SimpleText
                text={
                  'مبلغ استفاده شده از کیف پول: ' +
                  formatPrice(priceInfo.usedFromWallet)
                }
              />
              <SimpleText text={'تخفیف: ' + formatPrice(priceInfo.off)} />
              <SimpleText
                text={'مبلغ قابل پرداخت: ' + formatPrice(priceInfo.shouldPay)}
              />
            </MyView>
          )}
          <JustBottomBorderTextInput
            onChangeText={e => setOffcode(e)}
            value={offcode}
            subText={
              commonTranslator.offcode + ' - ' + commonTranslator.optional
            }
            placeholder={commonTranslator.offcode}
          />
        </LargePopUp>
      )}
      {!showFinalizeMsg && !showCV && !showChoosePageTheme && !showRanking && (
        <LargePopUp
          title={state.selectedQuiz.title}
          toggleShowPopUp={props.toggleShowPopUp}>
          {showSuccessTransaction && (
            <SuccessTransaction
              navigate={props.navigate}
              transactionId={transactionId}
            />
          )}
          {!showSuccessTransaction && (
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
                title={
                  state.selectedQuiz.status === 'finish'
                    ? translator.seeQuestion
                    : translator.editQuestions
                }
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
                onPress={() => toggleVisibility()}
                title={
                  state.selectedQuiz.visibility
                    ? commonTranslator.toHide
                    : commonTranslator.toShow
                }
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
                    onPress={async () => {
                      props.setLoading(true);
                      let res = await generalRequest(
                        routes.getQuizTotalPriceForSchool +
                          state.selectedQuiz.id,
                        'get',
                        undefined,
                        'data',
                        props.token,
                      );
                      props.setLoading(false);
                      if (res != null) {
                        setPriceInfo(res);
                        setShowFinalizeMsg(true);
                      }
                    }}
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

                  {state.selectedQuiz.reportStatus === 'ready' && (
                    <CommonButton
                      onPress={() => setShowRanking(true)}
                      dir={'rtl'}
                      theme={'transparent'}
                      title={translator.seeRanking}
                    />
                  )}

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
                state.selectedQuiz.status === 'finish' &&
                state.selectedQuiz.mode === 'regular' && (
                  <CommonButton
                    dir={'rtl'}
                    theme={'transparent'}
                    onPress={() => setShowCV(true)}
                    title={translator.correntAnswerSheets}
                  />
                )}

              <CommonButton
                title={translator.keySheet}
                dir={'rtl'}
                theme={'transparent'}
                onPress={() => props.setMode('key')}
              />

              {(state.selectedQuiz.launchMode === 'physical' ||
                state.selectedQuiz.launchMode === 'hybrid') &&
                state.selectedQuiz.status === 'finish' &&
                state.selectedQuiz.mode === 'regular' && (
                  <CommonButton
                    title={'دانلود پاسخ برگ'}
                    dir={'rtl'}
                    theme={'transparent'}
                    onPress={() => setShowChoosePageTheme(true)}
                  />
                )}

              {state.selectedQuiz.status === 'finish' && (
                <CommonButton
                  title={'آپلود پاسخ برگها'}
                  dir={'rtl'}
                  theme={'transparent'}
                  onPress={() => setShowUploadPane(true)}
                />
              )}
            </PhoneView>
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
              state.selectedQuiz.cropped = false;
              dispatch({selectedQuiz: state.selectedQuiz});
              showSuccess();
              setShowUploadPane(false);
            }
          }}
        />
      )}

      {refId !== undefined && (
        <form
          ref={ref}
          action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
          method="post">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
    </>
  );
};

export default Ops;
