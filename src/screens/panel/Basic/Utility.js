import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
import {showSuccess} from '../../../services/utility';
import commonTranslator from '../../../translator/common';
export const removeGrade = async (setLoading, token, gradeId, afterFunc) => {
  setLoading(true);
  const res = await generalRequest(
    routes.removeGrades,
    'delete',
    {
      items: [gradeId],
    },
    ['excepts', 'doneIds'],
    token,
  );
  setLoading(false);
  if (res !== null) {
    showSuccess(res.excepts);
    afterFunc(res.doneIds);
  }
};
export const removeLesson = async (
  setLoading,
  token,
  subMode,
  lessonId,
  afterFunc,
) => {
  setLoading(true);
  const res = await generalRequest(
    routes.removeLessons + subMode,
    'delete',
    {
      items: [lessonId],
    },
    ['excepts', 'doneIds'],
    token,
  );
  setLoading(false);
  if (res !== null) {
    showSuccess(res.excepts);
    afterFunc(res.doneIds);
  }
};
export const removeSubject = async (
  setLoading,
  token,
  subjectId,
  afterFunc,
) => {
  setLoading(true);
  const res = await generalRequest(
    routes.removeSubjects,
    'delete',
    {
      items: [subjectId],
    },
    ['excepts', 'doneIds'],
    token,
  );
  setLoading(false);
  if (res !== null) {
    showSuccess(res.excepts);
    afterFunc(res.doneIds);
  }
};
export const getGradesOnly = async (token, subMode) => {
  const res = await generalRequest(
    subMode === 'grade' ? routes.fetchGrades : routes.fetchBranches,
    'get',
    undefined,
    'data',
    token,
  );
  return res;
};
export const getGradeLessons = async token => {
  const res = await generalRequest(
    routes.fetchGradeLessons,
    'get',
    undefined,
    'data',
    token,
  );
  return res;
};
export const getGradeAndBranchesLessons = async token => {
  const res = await generalRequest(
    routes.fetchGradeLessonsInGradesAndBranches,
    'get',
    undefined,
    'data',
    token,
  );
  return res;
};
export const getGrades = async token => {
  return await generalRequest(
    routes.fetchGradesAndBranches,
    'get',
    undefined,
    'data',
    token,
  );
};
export const getSubjects = async token => {
  const res = await generalRequest(
    routes.fetchSubjects,
    'get',
    undefined,
    'data',
    token,
  );
  return res;
};
export const getLessons = async (token, subMode) => {
  const res = await generalRequest(
    subMode === 'grade' ? routes.fetchLessonGrades : routes.fetchLessonBranch,
    'get',
    undefined,
    'data',
    token,
  );
  return res;
};
export const editGrade = async (id, token, data, isOlympiadOld) => {
  const res = await generalRequest(
    isOlympiadOld ? routes.editBranch + id : routes.editGrade + id,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};
export const editLesson = async (subMode, id, gradeId, token, data) => {
  const res = await generalRequest(
    routes.editLesson + subMode + '/' + gradeId + '/' + id,
    'put',
    data,
    undefined,
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};
export const createGrade = async (token, data, isOlympiad) => {
  const res = await generalRequest(
    isOlympiad === 'yes' ? routes.addBranch : routes.addGrade,
    'post',
    data,
    'id',
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};
export const createLesson = async (token, subMode, gradeId, data) => {
  const res = await generalRequest(
    routes.addLesson + subMode + '/' + gradeId,
    'post',
    data,
    'id',
    token,
  );
  if (res !== null) showSuccess(commonTranslator.success);
  return res;
};
const mandatoryFields = [
  'name',
  'easyPrice',
  'midPrice',
  'hardPrice',
  'schoolEasyPrice',
  'schoolMidPrice',
  'schoolHardPrice',
];
export const createSubject = async (token, gradeId, lessonId, data) => {
  try {
    const res = await generalRequest(
      routes.addSubject + gradeId + '/' + lessonId,
      'post',
      data,
      ['id', 'code'],
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess(commonTranslator.success);
    return res;
  } catch (e) {
    return null;
  }
};
export const editSubject = async (id, token, data) => {
  try {
    const res = await generalRequest(
      routes.editSubject + id,
      'put',
      data,
      undefined,
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess(commonTranslator.success);
    return res;
  } catch (e) {
    return null;
  }
};
