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

const Questions = props => {
  const [isWorking, setIsWorking] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showRemovePane, setShowRemovePane] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [showEditPane, setShowEditPane] = useState(false);

  const toggleShowRemovePopUp = () => {
    setShowRemovePane(!showRemovePane);
  };

  const refresh = result => {
    props.quiz.questions = undefined;
    props.updateQuiz(props.quiz);
  };

  const toggleSelect = id => {
    let newSelectedIds = selectedIds;

    newSelectedIds.indexOf(id) === -1
      ? newSelectedIds.push(id)
      : newSelectedIds.splice(newSelectedIds.indexOf(id), 1);

    setSelectedIds(newSelectedIds);
    props.updateQuiz(props.quiz);
  };

  const callRemoveAll = () => {
    setShowRemovePane(true);
  };

  const afterRemove = res => {
    toggleShowRemovePopUp();

    props.quiz.questions = props.quiz.questions.filter((element, index) => {
      return selectedIds.indexOf(index) === -1;
    });

    setSelectedIds([]);
    props.updateQuiz(props.quiz);
  };

  React.useEffect(() => {
    if (!isWorking && props.quiz.questions === undefined) {
      setIsWorking(true);
      props.setLoading(true);
      Promise.all([
        getQuestions(props.token, props.quiz.id, props.quiz.generalMode),
      ]).then(res => {
        props.setLoading(false);
        setIsWorking(false);

        if (res[0] !== null) {
          props.quiz.questions = res[0];
          props.updateQuiz(props.quiz);
        }
      });
    }
  }, [props, isWorking]);

  return (
    <View style={{zIndex: 5}}>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          url={
            routes.removeQuestionFromQuiz +
            props.quiz.generalMode +
            '/' +
            props.quiz.id
          }
          afterFunc={afterRemove}
          setLoading={props.setLoading}
          token={props.token}
          data={{
            items: selectedIds.map(idx => {
              return props.quiz.questions[idx].id;
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
          quizId={props.quiz.id}
          quizGeneralMode={props.quiz.generalMode}
          question={selectedQuestion}
          afterFunc={mark => {
            props.quiz.questions = props.quiz.questions.map(element => {
              if (element.id === selectedQuestion.id) {
                let tmp = selectedQuestion;
                tmp.mark = mark;
                return tmp;
              }
              return element;
            });

            props.updateQuiz(props.quiz);
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
                props.quiz.generalMode +
                '/' +
                props.quiz.id
              }
              uploadUrl={
                routes.addBatchQuestionsToQuiz +
                props.quiz.generalMode +
                '/' +
                props.quiz.id
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
            {props.quiz.questions !== undefined &&
              props.quiz.questions.map((element, key) => {
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
