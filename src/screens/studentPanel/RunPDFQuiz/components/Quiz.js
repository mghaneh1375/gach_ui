import React from 'react';
import {getDevice, getWidthHeight} from '../../../../services/Utility';
import {
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {dispatchDoQuizContext, doQuizContext} from './Context';
import AnswerSheet from './AnswerSheet';
import vars from '../../../../styles/root';

function Quiz(props) {
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [w, h] = getWidthHeight();

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
        <PhoneView style={{margin: 10, gap: 10}}>
          <MyView style={{width: (w - vars.RIGHT_MENU_WIDTH) / 2 - 20}}>
            <object
              data={state.file}
              type="application/pdf"
              width="100%"
              height={h - 20 - 80}>
              <p>
                Alternative text - include a link{' '}
                <a href={state.file}>to the PDF!</a>
              </p>
            </object>
          </MyView>
          <MyView
            style={{
              width: (w - vars.RIGHT_MENU_WIDTH) / 2 - 20,
            }}>
            <AnswerSheet
              answer_sheet={state.answers}
              setLoading={props.setLoading}
              token={props.token}
              state={state}
              dispatch={dispatch}
            />
          </MyView>
        </PhoneView>
      )}
    </>
  );
}

export default Quiz;
