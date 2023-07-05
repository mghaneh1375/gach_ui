import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import commonTranslator from '../../../../translator/Common';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';
import QuestionNumber from '../../RunQuiz/components/questionComponents/QuestionNumber';
import Translate from '../Translate';
import {doQuizContext, dispatchDoQuizContext} from './Context';

function PhoneFilter(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [mode, setMode] = useState('menu');

  return (
    <PhoneView
      style={{
        position: 'fixed',
        zIndex: 10,
        top: 0,
        height: 'auto',
        width: '100%',
        boxShadow: 'rgb(0 0 0 / 16%) 0px 3px 16px 4px',
        borderRadius: 10,
        background: mode === 'menu' ? vars.WHITE : 'rgb(112, 112, 112)',
      }}>
      {mode === 'menu' && (
        <EqualTwoTextInputs style={{width: '100%', height: 60, padding: 10}}>
          <SimpleText
            style={{...styles.BlueBold, ...{alignSelf: 'center'}}}
            text={
              commonTranslator.question +
              ' ' +
              Translate.number +
              ' ' +
              (state.currIdx + 1)
            }
          />
          <PhoneView style={styles.gap10}>
            <SimpleText
              style={{alignSelf: 'center', cursor: 'pointer'}}
              onPress={() => setMode('map')}
              text={'سوالات'}
            />
            {state.quizInfo !== undefined &&
              state.quizInfo.attaches !== undefined &&
              state.quizInfo.attaches.length > 0 && (
                <SimpleText
                  style={{alignSelf: 'center', cursor: 'pointer'}}
                  text={'فایل ها'}
                  onPress={() => setMode('attaches')}
                />
              )}
          </PhoneView>
        </EqualTwoTextInputs>
      )}
      {mode === 'map' && (
        <MyView style={{width: '100%', height: '100%', gap: 5}}>
          <EqualTwoTextInputs
            style={{
              boxShadow: 'rgb(0 0 0 / 16%) 0px 3px 16px 4px',
              padding: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              width: '100%',
              height: 50,
              background: 'white',
              alignSelf: 'center',
            }}>
            <SimpleText style={{...styles.BlueBold}} text={'لیست سوالات'} />
            <SimpleText
              style={{...styles.cursor_pointer}}
              onPress={() => setMode('menu')}
              text={'بستن'}
            />
          </EqualTwoTextInputs>

          <MyView
            style={{
              height: 'calc(100vh - 50px)',
              boxShadow: 'rgb(0 0 0 / 16%) 0px 3px 16px 4px',
              padding: 10,
              background: 'white',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              width: '100%',
            }}>
            <PhoneView
              style={{
                gap: 10,
                alignSelf: 'center',
              }}>
              {state.questions !== undefined &&
                state.questions.map((elem, index) => {
                  return (
                    <QuestionNumber
                      selected={
                        props.mode !== 'splash' && state.currIdx === index
                      }
                      theme={
                        state.answers[index] === undefined ||
                        state.answers[index] === '' ||
                        state.answers[index] === 0
                          ? 'transparent'
                          : 'green'
                      }
                      key={index}
                      number={index + 1}
                      bookmark={'hidden'}
                      jump={() => {
                        if (props.mode === 'splash') return;
                        dispatch({currIdx: index});
                        setMode('menu');
                      }}
                    />
                  );
                })}
            </PhoneView>
          </MyView>
        </MyView>
      )}
      {mode === 'attaches' && (
        <MyView style={{width: '100%', height: '100%', gap: 5}}>
          <EqualTwoTextInputs
            style={{
              boxShadow: 'rgb(0 0 0 / 16%) 0px 3px 16px 4px',
              padding: 10,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              width: '100%',
              height: 50,
              background: 'white',
              alignSelf: 'center',
            }}>
            <SimpleText style={{...styles.BlueBold}} text={'فایل ها'} />
            <SimpleText
              style={{...styles.cursor_pointer}}
              onPress={() => setMode('menu')}
              text={'بستن'}
            />
          </EqualTwoTextInputs>

          <MyView
            style={{
              height: 'calc(100vh - 50px)',
              boxShadow: 'rgb(0 0 0 / 16%) 0px 3px 16px 4px',
              padding: 10,
              background: 'white',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              width: '100%',
            }}>
            <PhoneView
              style={{
                gap: 10,
              }}>
              {state.quizInfo.attaches.map((elem, index) => {
                return (
                  <AttachBox
                    icon={faMagnifyingGlass}
                    key={index}
                    filename={elem}
                    onClick={() => {
                      if (
                        elem.toLowerCase().indexOf('.jpg') !== -1 ||
                        elem.toLowerCase().indexOf('.png') !== -1
                      ) {
                        props.setSelectedAttach(elem);
                        props.setMode('attach');
                      } else {
                        window.open(elem);
                      }
                    }}
                  />
                );
              })}
            </PhoneView>
          </MyView>
        </MyView>
      )}
    </PhoneView>
  );
}

export default PhoneFilter;
