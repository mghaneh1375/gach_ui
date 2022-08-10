import {CommonButton, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import vars from '../../../../styles/root';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {generateQuestionPDF, removeQuiz} from './Utility';
import {dispatchQuizContext, quizContext} from './Context';
import React from 'react';

const Ops = props => {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const toggleVisibility = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.editQuiz + state.selectedQuiz.id,
        'post',
        {
          visibility: !state.selectedQuiz.visibility,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        state.selectedQuiz.visibility = !state.selectedQuiz.visibility;
        props.updateQuiz(state.selectedQuiz);
      }
    });
  };

  const remove = async () => {
    props.setLoading(true);
    let res = await removeQuiz(
      state.selectedQuiz.generalMode,
      state.selectedQuiz.id,
      props.token,
    );
    props.setLoading(false);
    if (res !== null) {
      let newList = state.quizzes.filter(elem => {
        return elem.id !== state.selectedQuiz.id;
      });
      dispatch({quizzes: newList});
    }
    props.toggleShowPopUp();
  };

  const changeMode = newMode => {
    if (
      newMode === 'update' &&
      state.selectedQuiz.showResultsAfterCorrection === undefined
    ) {
      props.setLoading(true);
      Promise.all([
        generalRequest(
          state.selectedQuiz.generalMode === 'IRYSC'
            ? routes.fetchIRYSCQuiz + state.selectedQuiz.id
            : routes.fetchIRYSCQuiz + state.selectedQuiz.id,
          'get',
          undefined,
          'data',
          props.token,
        ),
      ]).then(res => {
        props.setLoading(false);
        if (res[0] !== null) {
          props.updateQuiz(res[0]);
          props.setMode(newMode);
          props.toggleShowPopUp();
        }
      });
    } else {
      props.setMode(newMode);
      props.toggleShowPopUp();
    }
  };

  return (
    <LargePopUp
      title={state.selectedQuiz.title}
      btns={
        <CommonButton
          onPress={() => remove()}
          title={commonTranslator.delete}
          style={{backgroundColor: vars.ORANGE_RED}}
        />
      }
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView style={{flexWrap: 'wrap'}}>
        <CommonButton
          onPress={() => changeMode('update')}
          dir={'rtl'}
          theme={'transparent'}
          title={translator.seeInfo}
        />
        <CommonButton
          dir={'rtl'}
          onPress={() => changeMode('question')}
          theme={'transparent'}
          title={translator.editQuestions}
        />
        {/* <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          title={translator.forceRegistry}
        /> */}
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => toggleVisibility()}
          title={
            state.selectedQuiz.visibility
              ? commonTranslator.hide
              : commonTranslator.show
          }
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          onPress={() => changeMode('student')}
          title={translator.studentsList}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          title={translator.createTaraz}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          title={translator.gift}
        />
        <CommonButton
          dir={'rtl'}
          theme={'transparent'}
          title={translator.transferToOpenQuiz}
        />
        <CommonButton
          onPress={() => props.setMode('ranking')}
          // onPress={() => props.navigate('/ranking/irysc/1')}
          dir={'rtl'}
          theme={'transparent'}
          title={'مشاهده نتایج'}
        />
        {(state.selectedQuiz.launchMode === 'physical' ||
          state.selectedQuiz.launchMode === 'hybrid') &&
          state.selectedQuiz.mode === 'regular' && (
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => props.setMode('CV')}
              title={translator.correntAnswerSheets}
            />
          )}
        {(state.selectedQuiz.launchMode === 'physical' ||
          state.selectedQuiz.launchMode === 'hybrid') && (
          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            onPress={async () => {
              props.setLoading(true);
              await generateQuestionPDF(
                state.selectedQuiz.id,
                state.selectedQuiz.generalMode,
                props.token,
              );

              props.setLoading(false);
            }}
            title={translator.generateQuestionPDF}
          />
        )}
        {state.selectedQuiz.mode !== 'tashrihi' && (
          <CommonButton
            title={translator.keySheet}
            dir={'rtl'}
            theme={'transparent'}
            onPress={() => props.setMode('key')}
          />
        )}
      </PhoneView>
    </LargePopUp>
  );
};

export default Ops;
