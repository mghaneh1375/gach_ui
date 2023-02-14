import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {getDevice, showError, showSuccess} from '../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import QuestionNumber from '../../../studentPanel/RunQuiz/components/questionComponents/QuestionNumber';
import {dispatchDoCorrectContext, doCorrectContext} from './Context';

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(doCorrectContext),
    React.useContext(dispatchDoCorrectContext),
  ];

  const [state, dispatch] = useGlobalState();

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const [mark, setMark] = useState();
  const [qMark, setQMark] = useState();

  React.useEffect(() => {
    if (mark === undefined || qMark === undefined) return;
    if (mark > qMark) {
      showError('حداکثر نمره می تواند ' + qMark + ' باشد');
      setMark('');
    }
  }, [mark, qMark]);

  React.useEffect(() => {
    if (state.answers === undefined) return;
    setMark(
      state.answers[state.currIdx].stdAns === undefined ||
        state.answers[state.currIdx].stdAns.mark === undefined ||
        state.answers[state.currIdx].stdAns.mark === -1
        ? ''
        : state.answers[state.currIdx].stdAns.mark,
    );
    setQMark(state.answers[state.currIdx].mark);
  }, [state.answers, state.currIdx]);

  const doMark = async () => {
    let res = await generalRequest(
      routes.setMark +
        state.quizInfo.generalMode +
        '/' +
        state.quizInfo.id +
        '/' +
        state.student.id +
        '/' +
        state.answers[state.currIdx].id,
      'put',
      {mark: mark},
      undefined,
      props.token,
    );
    if (res != null) {
      showSuccess();
      dispatch({mark: mark, needUpdateMark: true});
    }
  };

  return (
    <CommonWebBox
      childStyle={{...styles.padding5}}
      style={{...styles.padding0, ...styles.marginTop10}}
      width={isInPhone ? '100%' : vars.RIGHT_MENU_WIDTH}>
      <PhoneView
        style={{
          ...styles.gap7,
          ...styles.margin15,
          ...styles.justifyContentStart,
          ...{
            marginBottom: 0,
            paddingBottom: 50,
            borderBottomWidth: 2,
            borderColor: vars.DARK_BLUE,
          },
        }}>
        {state.answers !== undefined &&
          state.answers.map((elem, index) => {
            return (
              <QuestionNumber
                selected={state.currIdx === index}
                theme={
                  state.answers[index] === undefined ||
                  state.answers[index] === ''
                    ? 'transparent'
                    : 'green'
                }
                key={index}
                number={index + 1}
                jump={() => {
                  if (props.mode === 'splash') return;
                  dispatch({currIdx: index});
                }}
              />
            );
          })}
      </PhoneView>
      {state.answers !== undefined && props.mode !== 'splash' && (
        <MyView style={{padding: 20}}>
          {props.isCorrector && (
            <EqualTwoTextInputs>
              <SimpleText text={'نام دانش آموز: '} />
              <SimpleText text={state.student.name} />
            </EqualTwoTextInputs>
          )}
          <EqualTwoTextInputs>
            <SimpleText text={'مبحث: '} />
            <SimpleText text={state.answers[state.currIdx].subject.name} />
          </EqualTwoTextInputs>
          <EqualTwoTextInputs>
            <SimpleText text={'سطح سختی: '} />
            <SimpleText text={state.answers[state.currIdx].levelFa} />
          </EqualTwoTextInputs>
          <EqualTwoTextInputs>
            <SimpleText text={'طراح سوال: '} />
            <SimpleText text={state.answers[state.currIdx].author} />
          </EqualTwoTextInputs>
          <EqualTwoTextInputs>
            <SimpleText text={'نمره سوال: '} />
            <SimpleText text={state.answers[state.currIdx].mark} />
          </EqualTwoTextInputs>
          {!props.isCorrector && (
            <EqualTwoTextInputs>
              <SimpleText text={'نمره داده شده: '} />
              <SimpleText
                text={
                  state.answers[state.currIdx].stdAns === undefined ||
                  state.answers[state.currIdx].stdAns.mark === undefined ||
                  state.answers[state.currIdx].stdAns.mark === -1
                    ? 'نمره داده نشده'
                    : state.answers[state.currIdx].stdAns.mark
                }
              />
            </EqualTwoTextInputs>
          )}

          {props.isCorrector && (
            <JustBottomBorderTextInput
              placeholder={'نمره داده نشده'}
              subText={'نمره داده شده'}
              justNum={true}
              float={true}
              onChangeText={e => setMark(e)}
              value={mark}
            />
          )}

          {props.isCorrector && (
            <CommonButton
              onPress={() => doMark()}
              theme={'dark'}
              title={'اعمال نمره'}
            />
          )}
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Filter;
