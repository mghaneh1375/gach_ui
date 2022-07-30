import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import {addQuestionToQuizzes, filter, removeQuestion} from '../Utility';
import Question from './Question';
import Quizzes from './../../../../../components/web/Quizzes';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import Author from './Filter/Author';
import {questionContext, dispatchQuestionContext} from './Context';
import Level from './Filter/Level';
import Report from './Report';
import Type from './Filter/Type';

function Detail(props) {
  const [selectingQuiz, setSelectingQuiz] = useState(false);
  const [questionOrganizationId, setQuestionOrganizationId] = useState();
  const [selectedQuizzes, setSelectedQuizzes] = useState();
  const [quizzes, setQuizzes] = useState();
  const [isWorking, setIsWorking] = useState(false);

  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  const localFilter = useCallback(() => {
    if (isWorking || props.subject.questions === undefined) return;
    setIsWorking(true);

    let tmp = props.subject.questions.filter(elem => {
      if (
        (state.showEasy && elem.level === 'easy') ||
        (state.showMid && elem.level === 'mid') ||
        (state.showHard && elem.level === 'hard')
      ) {
        if (!state.authors.find(itr => itr.author === elem.author).selected)
          return false;
      } else return false;

      if (
        (state.showTest && elem.kindQuestion === 'test') ||
        (state.showShortAnswer && elem.kindQuestion === 'short_answer') ||
        (state.showMultiSentence && elem.kindQuestion === 'multi_sentence') ||
        (state.showTashrihi && elem.kindQuestion === 'tashrihi')
      )
        return true;

      return false;
    });

    dispatch({questionsAfterFilter: tmp, currPage: 1});
    setIsWorking(false);
  }, [
    props.subject.questions,
    state.showEasy,
    state.showHard,
    state.showMid,
    state.showTest,
    state.showShortAnswer,
    state.showMultiSentence,
    state.showTashrihi,
    state.authors,
    isWorking,
    dispatch,
  ]);

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

      setQuizzes(res[0]);
      setIsWorking(false);
    });
  }, [props, isWorking, quizzes, selectingQuiz]);

  const [firstFilter, setFirstFilter] = useState(false);

  React.useEffect(() => {
    if (state.authors !== undefined && !firstFilter) {
      setFirstFilter(true);
      localFilter();
    }
  }, [localFilter, firstFilter, state.authors]);

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
    <View>
      {!selectingQuiz && state.allowShow && (
        <View>
          <FontIcon
            kind={'normal'}
            theme={'rect'}
            icon={faAngleLeft}
            onPress={() => props.setMode('list')}
            parentStyle={{alignSelf: 'flex-end', margin: 20}}
            back={'yellow'}
          />
          <CommonWebBox style={{gap: 20}}>
            <Level localFilter={localFilter} />
            <Type localFilter={localFilter} />
            <Author localFilter={localFilter} />
          </CommonWebBox>

          <CommonWebBox>
            <Report />
          </CommonWebBox>

          {state.questions !== undefined &&
            state.questions.map((elem, index) => {
              return (
                <Question
                  setSelectingQuiz={setSelectingQuiz}
                  setQuestionOrganizationId={setQuestionOrganizationId}
                  question={elem}
                  key={index}
                  btns={[
                    {
                      title: commonTranslator.delete,
                      onPress: async question => {
                        props.setLoading(true);
                        let res = await removeQuestion(
                          question.id,
                          props.token,
                        );
                        props.setLoading(false);
                        if (res !== null) {
                          showSuccess(res.excepts);
                          props.subject.questions =
                            props.subject.questions.filter(
                              elem => res.doneIds.indexOf(elem.id) === -1,
                            );
                          props.subject.qNo = props.subject.qNo - 1;
                          props.setSubject(props.subject);
                        }
                      },
                    },
                    {theme: 'transparent', title: commonTranslator.edit},
                    {
                      onPress: question => {
                        setQuestionOrganizationId(question.organizationId);
                        setSelectingQuiz(true);
                      },
                      theme: 'dark',
                      title: translator.addQuiz,
                    },
                  ]}
                />
              );
            })}
          <PhoneView style={{flexWrap: 'wrap'}}>{state.totalPage}</PhoneView>
        </View>
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
              }
            }}
          />
        </Quizzes>
      )}
    </View>
  );
}

export default Detail;
