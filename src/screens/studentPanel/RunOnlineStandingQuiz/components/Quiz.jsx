import React from 'react';
import {CommonButton, MyView, SimpleText} from '../../../../styles/Common';
import Question from './Question';
import {dispatchDoQuizContext, doQuizContext} from './Context';
import {LargePopUp} from '../../../../styles/Common/PopUp';

function Quiz(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  return (
    <>
      {state.showExitConfirmation && (
        <LargePopUp
          toggleShowPopUp={() =>
            dispatch({showExitConfirmation: false, exit: false})
          }
          btns={
            <CommonButton
              title={'بله'}
              theme={'dark'}
              onPress={() => dispatch({imSureExit: true})}
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
        <MyView>
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
