import React from 'react';
import {getDevice} from '../../../../services/Utility';
import {CommonButton, MyView, SimpleText} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {dispatchDoQuizContext, doQuizContext} from './Context';

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
              'می‌خوای آزمون رو تموم کنی؟ (با خروج از آزمون پاسخ‌های شما ذخیره می‌شه ولی اگر هنوز زمان تموم نشده باشه، باز می‌تونی برگردی و جواب‌ها رو ویرایش کنی.) کارنامه و پاسخ تشریحی بعد از پایان زمان آزمون برای تمام شرکت‌کننده‌ها منتشر می‌شه.'
            }
          />
        </LargePopUp>
      )}
      {!state.showExitConfirmation && state.file && (
        <MyView>
          <object
            data={state.file}
            type="application/pdf"
            width="100%"
            height="100%">
            <p>
              Alternative text - include a link{' '}
              <a href={state.file}>to the PDF!</a>
            </p>
          </object>
        </MyView>
      )}
    </>
  );
}

export default Quiz;
