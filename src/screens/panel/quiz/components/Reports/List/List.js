import {PhoneView, SimpleText} from '../../../../../../styles/Common';
import React, {useState} from 'react';
import {quizContext, dispatchQuizContext} from '../../Context';
import {View} from 'react-native';
import Participants from '../Participants/Participants';
import {fetchSchoolReport, fetchStateReport} from '../../Utility';

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

    let res = await fetchSchoolReport(state.selectedQuiz.id, props.token);
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

    let res = await fetchStateReport(state.selectedQuiz.id, props.token);
    if (res === null) return;

    state.selectedQuiz.stateReport = res;
    dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
    setShowStateReport(true);
  };

  return (
    <View>
      <PhoneView>
        <SimpleText
          onPress={() => fetchSchoolReportLocal}
          text={'شهر های شرکت کننده'}
        />
        <SimpleText
          onPress={() => fetchStateReportLocal}
          text={'استان های شرکت کننده'}
        />
        <SimpleText text={'مدارس شرکت کننده'} />
        <SimpleText text={'نمای کلی'} />
        <SimpleText text={'لیست حضور و غیاب'} />
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
