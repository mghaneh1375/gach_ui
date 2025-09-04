import {CommonButton, CommonWebBox, PhoneView, MyView} from '@/styles';
import React, {useState} from 'react';
import {quizContext, dispatchQuizContext} from '../../Context';
import Participants from '../participants/Participants';
import translator from './translator';
import commonTranslator from '../../../../../../translator/common';
import {
  fetchKarnameReportLocal,
  fetchCityReportLocal,
  fetchGenderReportLocal,
  fetchSchoolReportLocal,
  fetchStateReportLocal,
  fetchAuthorReportLocal,
  fetchParticipantReportLocal,
  fetchA1ReportLocal,
} from './utility';
import AuthorReport from '../author/AuthorReport';
import ParticipantReport from '../participant/ParticipantReport';
import JustBottomBorderSelect from '../../../../../../styles/common/JustBottomBorderSelect';
import {
  typeOfReportBeforeFinishKeyVals,
  typeOfReportKeyVals,
  typeOfReportKeyValsSchoolAccess,
} from './keyVals';
import A1Report from '../A1Report';
import KarnameReport from '../KarnameReport';
function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [selectedReport, setSelectedReport] = useState('');
  const [type, setType] = useState();
  const fetchWantedReport = React.useCallback(() => {
    if (type === undefined) {
      return;
    }
    let func;
    if (type === 'cityReport') func = fetchCityReportLocal;
    if (type === 'karnameReport') func = fetchKarnameReportLocal;
    if (type === 'stateReport') func = fetchStateReportLocal;
    if (type === 'genderReport') func = fetchGenderReportLocal;
    if (type === 'schoolReport') func = fetchSchoolReportLocal;
    if (type === 'participationReport') func = fetchParticipantReportLocal;
    if (type === 'authorReport') func = fetchAuthorReportLocal;
    if (type === 'A1') func = fetchA1ReportLocal;
    func(
      props.setLoading,
      state.selectedQuiz,
      dispatch,
      setSelectedReport,
      props.token,
    );
  }, [props, type, state.selectedQuiz, dispatch]);
  return (
    <MyView>
      <CommonWebBox
        header={commonTranslator.report}
        backBtn={true}
        onBackClick={() =>
          props.onBackClick !== undefined
            ? props.onBackClick()
            : props.setMode('list')
        }>
        <PhoneView>
          <JustBottomBorderSelect
            placeholder={translator.typeOfReport}
            subText={translator.typeOfReport}
            setter={setType}
            values={
              state.selectedQuiz.reportStatus === 'ready'
                ? props.accesses === undefined
                  ? typeOfReportKeyVals
                  : props.accesses.indexOf('school') !== -1 ||
                    props.accesses.indexOf('agent') !== -1
                  ? typeOfReportKeyValsSchoolAccess
                  : typeOfReportBeforeFinishKeyVals
                : typeOfReportBeforeFinishKeyVals
            }
            value={typeOfReportKeyVals.find(elem => elem.id === type)}
          />
          <CommonButton
            onPress={() => fetchWantedReport()}
            title={translator.show}
          />
        </PhoneView>
      </CommonWebBox>

      {selectedReport === 'school' &&
        state.selectedQuiz.schoolReport !== undefined && (
          <Participants data={state.selectedQuiz.schoolReport} />
        )}
      {selectedReport === 'state' &&
        state.selectedQuiz.stateReport !== undefined && (
          <Participants data={state.selectedQuiz.stateReport} />
        )}
      {selectedReport === 'city' &&
        state.selectedQuiz.cityReport !== undefined && (
          <Participants data={state.selectedQuiz.cityReport} />
        )}
      {selectedReport === 'gender' &&
        state.selectedQuiz.genderReport !== undefined && (
          <Participants data={state.selectedQuiz.genderReport} />
        )}
      {selectedReport === 'author' &&
        state.selectedQuiz.authorReport !== undefined && (
          <AuthorReport data={state.selectedQuiz.authorReport} />
        )}
      {selectedReport === 'A1' && state.selectedQuiz.A1Report !== undefined && (
        <A1Report />
      )}
      {selectedReport === 'karnameReport' &&
        state.selectedQuiz.karnameReport !== undefined && (
          <KarnameReport token={props.token} />
        )}
      {selectedReport === 'participant' &&
        state.selectedQuiz.participantReport !== undefined && (
          <ParticipantReport
            quizId={state.selectedQuiz.id}
            quizMode={state.selectedQuiz.generalMode}
            token={props.token}
            setLoading={props.setLoading}
            data={state.selectedQuiz.participantReport}
            setData={newData => {
              state.selectedQuiz.participantReport = newData;
              dispatch({
                selectedQuiz: state.selectedQuiz,
                needUpdate: true,
              });
            }}
          />
        )}
    </MyView>
  );
}
export default List;
