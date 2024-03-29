import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';

export const fetchSubjects = () => {};

export const fetchTags = token => {
  return generalRequest(routes.getAllTags, 'get', undefined, 'data', token);
};

export const fetchSchedules = (token, userId, filter = undefined) => {
  return generalRequest(
    filter === undefined
      ? routes.getStudentSchedules + userId
      : routes.getStudentSchedules + userId + '?notReturnPassed=' + filter,
    'get',
    undefined,
    'data',
    token,
  );
};

export const copy = (token, scheduleId, scheduleFor, students) => {
  return generalRequest(
    routes.copySchedule + scheduleId,
    'post',
    {
      users: students,
      scheduleFor: scheduleFor,
    },
    ['doneIds', 'excepts'],
    token,
  );
};

export const fetchMySchedules = (token, filter = undefined) => {
  return generalRequest(
    filter === undefined
      ? routes.getMySchedules
      : routes.getMySchedules + '?notReturnPassed=' + filter,
    'get',
    undefined,
    'data',
    token,
  );
};

export const lessonsInSchedule = (token, id, isAdvisor) => {
  return generalRequest(
    isAdvisor
      ? routes.lessonsInSchedule + id
      : routes.getMyLessonsInSchedule + id,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchSchedule = (
  token,
  id = undefined,
  userId = undefined,
  scheduleFor = undefined,
) => {
  return generalRequest(
    id !== undefined
      ? routes.getStudentSchedule + id
      : routes.getStudentSchedule + userId + '/' + scheduleFor,
    'get',
    undefined,
    'data',
    token,
  );
};

export const addItemToSchedule = async (token, userId, data) => {
  let res = await generalRequest(
    routes.addItemToSchedule + userId,
    'put',
    data,
    'data',
    token,
  );
  if (res != null) {
    showSuccess();
  }

  return res;
};

export const updateScheduleItem = async (token, userId, data) => {
  let res = await generalRequest(
    routes.updateScheduleItem + userId,
    'put',
    data,
    'data',
    token,
  );
  if (res != null) showSuccess();

  return res;
};

export const getLessons = (gradeId, isOlympiad) => {
  let query = new URLSearchParams();
  query.append('parentId', gradeId);

  if (isOlympiad) query.append('searchInBranches', true);

  return generalRequest(
    routes.getLessonsDigest + '?' + query.toString(),
    'get',
    undefined,
    'data',
  );
};

export const removeItemFromSchedule = async (token, userId, id) => {
  let res = await generalRequest(
    routes.removeItemFromSchedule + userId + '/' + id,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res != null) showSuccess();
  return res;
};

export const setDoneInSchedule = async (token, id, itemId, data) => {
  let res = await generalRequest(
    routes.setDoneInSchedule + id + '/' + itemId,
    'post',
    data,
    'data',
    token,
  );
  if (res != null) showSuccess();
  return res;
};

export const removeSchedule = async (token, id) => {
  let res = await generalRequest(
    routes.removeSchedule + id,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res != null) showSuccess();
  return res;
};
