import React, {useState} from 'react';
import {useParams} from 'react-router';
import {CommonWebBox, MyView, PhoneView} from '../../../styles/Common';
import Splash from './components/Splash';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {DoQuizProvider} from './components/Context';
import Quiz from './components/Quiz';
import Filter from './components/Filter';
import vars from '../../../styles/root';
import {useEffectOnce} from 'usehooks-ts';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {FontIcon} from '../../../styles/Common/FontIcon';
import {Image} from 'react-native';
import {getDevice, getWidthHeight} from '../../../services/Utility';
import PhoneFilter from './components/PhoneFilter';

function RunPDFQuiz(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const params = useParams();
  const [mode, setMode] = useState();

  const getParams = React.useCallback(() => {
    if (params.quizMode === undefined || params.quizId === undefined) {
      props.navigate('/');
      return;
    }
    setMode('splash');
  }, [params, props]);

  React.useEffect(() => {
    dispatch({
      isRightMenuVisible: false,
    });
  }, [dispatch]);

  useEffectOnce(() => {
    getParams();
  });

  const setLoading = status => {
    dispatch({loading: status});
  };

  const setLoadingWithText = status => {
    dispatch({
      loading: status,
      loadingText: 'در حال ذخیره کردن پاسخ ها. لطفا شکیبا باشید.',
    });
  };

  const [oldMode, setOldMode] = useState();
  const [selectedAttach, setSelectedAttach] = useState();
  const [questionId, setQuestionId] = useState();

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  return (
    <MyView style={isInPhone ? {marginBottom: 20} : {}}>
      <DoQuizProvider>
        {isInPhone && mode !== undefined && mode === 'doQuiz' && (
          <PhoneFilter mode={mode} isInReviewMode={props.isInReviewMode} />
        )}
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
              isInReviewMode={props.isInReviewMode}
              mode={mode}
              setMode={m => {
                setOldMode(mode);
                setMode(m);
              }}
              setQuestionId={setQuestionId}
              setSelectedAttach={setSelectedAttach}
              token={state.token}
            />
          )}
          <MyView
            style={
              isInPhone ? {width: '100%'} : {width: vars.LEFT_SECTION_WIDTH}
            }>
            {mode !== undefined && mode === 'splash' && (
              <Splash
                setLoadingWithText={setLoadingWithText}
                isInReviewMode={props.isInReviewMode}
                token={state.token}
                quizId={params.quizId}
                quizGeneralMode={params.quizMode}
                navigate={props.navigate}
                setLoading={setLoading}
                setMode={m => {
                  setOldMode(mode);
                  setMode(m);
                }}
                setSelectedAttach={setSelectedAttach}
                onBack={() =>
                  props.user.accesses.indexOf('school') !== -1
                    ? (window.location.href = '/mySchoolQuizzes')
                    : props.user.accesses.indexOf('student') !== -1
                    ? params.quizMode === 'school'
                      ? (window.location.href = '/dashboard')
                      : (window.location.href = '/myIRYSCQuizzes')
                    : (window.location.href = '/quiz/list')
                }
              />
            )}
            {mode !== undefined && mode === 'doQuiz' && (
              <Quiz
                isInReviewMode={props.isInReviewMode}
                onBack={() =>
                  props.user.accesses.indexOf('school') !== -1
                    ? (window.location.href = '/mySchoolQuizzes')
                    : props.user.accesses.indexOf('student') !== -1
                    ? params.quizMode === 'school'
                      ? (window.location.href = '/dashboard')
                      : (window.location.href = '/myIRYSCQuizzes')
                    : (window.location.href = '/quiz/list')
                }
              />
            )}
          </MyView>
        </PhoneView>
      </DoQuizProvider>
    </MyView>
  );
}

export default RunPDFQuiz;
