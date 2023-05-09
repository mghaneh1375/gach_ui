import React, {useRef, useState} from 'react';
import {
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import Card from '../../../../panel/quiz/components/Card/Card';
import {
  quizContext,
  dispatchQuizContext,
} from '../../../../panel/quiz/components/Context';
import Ops from './Ops';
import {fetchMyQuizzes} from './Utility';
import ProgressCard from '../../../‌MyOffs/ProgressCard/ProgressCard';
import {styles} from '../../../../../styles/Common/Styles';
import vars from '../../../../../styles/root';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {setCacheItem} from '../../../../../API/User';
import SuccessTransaction from '../../../../../components/web/SuccessTransaction/SuccessTransaction';
import {formatPrice} from '../../../../../services/Utility';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [quizzes, setQuizzes] = useState();
  const [showOpPane, setShowOpPane] = useState(false);
  const [showPayPopUp, setShowPayPopUp] = useState(false);
  const [mode, setMode] = useState();

  React.useEffect(() => {
    setMode(props.status);
  }, [props.status]);

  React.useEffect(() => {
    if (isWorking) return;

    if (state.quizzes !== undefined) {
      setQuizzes(state.quizzes);
      return;
    }

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchMyQuizzes(props.token, props.advisor)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      dispatch({quizzes: res[0]});
      setQuizzes(res[0]);
      setIsWorking(false);
    });
  }, [props, dispatch, state.quizzes, isWorking]);

  const openOpBox = quiz => {
    dispatch({selectedQuiz: quiz});
    setShowOpPane(true);
  };

  const [selectedQuizForPay, setSelectedQuizForPay] = useState();
  const [refId, setRefId] = useState();
  const ref = useRef();
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [transactionId, setTransactionId] = useState();

  React.useEffect(() => {
    if (refId === undefined) return;

    setTimeout(() => {
      ref.current.submit();
    }, 1000);
  }, [refId]);

  return (
    <MyView>
      {showOpPane && (
        <Ops
          setLoading={props.setLoading}
          token={props.token}
          setMode={props.setMode}
          navigate={props.navigate}
          user={props.user}
          toggleShowPopUp={() => setShowOpPane(false)}
        />
      )}
      {showSuccessTransaction && (
        <SuccessTransaction
          navigate={props.navigate}
          transactionId={transactionId}
        />
      )}
      {showPayPopUp && (
        <LargePopUp
          btns={
            <CommonButton
              theme={'dark'}
              title={
                Math.max(0, selectedQuizForPay.price - props.money) > 0
                  ? 'اتصال به درگاه پرداخت'
                  : 'نهایی سازی خرید'
              }
              onPress={async () => {
                props.setLoading(true);
                Promise.all([
                  generalRequest(
                    routes.buyAdvisorQuiz + selectedQuizForPay.id,
                    'post',
                    undefined,
                    ['action', 'refId', 'transactionId'],
                    props.token,
                  ),
                ]).then(async res => {
                  props.setLoading(false);
                  res = res[0];

                  if (res.action === 'success') {
                    let user = props.user;
                    user.user.money = res.refId;
                    await setCacheItem('user', JSON.stringify(user));
                    setTransactionId(res.transactionId);
                    setShowPayPopUp(false);
                    setShowSuccessTransaction(true);
                  } else if (res.action === 'pay') {
                    setRefId(res.refId);
                  }
                });
              }}
            />
          }
          title={'نهایی سازی خرید آزمون ' + selectedQuizForPay.title}
          toggleShowPopUp={() => setShowPayPopUp(false)}>
          <MyView>
            <SimpleText
              text={'مبلغ آزمون: ' + formatPrice(selectedQuizForPay.price)}
            />
            <SimpleText
              text={
                'مبلغ استفاده شده از کیف پول: ' +
                formatPrice(Math.min(props.money, selectedQuizForPay.price))
              }
            />
            <SimpleText
              text={
                'مبلغ قابل پرداخت: ' +
                formatPrice(Math.max(0, selectedQuizForPay.price - props.money))
              }
            />
          </MyView>
        </LargePopUp>
      )}
      {!showSuccessTransaction && (
        <MyView>
          <PhoneView style={{...styles.alignSelfCenter, ...styles.marginTop20}}>
            <ProgressCard
              header={'آزمونهای گذشته'}
              theme={vars.ORANGE}
              color={mode === 'generalRanking' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'passed' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'passed') return;
                setMode('passed');
              }}
              style={{...styles.cursor_pointer}}
            />
            <ProgressCard
              header={'آزمونهای پیش رو'}
              theme={vars.ORANGE_RED}
              color={mode === 'quizRanking' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'future' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'future') return;
                setMode('future');
              }}
              style={{...styles.cursor_pointer}}
            />
            <ProgressCard
              header={'همه آزمونها'}
              theme={vars.DARK_BLUE}
              color={mode === 'all' ? vars.WHITE : vars.DARK_BLUE}
              width={250}
              percent={mode === 'all' ? '90%' : '10%'}
              onPress={() => {
                if (mode === 'all') return;
                setMode('all');
              }}
              style={{...styles.cursor_pointer}}
            />
          </PhoneView>

          {quizzes !== undefined && quizzes.length === 0 && (
            <SimpleText
              style={{
                ...styles.textCenter,
                ...styles.margin30,
                ...styles.BlueBold,
              }}
              text="آزمونی موجود نیست"
            />
          )}

          {quizzes !== undefined && quizzes.length > 0 && (
            <PhoneView style={{gap: 15, padding: 15}}>
              {quizzes !== undefined &&
                mode !== undefined &&
                quizzes.map((quiz, index) => {
                  if (
                    mode === 'all' ||
                    (mode === 'passed' && quiz.status === 'finished') ||
                    (mode === 'future' && quiz.status !== 'finished')
                  ) {
                    if (
                      quiz.status === 'finished' ||
                      quiz.status === 'inProgress'
                    ) {
                      return (
                        <Card
                          quizOp={() =>
                            quiz.status === 'finished'
                              ? openOpBox(quiz)
                              : props.navigate(
                                  '/startQuiz/' +
                                    quiz.generalMode +
                                    '/' +
                                    quiz.id,
                                )
                          }
                          isStudent={true}
                          onClick={() => {}}
                          quiz={quiz}
                          afterQuiz={quiz.paid}
                          key={index}
                        />
                      );
                    }

                    return (
                      <Card
                        quizOp={undefined}
                        isStudent={true}
                        onClick={() => {
                          setSelectedQuizForPay(quiz);
                          setShowPayPopUp(true);
                        }}
                        selectText={'پرداخت و ثبت نام در آزمون'}
                        quiz={quiz}
                        afterQuiz={quiz.paid}
                        key={index}
                      />
                    );
                  }
                })}
            </PhoneView>
          )}
        </MyView>
      )}
    </MyView>
  );
}

export default List;
