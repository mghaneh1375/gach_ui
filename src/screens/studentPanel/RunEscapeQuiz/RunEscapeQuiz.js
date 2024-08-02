import React, {useState} from 'react';
import {useParams} from 'react-router';
import {
  CommonButton,
  CommonRadioButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../styles/Common';
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
import {
  getDevice,
  getWidthHeight,
  showError,
  showSuccess,
} from '../../../services/Utility';
import PhoneFilter from './components/PhoneFilter';
import {LargePopUp} from '../../../styles/Common/PopUp';
import commonTranslator from '../../../translator/Common';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {styles} from '../../../styles/Common/Styles';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';

function RunEscapeQuiz(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const params = useParams();
  const [mode, setMode] = useState();

  const getParams = React.useCallback(() => {
    if (
      params.quizId === undefined ||
      state.token === undefined ||
      state.token === null ||
      state.token === ''
    ) {
      props.navigate('/');
      return;
    }
    setMode('splash');
  }, [params, props, state.token]);

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
      loadingText: 'در حال ذخیره کردن پاسخ\u200cها. لطفا شکیبا باشید.',
    });
  };

  const [oldMode, setOldMode] = useState();
  const [selectedAttach, setSelectedAttach] = useState();
  const [showReportPane, setShowReportPane] = useState(false);
  const [questionId, setQuestionId] = useState();
  const [tags, setTags] = useState();

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;
  const [isWorking, setIsWorking] = useState(false);

  const fetchTags = React.useCallback(() => {
    if (tags !== undefined || isWorking) return;

    setIsWorking(true);
    dispatch({loading: true});

    Promise.all([
      generalRequest(
        routes.getVisibleQuestionReportTags,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      if (res[0] == null) {
        setTags(null);
        showError('خطایی در انجام عملیات موردنظر رخ داده است');
        return;
      }
      setTags(res[0]);
      setIsWorking(false);
      dispatch({loading: false});
    });
  }, [dispatch, isWorking, tags, state.token]);

  React.useEffect(() => {
    if (showReportPane) {
      fetchTags();
    } else {
      setSelectedQuestionReportTag(undefined);
      setQuestionReportDesc('');
      setQuestionId(undefined);
    }
  }, [showReportPane, fetchTags]);

  const [selectedQuestionReportTag, setSelectedQuestionReportTag] = useState();
  const [questionReportDesc, setQuestionReportDesc] = useState();

  return (
    <MyView style={isInPhone ? {marginBottom: 20} : {}}>
      <DoQuizProvider>
        {showReportPane && tags !== undefined && (
          <LargePopUp
            title={commonTranslator.questionReport}
            btns={
              <CommonButton
                theme={'dark'}
                title={commonTranslator.confirm}
                onPress={async () => {
                  if (
                    selectedQuestionReportTag === undefined ||
                    (selectedQuestionReportTag.canHasDesc &&
                      (questionReportDesc === undefined ||
                        questionReportDesc.length === 0))
                  ) {
                    showError(commonTranslator.pleaseFillAllFields);
                    return;
                  }

                  setIsWorking(true);
                  let res = await generalRequest(
                    routes.storeQuestionReport +
                      selectedQuestionReportTag.id +
                      '/' +
                      questionId,
                    'post',
                    selectedQuestionReportTag.canHasDesc &&
                      questionReportDesc !== undefined
                      ? {desc: questionReportDesc}
                      : undefined,
                    undefined,
                    state.token,
                  );

                  setIsWorking(false);

                  if (res !== null) {
                    showSuccess();
                    setShowReportPane(false);
                  }
                }}
              />
            }
            toggleShowPopUp={() => setShowReportPane(false)}>
            <PhoneView style={{...styles.gap10}}>
              {tags.map((elem, index) => {
                return (
                  <CommonRadioButton
                    status={
                      selectedQuestionReportTag !== undefined &&
                      selectedQuestionReportTag.id === elem.id
                        ? 'checked'
                        : 'unchecked'
                    }
                    onPress={() => setSelectedQuestionReportTag(elem)}
                    text={elem.label}
                    key={index}
                  />
                );
              })}
            </PhoneView>
            {selectedQuestionReportTag !== undefined &&
              selectedQuestionReportTag.canHasDesc && (
                <JustBottomBorderTextInput
                  placeholder={commonTranslator.desc}
                  subText={commonTranslator.desc}
                  onChangeText={e => setQuestionReportDesc(e)}
                  multiline={true}
                />
              )}
          </LargePopUp>
        )}
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
              setShowReportPane={setShowReportPane}
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
                navigate={props.navigate}
                setLoading={setLoading}
                setMode={m => {
                  setOldMode(mode);
                  setMode(m);
                }}
                setSelectedAttach={setSelectedAttach}
                onBack={() => (window.location.href = '/myIRYSCQuizzes')}
              />
            )}
            {mode !== undefined && mode === 'doQuiz' && (
              <Quiz
                isInReviewMode={props.isInReviewMode}
                onBack={() => (window.location.href = '/myIRYSCQuizzes')}
              />
            )}
          </MyView>
        </PhoneView>
      </DoQuizProvider>
    </MyView>
  );
}

export default RunEscapeQuiz;
