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
              'آیا از اتمام آزمون اطمینان دارید؟ (با خروج از آزمون دیگر امکان ورود مجدد ندارید) '
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
