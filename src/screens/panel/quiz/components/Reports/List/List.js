import {CommonButton, PhoneView} from '../../../../../../styles/Common';
import React, {useState} from 'react';
import {quizContext, dispatchQuizContext} from '../../Context';
import {View} from 'react-native';
import Participants from '../Participants/Participants';
import {
  fetchCityReport,
  fetchSchoolReport,
  fetchStateReport,
} from '../../Utility';
import translator from './Translator';

function List(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [showSchoolReport, setShowSchoolReport] = useState(false);
  const [showCityReport, setShowCityReport] = useState(false);
  const [showStateReport, setShowStateReport] = useState(false);
  const [showGenderReport, setShowGenderReport] = useState(false);

  const fetchSchoolReportLocal = async () => {
    if (state.selectedQuiz.schoolReport !== undefined) {
      setShowSchoolReport(true);
      return;
    }

    props.setLoading(true);
    let res = await fetchSchoolReport(state.selectedQuiz.id, props.token);
    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.schoolReport = res;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
    setShowSchoolReport(true);
  };

  const fetchStateReportLocal = async () => {
    if (state.selectedQuiz.stateReport !== undefined) {
      setShowStateReport(true);
      return;
    }

    props.setLoading(true);
    let res = await fetchStateReport(state.selectedQuiz.id, props.token);
    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.stateReport = res;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
    setShowStateReport(true);
  };

  const fetchCityReportLocal = async () => {
    if (state.selectedQuiz.cityReport !== undefined) {
      setShowCityReport(true);
      return;
    }

    props.setLoading(true);
    let res = await fetchCityReport(state.selectedQuiz.id, props.token);
    props.setLoading(false);

    if (res === null) return;

    state.selectedQuiz.cityReport = res;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
    setShowCityReport(true);
  };

  return (
    <View>
      <PhoneView>
        <CommonButton
          onPress={() => fetchSchoolReportLocal()}
          title={translator.schoolReport}
        />
        <CommonButton
          onPress={() => fetchStateReportLocal()}
          title={translator.stateReprt}
        />
        <CommonButton
          onPress={() => fetchCityReportLocal()}
          title={translator.cirtReport}
        />
        <CommonButton title={translator.A1} />
        <CommonButton title={translator.participationReport} />
      </PhoneView>
      {showSchoolReport && state.selectedQuiz.schoolReport !== undefined && (
        <Participants data={state.selectedQuiz.schoolReport} />
      )}
      {showStateReport && state.selectedQuiz.stateReport !== undefined && (
        <Participants data={state.selectedQuiz.stateReport} />
      )}
    </View>
  );
}

export default List;
