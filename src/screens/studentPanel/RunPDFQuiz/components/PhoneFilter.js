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
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import {Pressable} from 'react-native-web';

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
        <PhoneView style={{width: '100%', height: 60}}>
          <Pressable
            onPress={() => dispatch({activeTab: 'questions'})}
            style={{
              alignSelf: 'center',
              flexGrow: 1,
              cursor: 'pointer',
              background:
                state.activeTab === 'questions'
                  ? vars.DARK_BLUE
                  : vars.LIGHT_SILVER,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              borderLeft: '3px solid white',
            }}>
            <SimpleText
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}
              text={'سوالات'}
            />
          </Pressable>
          <Pressable
            onPress={() => dispatch({activeTab: 'answerSheet'})}
            style={{
              alignSelf: 'center',
              flexGrow: 1,
              cursor: 'pointer',
              background:
                state.activeTab === 'answerSheet'
                  ? vars.DARK_BLUE
                  : vars.LIGHT_SILVER,
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <SimpleText
              style={{
                color: 'white',
                fontSize: 20,
                fontWeight: 'bold',
              }}
              text={'پاسخ برگ'}
            />
          </Pressable>
          {state.quizInfo !== undefined &&
            state.quizInfo.attaches !== undefined &&
            state.quizInfo.attaches.length > 0 && (
              <SimpleText
                style={{alignSelf: 'center', cursor: 'pointer'}}
                text={'فایل\u200cها'}
                onPress={() => setMode('attaches')}
              />
            )}
        </PhoneView>
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
            <SimpleText style={{...styles.BlueBold}} text={'فایل\u200cها'} />
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
