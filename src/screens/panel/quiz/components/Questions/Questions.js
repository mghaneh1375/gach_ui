import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../../API/APIRoutes';
import {CommonButton, CommonWebBox} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import ExcelComma from '../../../../../components/web/ExcelCommaInput';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {getQuestions} from '../Utility';
import Edit from './Edit';
import {dispatchQuizContext, quizContext} from '../Context';
import Card from './Card';

const Questions = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [showEditPane, setShowEditPane] = useState(false);
  const [showRemovePane, setShowRemovePane] = useState(false);

  const toggleShowRemovePopUp = () => {
    setShowRemovePane(!showRemovePane);
  };

  const callRemoveAll = () => {
    setShowRemovePane(true);
  };

  const afterRemove = res => {
    toggleShowRemovePopUp();

    state.selectedQuiz.questions = state.selectedQuiz.questions.filter(
      element => {
        return res.doneIds.indexOf(element.id) === -1;
      },
    );

    dispatch({
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
      selectedIds: [],
    });
  };

  const refresh = result => {
    if (result.length > 0) {
      result.forEach(elem => {
        state.selectedQuiz.questions.push(elem);
      });
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
    }
  };

  React.useEffect(() => {
    if (isWorking) return;
    if (state.selectedQuiz.questions !== undefined) {
      dispatch({selectedIds: []});
      return;
    }
    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      getQuestions(
        props.token,
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] !== null) {
        state.selectedQuiz.questions = res[0];
        dispatch({
          selectedQuiz: state.selectedQuiz,
          needUpdate: true,
          selectedIds: [],
        });
      } else props.setMode('list');

      setIsWorking(false);
    });
  }, [props, isWorking, state.selectedQuiz, dispatch]);

  React.useEffect(() => {
    if (selectedQuestion !== undefined) setShowEditPane(true);
  }, [selectedQuestion]);

  return (
    <View style={{zIndex: 5}}>
      {showRemovePane && state.selectedIds !== undefined && (
        <ConfirmationBatchOpPane
          url={
            routes.removeQuestionFromQuiz +
            state.selectedQuiz.generalMode +
            '/' +
            state.selectedQuiz.id
          }
          afterFunc={afterRemove}
          setLoading={props.setLoading}
          token={props.token}
          data={{
            items: state.selectedIds.map(idx => {
              return state.selectedQuiz.questions[idx].id;
            }),
          }}
          toggleShowPopUp={toggleShowRemovePopUp}
        />
      )}
      {showEditPane && (
        <Edit
          setLoading={props.setLoading}
          token={props.token}
          setShowEditPane={setShowEditPane}
          quizId={state.selectedQuiz.id}
          quizGeneralMode={state.selectedQuiz.generalMode}
          question={selectedQuestion}
          afterFunc={mark => {
            state.selectedQuiz.questions = state.selectedQuiz.questions.map(
              element => {
                if (element.id === selectedQuestion.id) {
                  let tmp = selectedQuestion;
                  tmp.mark = mark;
                  return tmp;
                }
                return element;
              },
            );

            props.updateQuiz(state.selectedQuiz);
            setSelectedQuestion(undefined);
            setShowEditPane(false);
          }}
        />
      )}

      {!showRemovePane && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => props.setMode('list')}
          header={translator.questions}>
          <View>
            <ExcelComma
              header={translator.questions}
              placeholder={translator.organizationId}
              help={translator.organizationIdHelp}
              setLoading={props.setLoading}
              token={props.token}
              url={
                routes.addBatchQuestionsToQuiz +
                state.selectedQuiz.generalMode +
                '/' +
                state.selectedQuiz.id
              }
              uploadUrl={
                routes.addBatchQuestionsToQuiz +
                state.selectedQuiz.generalMode +
                '/' +
                state.selectedQuiz.id
              }
              afterAddingCallBack={refresh}
            />
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
                    setSelectedQuestion={setSelectedQuestion}
                  />
                );
              })}
          </View>
        </CommonWebBox>
      )}
    </View>
  );
};

export default Questions;
