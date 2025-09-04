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

  const [hasRightSection, setHasRightSection] = React.useState(true);

  React.useEffect(() => {
    setHasRightSection(
      !(
        state.quizInfo === undefined ||
        (props.isInReviewMode &&
          (state.quizInfo.attaches === undefined ||
            state.quizInfo.attaches.length === 0))
      ),
    );
  }, [state.quizInfo, props.isInReviewMode]);

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
          <MyView
            style={{
              display:
                isInPhone && state.activeTab === 'answerSheet'
                  ? 'none'
                  : 'flex',
              width: isInPhone
                ? state.activeTab === 'questions'
                  ? '100%'
                  : '0'
                : hasRightSection
                ? (w - vars.RIGHT_MENU_WIDTH) / 2 - 20
                : w / 2 - 20,
            }}>
            <div>
              <iframe src={state.file} width="100%" height={h - 20 - 80} />
            </div>
            {/* <object
              data={state.file}
              type="application/pdf"
              width="100%"
              height={h - 20 - 80}>
              <p>
                Alternative text - include a link{' '}
                <a href={state.file}>to the PDF!</a>
              </p>
            </object> */}
          </MyView>
          <MyView
            style={{
              display:
                isInPhone && state.activeTab === 'questions' ? 'none' : 'flex',
              width: isInPhone
                ? state.activeTab === 'answerSheet'
                  ? '100%'
                  : '0'
                : hasRightSection
                ? (w - vars.RIGHT_MENU_WIDTH) / 2 - 20
                : w / 2 - 20,
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
