import React, {useState} from 'react';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {dispatchMyQuizzesContext, myQuizzesContext} from '../Context';
import Card from './Card';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';
import translator from '../../../../panel/quiz/Translator';
import QuestionsModule from '../../../../panel/question/Question';
import {
  changeQuestionsArrangeInQuiz,
  getQuestions,
} from '../../../../panel/quiz/components/Utility';

const Questions = props => {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [showRemovePane, setShowRemovePane] = useState(false);
  const [selectingMode, setSelectingMode] = useState(false);

  const toggleShowRemovePopUp = () => {
    setShowRemovePane(!showRemovePane);
  };

  const callRemoveAll = () => {
    setShowRemovePane(true);
  };

  const afterRemove = res => {
    toggleShowRemovePopUp();
    showSuccess(res.excepts);

    state.selectedQuiz.questions = state.selectedQuiz.questions.filter(
      element => {
        return res.doneIds.indexOf(element.id) === -1;
      },
    );

    state.selectedQuiz.recp = undefined;

    dispatch({
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
      selectedIds: [],
    });
  };

  const fetchQuestions = React.useCallback(() => {
    if (isWorking) return;
    if (state.selectedQuiz.questions !== undefined) {
      dispatch({selectedIds: []});
      return;
    }

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      getQuestions(props.token, state.selectedQuiz.id, 'school'),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        props.setMode('list');
        return;
      }

      state.selectedQuiz.questions = res[0];

      dispatch({
        selectedQuiz: state.selectedQuiz,
        needUpdate: true,
        selectedIds: [],
      });
      setIsWorking(false);
    });
  }, [props, isWorking, state.selectedQuiz, dispatch]);

  React.useEffect(() => {
    if (state.selectedQuiz !== undefined) fetchQuestions();
  }, [state.selectedQuiz, fetchQuestions]);

  const changeSort = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      changeQuestionsArrangeInQuiz(
        state.selectedQuiz.id,
        'school',
        {
          questionIds: state.selectedQuiz.questions.map(elem => {
            return elem.id;
          }),
        },
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res !== null) {
        if (state.selectedQuiz.answer_sheet !== undefined) {
          state.selectedQuiz.answer_sheet = undefined;
          dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
        }
      }
    });
  }, [props, state.selectedQuiz, dispatch]);

  return (
    <MyView>
      {showRemovePane && state.selectedIds !== undefined && (
        <ConfirmationBatchOpPane
          url={
            routes.removeQuestionFromQuiz + 'school/' + state.selectedQuiz.id
          }
          afterFunc={afterRemove}
          setLoading={props.setLoading}
          token={props.token}
          expected={['doneIds', 'excepts']}
          data={{
            items: state.selectedIds.map(idx => {
              return state.selectedQuiz.questions[idx].id;
            }),
          }}
          toggleShowPopUp={toggleShowRemovePopUp}
        />
      )}

      {!showRemovePane && !selectingMode && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => props.setMode('list')}
          header={translator.questions}>
          <MyView>
            <PhoneView>
              <CommonButton
                style={{alignSelf: 'center'}}
                onPress={() => changeSort()}
                title={translator.changeSort}
              />
              <CommonButton
                style={{alignSelf: 'center'}}
                onPress={() => setSelectingMode(true)}
                title={'انتخاب سوال'}
                theme={'dark'}
              />
            </PhoneView>
            {state.selectedIds !== undefined &&
              state.selectedIds.length > 0 && (
                <CommonButton
                  onPress={() => callRemoveAll()}
                  title={
                    commonTranslator.deleteAll +
                    '(' +
                    state.selectedIds.length +
                    ')'
                  }
                />
              )}
            {state.selectedQuiz.questions !== undefined &&
              state.selectedQuiz.questions.map((element, index) => {
                return (
                  <Card
                    key={index}
                    idx={index}
                    setLoading={props.setLoading}
                    token={props.token}
                    question={element}
                    totalQuestions={state.selectedQuiz.questions.length}
                    setSelectedQuestion={setSelectedQuestion}
                  />
                );
              })}
          </MyView>
        </CommonWebBox>
      )}
      {selectingMode && (
        <QuestionsModule
          dispatch={dispatch}
          token={props.token}
          user={props.user}
          navigate={props.navigate}
          quizId={state.selectedQuiz.id}
          toggleShow={() => setSelectingMode(false)}
        />
      )}
    </MyView>
  );
};

export default Questions;
