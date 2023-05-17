import React, {useState, useRef} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {formatPrice} from '../../../../services/Utility';
import {
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import translator from '../../../panel/quiz/Translator';
import {
  dispatchMyQuizzesContext,
  myQuizzesContext,
} from './../../MyQuizzes/components/Context';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {setCacheItem} from '../../../../API/User';
import SuccessTransaction from '../../../../components/web/SuccessTransaction/SuccessTransaction';
import hwTranslator from './Translator';

const Ops = props => {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];

  const [state, dispatch] = useGlobalState();

  const changeMode = newMode => {
    if (
      newMode === 'update' &&
      state.selectedQuiz.showResultsAfterCorrection === undefined
    ) {
      props.setLoading(true);
      Promise.all([
        generalRequest(
          routes.fetchQuiz + 'hw/' + state.selectedQuiz.id,
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
        routes.toggleVisibilityQuiz + 'hw/' + state.selectedQuiz.id,
        'post',
        undefined,
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

  return (
    <>
      {showFinalizeMsg && (
        <LargePopUp
          title={hwTranslator.finalize}
          btns={
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                let res = await generalRequest(
                  routes.finalizeHW + state.selectedQuiz.id,
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
              title={hwTranslator.finalize}
            />
          }
          toggleShowPopUp={() => setShowFinalizeMsg(false)}>
          <SimpleText text={hwTranslator.finalizeMsg} />
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
      {!showFinalizeMsg && (
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
                        routes.getHWTotalPrice + state.selectedQuiz.id,
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
                    title={hwTranslator.finalize}
                  />
                </>
              )}

              {state.selectedQuiz.status !== 'init' && (
                <>
                  <CommonButton
                    onPress={() => props.setMode('copy')}
                    dir={'rtl'}
                    theme={'transparent'}
                    title={translator.copy}
                  />
                </>
              )}
            </PhoneView>
          )}
        </LargePopUp>
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
