import React, {useState} from 'react';
import {addQuestionToQuizzes, filter, removeQuestion} from '../Utility';
import Question from './Question';
import Quizzes from '../../../../../components/web/Quizzes';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';
import {
  CommonButton,
  PhoneView,
  MyView,
  CommonWebBox,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';
import {questionContext, dispatchQuestionContext} from './Context';

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

  React.useEffect(() => {
    if (isWorking || !selectingQuiz || quizzes !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.fetchEscapeQuizRegistrableQuizzes,
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
    if (isWorking || state.questions !== undefined) return;
    setIsWorking(true);

    Promise.all([filter(props.token, props.organizationCodeFilter)]).then(
      res => {
        if (res[0] === null) {
          props.setMode('list');
          return;
        }
        dispatch({questions: res[0]});
        setIsWorking(false);
      },
    );
  }, [props, isWorking, dispatch, state.questions]);

  return (
    <CommonWebBox
      header={'سوالات آزمون فرار'}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <MyView>
        {!selectingQuiz && (
          <MyView>
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
                          }
                        },
                      },
                      {
                        theme: 'transparent',
                        title: commonTranslator.edit,
                        onPress: async () => {
                          await dispatch({
                            selectedQuestion: elem,
                          });
                          props.setMode('edit');
                        },
                      },
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
            {/* <PhoneView>{state.totalPage}</PhoneView> */}
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
    </CommonWebBox>
  );
}

export default Detail;
