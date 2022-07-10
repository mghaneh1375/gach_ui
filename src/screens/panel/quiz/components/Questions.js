import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {
  CommonButton,
  CommonRadioButton,
  CommonWebBox,
  PhoneView,
} from '../../../../styles/Common';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import ExcelComma from '../../../../components/web/ExcelCommaInput';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';

const Questions = props => {
  const [isWorking, setIsWorking] = useState(false);
  const [result, setResult] = useState();
  const [finalMsg, setFinalMsg] = useState();
  const [selectedIds, setSelectedIds] = useState([]);
  const [showRemovePane, setShowRemovePane] = useState(false);

  const addQuestions = () => {
    // setResult(res[0]);
    props.quiz.questions = undefined;
    props.updateQuiz(props.quiz);
  };

  const toggleShowRemovePopUp = () => {
    setShowRemovePane(!showRemovePane);
  };

  const refresh = result => {
    props.quiz.questions = undefined;
    props.updateQuiz(props.quiz);
    setFinalMsg(result);
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
        generalRequest(
          routes.fetchQuestions + props.quiz.generalMode + '/' + props.quiz.id,
          'get',
          undefined,
          'data',
          props.token,
        ),
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
      {!showRemovePane && (
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
      )}

      {!showRemovePane && (
        <CommonWebBox
          header={translator.questions}
          btn={
            selectedIds.length > 0 ? (
              <CommonButton
                onPress={() => callRemoveAll()}
                title={
                  commonTranslator.deleteAll + '(' + selectedIds.length + ')'
                }
              />
            ) : undefined
          }
          child={
            <View>
              {props.quiz.questions !== undefined &&
                props.quiz.questions.map((element, key) => {
                  return (
                    <PhoneView key={key}>
                      <CommonRadioButton
                        status={
                          selectedIds.indexOf(key) !== -1
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => toggleSelect(key)}
                        text={element.organizationId}
                      />
                    </PhoneView>
                  );
                })}
            </View>
          }
        />
      )}
    </View>
  );
};

export default Questions;
