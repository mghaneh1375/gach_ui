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

const Questions = props => {
  const [isWorking, setIsWorking] = useState(false);
  const [result, setResult] = useState();
  const [finalMsg, setFinalMsg] = useState();
  const [selectedIds, setSelectedIds] = useState([]);

  const addQuestions = () => {
    // setResult(res[0]);
    props.quiz.questions = undefined;
    props.updateQuiz(props.quiz);
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

  const removeAll = () => {};

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

      <CommonWebBox
        header={translator.questions}
        btn={
          selectedIds.length > 0 ? (
            <CommonButton
              onPress={() => removeAll()}
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
    </View>
  );
};

export default Questions;
