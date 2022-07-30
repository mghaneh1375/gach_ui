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

      return true;
    });

    dispatch({questionsAfterFilter: tmp, currPage: 1});
    setIsWorking(false);
  }, [
    props.subject.questions,
    state.showEasy,
    state.showHard,
    state.showMid,
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
    props.subject.questions.forEach(element => {
      let a = allAuthors.find(elem => elem.author === element.author);
      if (a === undefined)
        allAuthors.push({author: element.author, qNo: 1, selected: true});
      else a.qNo = a.qNo + 1;
    });

    dispatch({allowShow: true, authors: allAuthors});
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
          <CommonWebBox>
            <Level localFilter={localFilter} />
            <Author localFilter={localFilter} />
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
