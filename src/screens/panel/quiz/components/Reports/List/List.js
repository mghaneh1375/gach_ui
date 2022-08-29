import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../../../styles/Common';
import React, {useState} from 'react';
import {quizContext, dispatchQuizContext} from '../../Context';
import {View} from 'react-native';
import Participants from '../Participants/Participants';

import translator from './Translator';
import commonTranslator from '../../../../../../translator/Common';
import {
  fetchCityReportLocal,
  fetchGenderReportLocal,
  fetchSchoolReportLocal,
  fetchStateReportLocal,
  fetchAuthorReportLocal,
} from './Utility';
import AuthorReport from '../Author/AuthorReport';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [selectedReport, setSelectedReport] = useState('');

  return (
    <MyView>
      <CommonWebBox
        header={commonTranslator.report}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView>
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
          <CommonButton title={translator.participationReport} />
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
    </MyView>
  );
}

export default List;
