import React, {useState} from 'react';
import {addQuestionToQuizzes, filter, removeQuestion} from '../Utility';
import Question from './Question';
import Quizzes from './../../../../../components/web/Quizzes';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showError, showSuccess} from '../../../../../services/Utility';
import {
  BigBoldBlueText,
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';
import {FontIcon, SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {
  faAngleDoubleDown,
  faAngleDoubleUp,
  faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import Author from './Filter/Author';
import {questionContext, dispatchQuestionContext} from './Context';
import Level from './Filter/Level';
import Report from './Report';
import Type from './Filter/Type';
import {styleYellowMarginTop7} from './style';
import {styles} from '../../../../../styles/Common/Styles';
import {getQuestions} from '../../../quiz/components/Utility';

function Detail(props) {
  const [selectingQuiz, setSelectingQuiz] = useState(false);
  const [questionOrganizationId, setQuestionOrganizationId] = useState();
  const [selectedQuizzes, setSelectedQuizzes] = useState();
  const [quizzes, setQuizzes] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [showReports, setShowReports] = useState(true);

  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  const localFilter = (
    showEasy,
    showMid,
    showHard,
    showTest,
    showShortAnswer,
    showMultiSentence,
    showTashrihi,
    authors,
  ) => {
    if (isWorking || props.subject.questions === undefined) return;
    setIsWorking(true);

    let tmp = props.subject.questions.filter(elem => {
      if (
        (showEasy && elem.level === 'easy') ||
        (showMid && elem.level === 'mid') ||
        (showHard && elem.level === 'hard')
      ) {
        if (!authors.find(itr => itr.author === elem.author).selected)
          return false;
      } else return false;

      if (
        (showTest && elem.kindQuestion === 'test') ||
        (showShortAnswer && elem.kindQuestion === 'short_answer') ||
        (showMultiSentence && elem.kindQuestion === 'multi_sentence') ||
        (showTashrihi && elem.kindQuestion === 'tashrihi')
      )
        return true;

      return false;
    });

    dispatch({questionsAfterFilter: tmp, currPage: 1});
    setIsWorking(false);
  };

  React.useEffect(() => {
    if (isWorking || !selectingQuiz || quizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.fetchIRYSCRegistrableQuizzes,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        setSelectingQuiz(false);
        return;
      }

      setQuizzes(res[0].items);
      setIsWorking(false);
    });
  }, [props, isWorking, quizzes, selectingQuiz]);

  React.useEffect(() => {
    if (props.subject.questions === undefined) return;
    let allAuthors = [];
    let easy = 0,
      mid = 0,
      hard = 0;
    let test = 0,
      short_answer = 0,
      multi_sentence = 0,
      tashrihi = 0;
    props.subject.questions.forEach(element => {
      let a = allAuthors.find(elem => elem.author === element.author);
      if (a === undefined)
        allAuthors.push({author: element.author, qNo: 1, selected: true});
      else a.qNo = a.qNo + 1;
      if (element.level === 'easy') easy++;
      else if (element.level === 'mid') mid++;
      else hard++;

      if (element.kindQuestion === 'test') test++;
      else if (element.kindQuestion === 'short_answer') short_answer++;
      else if (element.kindQuestion === 'multi_sentence') multi_sentence++;
      else tashrihi++;
    });

    dispatch({
      allowShow: true,
      authors: allAuthors,
      total_easy: easy,
      total_mid: mid,
      total_hard: hard,
      total_test: test,
      total_short_answer: short_answer,
      total_multi_sentence: multi_sentence,
      total_tashrihi: tashrihi,
      questionsAfterFilter: props.subject.questions,
    });
  }, [props.subject.questions, dispatch]);

  React.useEffect(() => {
    if (
      state.allowShow === undefined ||
      (state.allowShow && !state.isLoadingOn) ||
      (!state.allowShow && state.isLoadingOn)
    )
      return;
    props.setLoading(!state.allowShow);
    dispatch({isLoadingOn: !state.allowShow});
  }, [state.allowShow, state.isLoadingOn, dispatch, props]);

  React.useEffect(() => {
    if (isWorking || props.subject.questions !== undefined) return;

    dispatch({allowShow: false});
    setIsWorking(true);

    Promise.all([
      filter(
        props.token,
        undefined,
        undefined,
        props.subject.subject.id,
        props.organizationCodeFilter,
        undefined,
        undefined,
        true,
      ),
    ]).then(res => {
      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      props.setSubject(res[0][0]);
      setIsWorking(false);
    });
  }, [props, isWorking, dispatch]);

  return (
    <MyView>
      {!selectingQuiz && state.allowShow && (
        <MyView>
          <PhoneView style={{...styles.alignSelfEnd}}>
            <FontIcon
              kind={'normal'}
              theme={'rect'}
              icon={faAngleLeft}
              onPress={() =>
                props.onBack !== undefined
                  ? props.onBack()
                  : props.setMode('list')
              }
              parentStyle={{alignSelf: 'flex-end', margin: 20}}
              back={'yellow'}
            />
          </PhoneView>
          <CommonWebBox style={{gap: 20}}>
            <EqualTwoTextInputs style={{marginTop: -15}}>
              <BigBoldBlueText text={'فیلتر سوالات'} />
              <SimpleFontIcon
                onPress={() => setShowFilters(!showFilters)}
                parentStyle={{alignSelf: 'flex-end'}}
                style={{...styleYellowMarginTop7}}
                kind={'normal'}
                icon={showFilters ? faAngleDoubleDown : faAngleDoubleUp}
              />
            </EqualTwoTextInputs>
            {showFilters && (
              <MyView>
                <Level localFilter={localFilter} />
                <Type localFilter={localFilter} />
                <Author localFilter={localFilter} />
              </MyView>
            )}
          </CommonWebBox>

          <CommonWebBox>
            <EqualTwoTextInputs style={{marginTop: -15}}>
              <BigBoldBlueText text={'گزارش کلی'} />
              <SimpleFontIcon
                onPress={() => setShowReports(!showReports)}
                parentStyle={{alignSelf: 'flex-end'}}
                style={{...styleYellowMarginTop7}}
                kind={'normal'}
                icon={showReports ? faAngleDoubleDown : faAngleDoubleUp}
              />
            </EqualTwoTextInputs>
            {showReports && <Report />}
          </CommonWebBox>

          {state.questions !== undefined &&
            state.questions.map((elem, index) => {
              let options = [];
              if (props.quizMode === 'irysc') {
                if (props.isEditor) {
                  options.push({
                    title: commonTranslator.delete,
                    onPress: async question => {
                      props.setLoading(true);
                      let res = await removeQuestion(question.id, props.token);
                      props.setLoading(false);
                      if (res !== null) {
                        showSuccess(res.excepts);
                        props.subject.questions = undefined;
                        props.subject.qNo =
                          props.subject.qNo - res.doneIds.length;
                        props.setSubject(props.subject);
                      }
                    },
                  });
                  options.push({
                    theme: 'transparent',
                    title: commonTranslator.edit,
                    onPress: async () => {
                      elem.subject = {
                        id: props.subject.subject.id,
                        name:
                          props.subject.subject.name +
                          ' در ' +
                          props.subject.lesson.name +
                          ' در ' +
                          props.subject.grade.name,
                      };
                      await dispatch({
                        selectedQuestion: elem,
                      });
                      props.setMode('edit');
                    },
                  });
                }
                if (props.isAdmin) {
                  options.push({
                    onPress: question => {
                      setQuestionOrganizationId(question.organizationId);
                      setSelectingQuiz(true);
                    },
                    theme: 'dark',
                    title: translator.addQuiz,
                  });
                }
              } else {
                options = [
                  {
                    onPress: async question => {
                      props.setLoading(true);
                      let res = await generalRequest(
                        routes.addQuestionToQuizzes +
                          'school/' +
                          question.organizationId +
                          '/3',
                        'put',
                        {items: [props.preSelectedQuizId]},
                        ['doneIds', 'excepts'],
                        props.token,
                      );
                      if (
                        res != null &&
                        res.doneIds !== undefined &&
                        res.doneIds.length > 0
                      ) {
                        let res2 = await getQuestions(
                          props.token,
                          props.preSelectedQuizId,
                          'school',
                        );

                        props.setLoading(false);
                        showSuccess();

                        if (res2 != null) {
                          props.dispatch({
                            clearQuestions: true,
                            selectedIds: [],
                            newQuestions: res2,
                          });
                        }
                      } else {
                        props.setLoading(false);
                        showError(
                          'این سوال در آزمون موجود است و یا امکان اضافه شدن آن به آزمون وجود ندارد',
                        );
                      }
                    },
                    theme: 'dark',
                    title: translator.addQuiz,
                  },
                ];
              }
              return (
                <Question
                  setSelectingQuiz={setSelectingQuiz}
                  setQuestionOrganizationId={setQuestionOrganizationId}
                  question={elem}
                  key={index}
                  btns={options}
                />
              );
            })}
          <PhoneView>{state.totalPage}</PhoneView>
        </MyView>
      )}

      {selectingQuiz && quizzes !== undefined && (
        <Quizzes
          onBackClicked={() => setSelectingQuiz(false)}
          setSelectedQuizzes={setSelectedQuizzes}
          quizzes={quizzes}>
          <CommonButton
            style={{alignSelf: 'flex-end'}}
            title={translator.addQuiz}
            theme={'dark'}
            onPress={async () => {
              props.setLoading(true);
              let res = await addQuestionToQuizzes(
                questionOrganizationId,
                props.quizMode,
                selectedQuizzes,
                props.token,
              );
              props.setLoading(false);
              if (res !== null) {
                showSuccess(res.excepts);
                setSelectingQuiz(false);
                setSelectedQuizzes([]);
                setQuizzes(
                  quizzes.map(elem => {
                    elem.isSelected = false;
                    return elem;
                  }),
                );
              }
            }}
          />
        </Quizzes>
      )}
    </MyView>
  );
}

export default Detail;
