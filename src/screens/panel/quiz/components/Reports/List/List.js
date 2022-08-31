import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../../../styles/Common';
import React, {useState} from 'react';
import {quizContext, dispatchQuizContext} from '../../Context';
import Participants from '../Participants/Participants';

import translator from './Translator';
import commonTranslator from '../../../../../../translator/Common';
import {
  fetchCityReportLocal,
  fetchGenderReportLocal,
  fetchSchoolReportLocal,
  fetchStateReportLocal,
  fetchAuthorReportLocal,
  fetchParticipantReportLocal,
} from './Utility';
import AuthorReport from '../Author/AuthorReport';
import ParticipantReport from '../Participant/ParticipantReport';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import {typeOfReportKeyVals} from './KeyVals';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [selectedReport, setSelectedReport] = useState('');
  const [type, setType] = useState();

  return (
    <MyView>
      <CommonWebBox
        header={commonTranslator.report}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView>
          <JustBottomBorderSelect
            placeholder={translator.typeOfReport}
            subText={translator.typeOfReport}
            setter={setType}
            values={typeOfReportKeyVals}
            value={typeOfReportKeyVals.find(elem => elem.id === type)}
          />
          <CommonButton title={translator.show} />
          <CommonButton
            onPress={() =>
              fetchSchoolReportLocal(
                props.setLoading,
                state.selectedQuiz,
                dispatch,
                setSelectedReport,
                props.token,
              )
            }
            title={translator.schoolReport}
          />
          <CommonButton
            onPress={() =>
              fetchStateReportLocal(
                props.setLoading,
                state.selectedQuiz,
                dispatch,
                setSelectedReport,
                props.token,
              )
            }
            title={translator.stateReprt}
          />
          <CommonButton
            onPress={() =>
              fetchCityReportLocal(
                props.setLoading,
                state.selectedQuiz,
                dispatch,
                setSelectedReport,
                props.token,
              )
            }
            title={translator.cirtReport}
          />
          <CommonButton
            onPress={() =>
              fetchGenderReportLocal(
                props.setLoading,
                state.selectedQuiz,
                dispatch,
                setSelectedReport,
                props.token,
              )
            }
            title={translator.genderReport}
          />
          <CommonButton title={translator.A1} />
          <CommonButton
            onPress={() =>
              fetchParticipantReportLocal(
                props.setLoading,
                state.selectedQuiz,
                dispatch,
                setSelectedReport,
                props.token,
              )
            }
            title={translator.participationReport}
          />
          <CommonButton
            onPress={() =>
              fetchAuthorReportLocal(
                props.setLoading,
                state.selectedQuiz,
                dispatch,
                setSelectedReport,
                props.token,
              )
            }
            title={translator.authorReport}
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
