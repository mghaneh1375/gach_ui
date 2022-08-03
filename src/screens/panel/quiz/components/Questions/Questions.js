import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../../API/APIRoutes';
import {
  CommonButton,
  CommonRadioButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import ExcelComma from '../../../../../components/web/ExcelCommaInput';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {getQuestions} from '../Utility';
import Question from '../../../question/components/Detail/Question';
import Edit from './Edit';
import {dispatchQuizContext, quizContext} from '../Context';

const Questions = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [isWorking, setIsWorking] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showRemovePane, setShowRemovePane] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [showEditPane, setShowEditPane] = useState(false);

  const toggleShowRemovePopUp = () => {
    setShowRemovePane(!showRemovePane);
  };

  const refresh = result => {
    dispatch({selectedQuiz: undefined, needUpdate: true});
  };

  const toggleSelect = id => {
    let newSelectedIds = selectedIds;

    newSelectedIds.indexOf(id) === -1
      ? newSelectedIds.push(id)
      : newSelectedIds.splice(newSelectedIds.indexOf(id), 1);

    setSelectedIds(newSelectedIds);

    // props.updateQuiz(state.selectedQuiz);
  };

  const callRemoveAll = () => {
    setShowRemovePane(true);
  };

  const afterRemove = res => {
    toggleShowRemovePopUp();

    state.selectedQuiz.questions = state.selectedQuiz.questions.filter(
      (element, index) => {
        return selectedIds.indexOf(index) === -1;
      },
    );

    setSelectedIds([]);
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
  };

  React.useEffect(() => {
    if (!isWorking && state.selectedQuiz.questions === undefined) {
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
          dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
        }
        setIsWorking(false);
      });
    }
  }, [props, isWorking, state.selectedQuiz, dispatch]);

  return (
    <View style={{zIndex: 5}}>
      {showRemovePane && (
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
            items: selectedIds.map(idx => {
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
            {selectedIds.length > 0 && (
              <CommonButton
                onPress={() => callRemoveAll()}
                title={
                  commonTranslator.deleteAll + '(' + selectedIds.length + ')'
                }
              />
            )}
            {state.selectedQuiz.questions !== undefined &&
              state.selectedQuiz.questions.map((element, key) => {
                return (
                  <PhoneView key={key} style={{flexWrap: 'wrap'}}>
                    <CommonRadioButton
                      status={
                        selectedIds.indexOf(key) !== -1
                          ? 'checked'
                          : 'unchecked'
                      }
                      onPress={() => toggleSelect(key)}
                      text={''}
                    />
                    <View style={{width: '90%'}}>
                      <Question
                        needOps={false}
                        question={element}
                        btns={[
                          {
                            theme: 'dark',
                            title: commonTranslator.edit,
                            onPress: question => {
                              setSelectedQuestion(question);
                              setShowEditPane(true);
                            },
                          },
                        ]}
                      />
                    </View>
                  </PhoneView>
                );
              })}
          </View>
        </CommonWebBox>
      )}
    </View>
  );
};

export default Questions;
