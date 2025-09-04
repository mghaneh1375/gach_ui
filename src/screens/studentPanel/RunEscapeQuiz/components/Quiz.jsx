import React from 'react';
import {CommonButton, MyView, SimpleText} from '@/styles';
import Question from './Question.jsx';
import {dispatchDoQuizContext, doQuizContext} from './Context.jsx';
import {LargePopUp} from '../../../../styles/common/PopUp.jsx';
import {getDevice} from '../../../../services/utility';
function Quiz(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;
  const [state, dispatch] = useGlobalState();
  return (
    <>
      {state.showExitConfirmation && (
        <LargePopUp
          toggleShowPopUp={() =>
            dispatch({
              showExitConfirmation: false,
              exit: false,
            })
          }
          btns={
            <CommonButton
              title={'بله'}
              theme={'dark'}
              onPress={() =>
                dispatch({
                  imSureExit: true,
                })
              }
            />
          }>
          <SimpleText
            text={
              'می‌خوای آزمون رو تموم کنی؟ (با خروج از آزمون پاسخ‌های شما ذخیره می‌شه ولی اگر هنوز زمان تموم نشده باشه، باز می‌تونی برگردی و جواب‌ها رو ویرایش کنی.) کارنامه و پاسخ تشریحی بعد از پایان زمان آزمون برای تمام شرکت‌کننده‌ها منتشر می‌شه.'
            }
          />
        </LargePopUp>
      )}
      {!state.showExitConfirmation && (
        <MyView
          style={
            isInPhone
              ? {
                  marginBottom: 100,
                }
              : {}
          }>
          <Question
            onBack={props.onBack}
            isInReviewMode={props.isInReviewMode}
          />
        </MyView>
      )}
    </>
  );
}
export default Quiz;
