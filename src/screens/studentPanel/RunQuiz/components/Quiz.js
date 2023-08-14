import React from 'react';
import {getDevice} from '../../../../services/Utility';
import {CommonButton, MyView, SimpleText} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import Bookmark from './Bookmark';
import {dispatchDoQuizContext, doQuizContext} from './Context';
import Question from './Question';
function Quiz(props) {
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

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
              state.quizInfo?.generalMode === 'irysc' ||
              state.quizInfo?.generalMode === 'open' ||
              state.quizInfo?.generalMode === 'school'
                ? 'می‌خوای آزمون رو تموم کنی؟ (با خروج از آزمون پاسخ‌های شما ذخیره می‌شه ولی اگر هنوز زمان تموم نشده باشه، باز می‌تونی برگردی و جواب‌ها رو ویرایش کنی.) کارنامه و پاسخ تشریحی بعد از پایان زمان آزمون برای تمام شرکت‌کننده‌ها منتشر می‌شه.'
                : 'آیا از اتمام آزمون اطمینان دارید؟ (با خروج از آزمون دیگر امکان ورود مجدد ندارید) '
            }
          />
        </LargePopUp>
      )}
      {!state.showExitConfirmation && (
        <MyView>
          {!isInPhone && <Bookmark isInReviewMode={props.isInReviewMode} />}
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
