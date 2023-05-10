import React, {useState} from 'react';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../../panel/quiz/components/Context';
import {getRanking} from '../../../../panel/quiz/components/Utility';
import Translate from '../../Translate';
import {getMyAnswerSheet, getRecpForQuiz} from './Utility';
import translator from '../../../../panel/quiz/Translator';
import commonTranslator from '../../../../../translator/Common';
import {Rating} from 'react-native-ratings';
import vars from '../../../../../styles/root';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showError, showSuccess} from '../../../../../services/Utility';

function Ops(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [showRatePane, setShowRatePane] = useState(false);
  const [rate, setRate] = useState(
    state.selectedQuiz.stdRate === undefined ? 0 : state.selectedQuiz.stdRate,
  );

  React.useEffect(() => {
    if (state.selectedQuiz.stdRate !== undefined)
      setRate(state.selectedQuiz.stdRate);
  }, [state.selectedQuiz.stdRate]);

  const prepareShowAnswerSheet = async () => {
    console.log('asd');
    console.log(state.selectedQuiz.mode);

    if (state.selectedQuiz.mode === 'tashrihi') {
      props.navigate(
        '/showAnswerSheet/' +
          state.selectedQuiz.generalMode +
          '/' +
          state.selectedQuiz.id +
          '/student/' +
          props.user.user.id,
      );
      return;
    }

    console.log(state.selectedQuiz.answer_sheet);

    if (state.selectedQuiz.answer_sheet !== undefined) {
      dispatch({
        showAnswers: true,
        showStdAnswers: true,
        allowChangeStdAns: false,
        allowChangeAns: false,
        wanted_answer_sheet: state.selectedQuiz.answer_sheet,
      });

      props.toggleShowPopUp();
      props.setMode('answerSheet');
      return;
    }

    props.setLoading(true);
    let res = await getMyAnswerSheet(
      state.selectedQuiz.id,
      state.selectedQuiz.generalMode,
      props.token,
    );

    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.answer_sheet = res;

    dispatch({
      showAnswers: true,
      showStdAnswers: true,
      allowChangeStdAns: false,
      allowChangeAns: false,
      wanted_answer_sheet: res,
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
    });

    props.toggleShowPopUp();
    props.setMode('answerSheet');
  };

  const prepareShowRanking = async () => {
    if (state.selectedQuiz.ranking !== undefined) {
      props.toggleShowPopUp();
      props.setMode('ranking');
      return;
    }

    props.setLoading(true);
    let res = await getRanking(
      state.selectedQuiz.id,
      state.selectedQuiz.generalMode,
      state.selectedQuiz.generalMode === 'open' ? props.token : undefined,
    );

    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.ranking = res;

    dispatch({
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
    });

    props.toggleShowPopUp();
    props.setMode('ranking');
  };

  const prepareShowResult = async () => {
    dispatch({selectedStudentId: props.user.user.id});
    props.toggleShowPopUp();
    props.setMode('result');
  };

  const getRecp = async () => {
    if (state.selectedQuiz.recp !== undefined) {
      props.setRecp(state.selectedQuiz.recp);
      props.toggleShowPopUp();
      props.setMode('recp');
      return;
    }

    props.setLoading(true);
    let res = await getRecpForQuiz(
      state.selectedQuiz.id,
      state.selectedQuiz.generalMode,
      props.token,
    );

    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.recp = res;

    dispatch({
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
    });

    props.toggleShowPopUp();
    props.setRecp(res);
  };

  const prepareReview = () => {
    props.navigate(
      '/reviewQuiz/' +
        state.selectedQuiz.generalMode +
        '/' +
        state.selectedQuiz.id,
    );
  };

  return (
    <LargePopUp
      toggleShowPopUp={props.toggleShowPopUp}
      btns={
        showRatePane ? (
          <CommonButton
            onPress={async () => {
              if (rate === undefined) {
                showError('لطفا امتیاز موردنظر خود را انتخاب کنید');
                return;
              }
              props.setLoading(true);
              let res = await generalRequest(
                routes.rateQuiz +
                  state.selectedQuiz.generalMode +
                  '/' +
                  state.selectedQuiz.id,
                'put',
                {rate: rate},
                'data',
                props.token,
              );
              props.setLoading(false);
              if (res != null) {
                state.selectedQuiz.stdRate = rate;
                state.selectedQuiz.rate = res;
                dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
                showSuccess();
                setShowRatePane(false);
              }
            }}
            theme={vars.DARK_BLUE}
            title={commonTranslator.confirm}
          />
        ) : (
          <></>
        )
      }>
      {!showRatePane && (
        <>
          {props.user.accesses.indexOf('student') !== -1 && (
            <PhoneView style={{gap: 10}}>
              {state.selectedQuiz.status === 'finished' && (
                <CommonButton
                  onPress={() => prepareShowResult()}
                  title={Translate.result}
                  theme={'transparent'}
                />
              )}
              {state.selectedQuiz.status === 'finished' && (
                <CommonButton
                  onPress={() => prepareShowAnswerSheet()}
                  title={Translate.answerSheet}
                  theme={'transparent'}
                />
              )}
              {state.selectedQuiz.status === 'finished' && (
                <CommonButton
                  onPress={() => prepareShowRanking()}
                  title={Translate.ranking}
                  theme={'transparent'}
                />
              )}
              <CommonButton
                onPress={() => getRecp()}
                title={Translate.recp}
                theme={'transparent'}
              />
              <CommonButton
                onPress={() => setShowRatePane(true)}
                title={Translate.rate}
                theme={'transparent'}
              />
              {state.selectedQuiz.status === 'finished' &&
                (state.selectedQuiz.isQRNeeded === undefined ||
                  !state.selectedQuiz.isQRNeeded) && (
                  <CommonButton
                    onPress={() => prepareReview()}
                    title={Translate.review}
                    theme={'transparent'}
                  />
                )}
            </PhoneView>
          )}
          {props.user.accesses.indexOf('student') === -1 && (
            <PhoneView style={{gap: 10}}>
              <CommonButton
                dir={'rtl'}
                theme={'transparent'}
                onPress={() => {
                  props.setWantedQuizId(state.selectedQuiz.id);
                  props.setMode('students');
                }}
                title={translator.studentsList}
              />

              {state.selectedQuiz.reportStatus === 'ready' && (
                // <CommonButton
                //   onPress={() => props.setMode('ranking')}
                //   dir={'rtl'}
                //   theme={'transparent'}
                //   title={translator.seeRanking}
                // />
                <CommonButton
                  onPress={() => prepareShowRanking()}
                  title={Translate.ranking}
                  theme={'transparent'}
                />
              )}

              {state.selectedQuiz.reportStatus === 'ready' && (
                <CommonButton
                  onPress={() => props.setMode('report')}
                  dir={'rtl'}
                  theme={'transparent'}
                  title={commonTranslator.report}
                />
              )}
            </PhoneView>
          )}
        </>
      )}
      {showRatePane && rate !== undefined && (
        <MyView>
          <EqualTwoTextInputs
            style={{width: 300, alignItems: 'center', alignSelf: 'center'}}>
            <SimpleText text={Translate.yourRate} />
            <Rating
              type="star"
              ratingCount={5}
              imageSize={30}
              fractions={0}
              style={{
                direction: 'ltr',
                cursor: 'pointer',
              }}
              startingValue={rate}
              onFinishRating={rating => setRate(rating)}
            />
          </EqualTwoTextInputs>
        </MyView>
      )}
    </LargePopUp>
  );
}

export default Ops;
