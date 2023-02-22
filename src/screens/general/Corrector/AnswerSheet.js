import {faClose} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {useParams} from 'react-router';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {getDevice, getWidthHeight} from '../../../services/Utility';
import {CommonWebBox, MyView, PhoneView} from '../../../styles/Common';
import {FontIcon} from '../../../styles/Common/FontIcon';
import vars from '../../../styles/root';
import {DoCorrectProvider} from './components/Context';
import Correct from './components/Correct';
import Filter from './components/Filter';
import Splash from './components/Splash';

function AnswerSheet(props) {
  const params = useParams();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [mode, setMode] = useState('splash');
  const [state, dispatch] = useGlobalState();
  const [isCorrector, setIsCorrector] = useState();

  React.useEffect(() => {
    if (state.user === undefined) return;
    let accesses = state.user.accesses;

    setIsCorrector(
      accesses.indexOf('teacher') !== -1 || accesses.indexOf('admin') !== -1,
    );
  }, [state.user]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [oldMode, setOldMode] = useState();
  const [selectedAttach, setSelectedAttach] = useState();

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  return (
    <MyView style={isInPhone ? {marginBottom: 20} : {}}>
      <DoCorrectProvider>
        <PhoneView>
          {mode !== undefined && mode === 'attach' && (
            <MyView
              style={{
                width: '100%',
                height: '100%',
                position: 'fixed',
                left: 0,
                top: 0,
                zIndex: 20,
                backgroundColor: vars.darkTransparent,
              }}>
              <CommonWebBox
                header={''}
                btn={
                  <FontIcon icon={faClose} onPress={() => setMode(oldMode)} />
                }
                style={{margin: 20, padding: 5}}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: getWidthHeight()[0] - 40,
                    height: getWidthHeight()[1] - 100,
                    borderRadius: 5,
                  }}
                  source={selectedAttach}
                />
              </CommonWebBox>
            </MyView>
          )}
          {mode !== undefined && (!isInPhone || mode === 'doQuiz') && (
            <Filter
              isCorrector={isCorrector}
              isInReviewMode={props.isInReviewMode}
              mode={mode}
              setMode={m => {
                setOldMode(mode);
                setMode(m);
              }}
              setSelectedAttach={setSelectedAttach}
              token={state.token}
            />
          )}
          <MyView
            style={
              isInPhone ? {width: '100%'} : {width: vars.LEFT_SECTION_WIDTH}
            }>
            {isCorrector !== undefined &&
              mode !== undefined &&
              mode === 'splash' && (
                <Splash
                  token={state.token}
                  navigate={props.navigate}
                  isCorrector={isCorrector}
                  setLoading={setLoading}
                  setMode={m => {
                    setOldMode(mode);
                    setMode(m);
                  }}
                  start={() => {
                    setMode('doCorrect');
                  }}
                  setSelectedAttach={setSelectedAttach}
                  onBack={() =>
                    state.user.accesses.indexOf('student') !== -1
                      ? params.quizMode === 'custom'
                        ? (window.location.href = '/myCustomQuizzes')
                        : params.quizMode === 'content'
                        ? (window.location.href = '/myPackages')
                        : (window.location.href = '/myIRYSCQuizzes')
                      : state.user.accesses.indexOf('teacher') !== -1
                      ? (window.location.href = '/myTasks')
                      : (window.location.href = '/quiz/list')
                  }
                />
              )}
            {mode !== undefined && mode === 'doCorrect' && (
              <Correct
                isCorrector={isCorrector}
                onBack={() =>
                  state.user.accesses.indexOf('student') !== -1
                    ? params.quizMode === 'custom'
                      ? (window.location.href = '/myCustomQuizzes')
                      : params.quizMode === 'content'
                      ? (window.location.href = '/myPackages')
                      : (window.location.href = '/myIRYSCQuizzes')
                    : state.user.accesses.indexOf('teacher') !== -1
                    ? (window.location.href = '/myTasks')
                    : (window.location.href = '/quiz/list')
                }
              />
            )}
          </MyView>
        </PhoneView>
      </DoCorrectProvider>
    </MyView>
  );
}

export default AnswerSheet;
