import React, {useState} from 'react';
import {View} from 'react-native';
import {addQuestionToQuizzes, filter, removeQuestion} from '../Utility';
import Question from './Question';
import Quizzes from './../../../../../components/web/Quizzes';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';

function Detail(props) {
  const [selectingQuiz, setSelectingQuiz] = useState(false);
  const [questionOrganizationId, setQuestionOrganizationId] = useState();
  const [selectedQuizzes, setSelectedQuizzes] = useState();
  const [quizzes, setQuizzes] = useState();
  const [isWorking, setIsWorking] = useState(false);

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

  React.useEffect(() => {
    if (isWorking || props.subject.questions !== undefined) return;

    props.setLoading(true);
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
      props.setLoading(false);

      if (res[0] === null) {
        props.setMode('list');
        return;
      }

      props.setSubject(res[0][0]);
      setIsWorking(false);
    });
  }, [props, isWorking]);

  return (
    <View>
      {!selectingQuiz && (
        <View>
          <FontIcon
            kind={'normal'}
            theme={'rect'}
            icon={faAngleLeft}
            onPress={() => props.setMode('list')}
            parentStyle={{alignSelf: 'flex-end', margin: 20}}
            back={'yellow'}
          />
          {props.subject.questions !== undefined &&
            props.subject.questions.map((elem, index) => {
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
