import {CommonButton, PhoneView} from '../../../../styles/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import translator from '../Translator';
import commonTranslator from '../../../../tranlates/Common';
import vars from '../../../../styles/root';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {generateQuestionPDF} from './Utility';

const Ops = props => {
  const toggleVisibility = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.editQuiz + props.quiz.id,
        'post',
        {
          visibility: !props.quiz.visibility,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        props.quiz.visibility = !props.quiz.visibility;
        props.updateQuiz(props.quiz);
      }
    });
  };

  const remove = () => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        props.quiz.generalMode === 'IRYSC'
          ? routes.removeIRYSCQuiz + props.quiz.id
          : routes.removeSchoolQuiz + props.quiz.id,
        'delete',
        undefined,
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) props.removeQuiz(props.quiz.id);
      props.toggleShowPopUp();
    });
  };

  const changeMode = newMode => {
    if (
      newMode === 'update' &&
      props.quiz.showResultsAfterCorrection === undefined
    ) {
      props.setLoading(true);
      Promise.all([
        generalRequest(
          props.quiz.generalMode === 'IRYSC'
            ? routes.fetchIRYSCQuiz + props.quiz.id
            : routes.fetchIRYSCQuiz + props.quiz.id,
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
      title={props.quiz.title}
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
            props.quiz.visibility
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
        {!props.quiz.isOnline && props.quiz.mode === 'regular' && (
          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            onPress={() => props.setMode('CV')}
            title={translator.correntAnswerSheets}
          />
        )}
        {!props.quiz.isOnline && (
          <CommonButton
            dir={'rtl'}
            theme={'transparent'}
            onPress={async () => {
              props.setLoading(true);
              await generateQuestionPDF(
                props.quiz.id,
                props.quiz.generalMode,
                props.token,
              );

              props.setLoading(false);
            }}
            title={translator.generateQuestionPDF}
          />
        )}
      </PhoneView>
    </LargePopUp>
  );
};

export default Ops;
