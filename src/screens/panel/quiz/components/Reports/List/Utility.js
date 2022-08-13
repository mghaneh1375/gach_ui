import {
  fetchAuthorReport,
  fetchCityReport,
  fetchGenderReport,
  fetchSchoolReport,
  fetchStateReport,
} from '../../Utility';

export const fetchSchoolReportLocal = async (
  setLoading,
  quiz,
  dispatch,
  setSelectedReport,
  token,
) => {
  if (quiz.schoolReport !== undefined) {
    setSelectedReport('school');
    return;
  }

  setLoading(true);
  let res = await fetchSchoolReport(quiz.id, token);
  setLoading(false);

  if (res === null) return;

  quiz.schoolReport = res;
  dispatch({selectedQuiz: quiz, needUpdate: true});
  setSelectedReport('school');
};

export const fetchStateReportLocal = async (
  setLoading,
  quiz,
  dispatch,
  setSelectedReport,
  token,
) => {
  if (quiz.stateReport !== undefined) {
    setSelectedReport('state');
    return;
  }

  setLoading(true);
  let res = await fetchStateReport(quiz.id, token);
  setLoading(false);

  if (res === null) return;

  quiz.stateReport = res;
  dispatch({selectedQuiz: quiz, needUpdate: true});
  setSelectedReport('state');
};

export const fetchCityReportLocal = async (
  setLoading,
  quiz,
  dispatch,
  setSelectedReport,
  token,
) => {
  if (quiz.cityReport !== undefined) {
    setSelectedReport('city');
    return;
  }

  setLoading(true);
  let res = await fetchCityReport(quiz.id, token);
  setLoading(false);

  if (res === null) return;

  quiz.cityReport = res;
  dispatch({selectedQuiz: quiz, needUpdate: true});
  setSelectedReport('city');
};

export const fetchGenderReportLocal = async (
  setLoading,
  quiz,
  dispatch,
  setSelectedReport,
  token,
) => {
  if (quiz.genderReport !== undefined) {
    setSelectedReport('gender');
    return;
  }

  setLoading(true);
  let res = await fetchGenderReport(quiz.id, token);
  setLoading(false);

  if (res === null) return;

  quiz.genderReport = res;
  dispatch({selectedQuiz: quiz, needUpdate: true});
  setSelectedReport('gender');
};

export const fetchAuthorReportLocal = async (
  setLoading,
  quiz,
  dispatch,
  setSelectedReport,
  token,
) => {
  if (quiz.authorReport !== undefined) {
    setSelectedReport('author');
    return;
  }

  setLoading(true);
  let res = await fetchAuthorReport(quiz.id, token);
  setLoading(false);

  if (res === null) return;

  quiz.authorReport = res;
  dispatch({selectedQuiz: quiz, needUpdate: true});
  setSelectedReport('author');
};
