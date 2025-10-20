import React, {useState} from 'react';
import {dispatchMyQuizzesContext, myQuizzesContext} from './Context.jsx';
import {
  fetchA1ReportLocal,
  fetchKarnameReportLocal,
  fetchParticipantReportLocal,
} from '../../../panel/quiz/components/reports/list/utility';
import A1Report from '../../../panel/quiz/components/reports/A1Report.jsx';
import KarnameReport from '../../../panel/quiz/components/reports/KarnameReport.jsx';
import ParticipantReport from '../../../panel/quiz/components/reports/participant/ParticipantReport.jsx';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import commonTranslator from '@/translator/common.js';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import translator from '../../../panel/quiz/components/reports/list/translator';
function Report(props) {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [selectedReport, setSelectedReport] = useState('');
  const [type, setType] = useState();
  const fetchWantedReport = React.useCallback(() => {
    if (type === undefined) {
      return;
    }
    let func;
    if (type === 'karnameReport') func = fetchKarnameReportLocal;
    if (type === 'participationReport') func = fetchParticipantReportLocal;
    if (type === 'A1') func = fetchA1ReportLocal;
    func(
      props.setLoading,
      state.selectedQuiz,
      dispatch,
      setSelectedReport,
      props.token,
    );
  }, [props, type, state.selectedQuiz, dispatch]);
  const typeOfReportKeyVals = [
    {
      id: 'karnameReport',
      item: translator.karnameReport,
    },
    {
      id: 'participationReport',
      item: translator.participationReport,
    },
    {
      id: 'A1',
      item: translator.A1,
    },
  ];
  const typeOfReportKeyValsBeforeReady = [
    {
      id: 'participationReport',
      item: translator.participationReport,
    },
  ];
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
                ? typeOfReportKeyVals
                : typeOfReportKeyValsBeforeReady
            }
            value={typeOfReportKeyVals.find(elem => elem.id === type)}
          />
          <CommonButton
            onPress={() => fetchWantedReport()}
            title={translator.show}
          />
        </PhoneView>
      </CommonWebBox>

      {selectedReport === 'A1' && state.selectedQuiz.A1Report !== undefined && (
        <A1Report quiz={state.selectedQuiz} />
      )}
      {selectedReport === 'karnameReport' &&
        state.selectedQuiz.karnameReport !== undefined && (
          <KarnameReport token={props.token} quiz={state.selectedQuiz} />
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
export default Report;
