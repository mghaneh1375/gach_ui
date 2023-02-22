import React, {useState} from 'react';

import {
  faArrowLeft,
  faListNumeric,
  faMagnifyingGlass,
  faMessage,
  faTasks,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

import RenderHTML from 'react-native-render-html';
import {dispatchDoCorrectContext, doCorrectContext} from './Context';
import {getDevice, systemFonts, tagsStyles} from '../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {
  basketBox,
  basketBoxInPhone,
  styleTitle,
  styleYellowBox,
} from '../../../panel/package/card/Style';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import vars from '../../../../styles/root';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';
import commonTranslator from '../../../../translator/Common';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';

function Splash(props) {
  const useGlobalState = () => [
    React.useContext(doCorrectContext),
    React.useContext(dispatchDoCorrectContext),
  ];

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);

  const params = useParams();

  const redirect = React.useCallback(() => {
    props.navigate('/');
  }, [props]);

  React.useEffect(() => {
    if (
      params.generalQuizMode === undefined ||
      params.quizId === undefined ||
      params.mode === undefined ||
      params.id === undefined
    ) {
      redirect();
    }
  }, [params, redirect]);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.questions !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        props.isCorrector
          ? params.mode === 'student'
            ? routes.getMyMarkListForSpecificStudent +
              params.generalQuizMode +
              '/' +
              params.quizId +
              '/' +
              params.id
            : routes.getMyMarkListForSpecificQuestion +
              params.generalQuizMode +
              '/' +
              params.quizId +
              '/' +
              params.id
          : routes.getMyMarks + params.generalQuizMode + '/' + params.quizId,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      if (params.mode === 'student') {
        if (props.isCorrector)
          dispatch({
            student: res[0].student,
            answers: res[0].answers,
            quizInfo: res[0].quizInfo,
            allMarked: res[0].allMarked,
          });
        else
          dispatch({
            answers: res[0].answers,
            quizInfo: res[0].quizInfo,
            allMarked: res[0].allMarked,
          });
      } else {
        dispatch({
          qIdx: res[0].qIdx,
          answers: res[0].answers,
          quizInfo: res[0].quizInfo,
          allMarked: res[0].allMarked,
        });
      }
      setIsWorking(false);
    });
  }, [params, props, dispatch, isWorking, state.questions]);

  useEffectOnce(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MyView>
      {state.quizInfo !== undefined && (
        <MyView>
          <CommonWebBox>
            <EqualTwoTextInputs>
              <PhoneView style={isInPhone ? {width: '90%'} : {}}>
                <MyView
                  style={{
                    ...styleYellowBox,
                    width: '100%',
                    marginTop: 0,
                  }}>
                  <SimpleText
                    style={{
                      ...styleTitle,
                      ...styles.BlueBold,
                    }}
                    text={state.quizInfo.title}
                  />
                </MyView>
              </PhoneView>
              {!isInPhone && (
                <PhoneView style={{marginTop: -10}}>
                  <FontIcon
                    kind={'normal'}
                    theme={'rect'}
                    back={'orange'}
                    parentStyle={{
                      marginTop: 8,
                      marginLeft: 0,
                      marginRight: 0,
                    }}
                    onPress={() => props.onBack(0)}
                    icon={faArrowLeft}
                  />
                </PhoneView>
              )}
            </EqualTwoTextInputs>
            <PhoneView
              style={isInPhone ? {...styles.gap15} : {...styles.gap100}}>
              {params.mode === 'student' && (
                <QuizItemCard
                  icon={faMessage}
                  iconFontSize={'large'}
                  background={false}
                  color={vars.ORANGE}
                  textFontSize={10}
                  valFontSize={16}
                  text={'تعداد سوال'}
                  val={state.quizInfo.questionsNo}
                />
              )}
              {!props.isCorrector && state.quizInfo !== undefined && (
                <QuizItemCard
                  icon={faTasks}
                  iconFontSize={'large'}
                  background={false}
                  color={vars.ORANGE}
                  textFontSize={10}
                  valFontSize={16}
                  text={'نمره کل'}
                  val={state.quizInfo.totalMark}
                />
              )}
              {props.isCorrector && state.student !== undefined && (
                <QuizItemCard
                  icon={faUser}
                  iconFontSize={'large'}
                  background={false}
                  color={vars.ORANGE}
                  textFontSize={10}
                  valFontSize={16}
                  text={'نام دانش آموز'}
                  val={state.student.name}
                />
              )}
              {props.isCorrector && state.qIdx !== undefined && (
                <QuizItemCard
                  icon={faListNumeric}
                  iconFontSize={'large'}
                  background={false}
                  color={vars.ORANGE}
                  textFontSize={10}
                  valFontSize={16}
                  text={'شماره سوال'}
                  val={state.qIdx}
                />
              )}
              {props.isCorrector && (
                <QuizItemCard
                  icon={faTasks}
                  iconFontSize={'large'}
                  background={false}
                  color={vars.ORANGE}
                  textFontSize={10}
                  valFontSize={16}
                  text={'وضعیت تصحیح تمامی سوالات'}
                  val={state.allMarked ? 'انجام شده' : 'انجام نشده'}
                />
              )}
            </PhoneView>
          </CommonWebBox>

          {state.quizInfo.description !== undefined &&
            state.quizInfo.description !== '' && (
              <CommonWebBox header={'توضیحات آزمون'}>
                <RenderHTML
                  contentWidth={'100%'}
                  source={{
                    html: state.quizInfo.description,
                  }}
                  tagsStyles={tagsStyles}
                  systemFonts={systemFonts}
                />
              </CommonWebBox>
            )}

          {state.quizInfo.descriptionAfter !== undefined &&
            state.quizInfo.descriptionAfter !== '' && (
              <CommonWebBox header={'توضیحات بعد آزمون'}>
                <RenderHTML
                  contentWidth={'100%'}
                  source={{
                    html: state.quizInfo.descriptionAfter,
                  }}
                  tagsStyles={tagsStyles}
                  systemFonts={systemFonts}
                />
              </CommonWebBox>
            )}

          {state.quizInfo.attaches !== undefined &&
            state.quizInfo.attaches.length > 0 && (
              <CommonWebBox header={'فایل توضیحات'}>
                <SimpleText
                  text={'مشاهده این فایل ها برای این آزمون ضروری است.'}
                />
                <PhoneView>
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
              </CommonWebBox>
            )}
          <CommonWebBox
            style={
              isInPhone
                ? {
                    ...basketBoxInPhone,
                    ...{
                      width: 'calc(100% - 20px)',
                      padding: 0,
                      height: 'unset',
                    },
                  }
                : {
                    ...basketBox,
                    ...{
                      width: vars.BASKET_WIDTH_WITH_OPEN_MENU,
                      padding: 0,
                      height: 'unset',
                    },
                  }
            }>
            <EqualTwoTextInputs>
              <CommonButton
                padding={isInPhone ? '5px 5px' : undefined}
                textStyle={
                  isInPhone
                    ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                    : {}
                }
                onPress={props.onBack}
                title={commonTranslator.back}
                theme={'orangeRed'}
              />

              <CommonButton
                padding={isInPhone ? '5px 5px' : undefined}
                textStyle={
                  isInPhone
                    ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                    : {}
                }
                title={props.isCorrector ? 'تصحیح آزمون' : 'مشاهده پاسخبرگ'}
                onPress={() => props.start()}
              />
            </EqualTwoTextInputs>
          </CommonWebBox>
        </MyView>
      )}
    </MyView>
  );
}

export default Splash;
