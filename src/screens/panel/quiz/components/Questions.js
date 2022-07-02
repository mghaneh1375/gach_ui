import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {
  CommonButton,
  CommonRadioButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import vars from '../../../../styles/root';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import UploadFile from '../../../../components/web/UploadFile';

const Questions = props => {
  const [isWorking, setIsWorking] = useState(false);
  const [showUploadPopUp, setShowUploadPopUp] = useState(false);
  const [codes, setCodes] = useState();
  const [result, setResult] = useState();
  const [finalMsg, setFinalMsg] = useState();
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleShowUploadPopUp = () => {
    if (!showUploadPopUp) setFinalMsg(undefined);
    setShowUploadPopUp(!showUploadPopUp);
  };

  const addQuestions = () => {
    if (codes === undefined || codes.length === 0) return;

    let ids = codes.replaceAll(' ', '');
    ids = ids.split(',');
    ids = ids.filter(n => n);
    let organizationIds = [];
    ids.forEach(element => {
      organizationIds.push({
        organizationId: element,
      });
    });

    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.addBatchQuestionsToQuiz +
          props.quiz.generalMode +
          '/' +
          props.quiz.id,
        'put',
        {questions: organizationIds},
        'excepts',
        props.token,
      ),
    ]).then(res => {
      if (res[0] !== null) {
        setResult(res[0]);
        props.quiz.questions = undefined;
        props.updateQuiz(props.quiz);
      } else {
        props.setLoading(false);
      }
    });
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

  const changeInput = text => {
    setCodes(text);
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
    <View>
      {showUploadPopUp && (
        <UploadFile
          toggleShow={toggleShowUploadPopUp}
          maxFileSize={2}
          accept={['.xls', '.xlsx']}
          multi={false}
          url={
            routes.addBatchQuestionsToQuiz +
            props.quiz.generalMode +
            '/' +
            props.quiz.id
          }
          token={props.token}
          expectedRes={'excepts'}
          setResult={refresh}
          finalMsg={finalMsg}
          title={translator.editQuestions}
        />
      )}
      <CommonWebBox
        header={translator.chooseQuestion}
        child={
          <View>
            <PhoneView>
              <View style={{width: '80%'}}>
                <JustBottomBorderTextInput
                  style={{minWidth: '95%'}}
                  onChangeText={e => changeInput(e)}
                  placeholder={translator.organizationId}
                  subText={translator.organizationIdHelp}
                />
              </View>
              <View style={{width: 30, height: 30, alignSelf: 'center'}}>
                <FontIcon
                  onPress={() => addQuestions()}
                  parentStyle={{borderRadius: 7, backgroundColor: vars.YELLOW}}
                  icon={faPlus}
                />
              </View>
              <CommonButton
                onPress={() => toggleShowUploadPopUp()}
                title={commonTranslator.upload}
                theme={'dark'}
              />
            </PhoneView>
            {result !== undefined && <SimpleText text={result} />}
          </View>
        }
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
