import {faUsers, faUsersLine, faVideo} from '@fortawesome/free-solid-svg-icons';
const itemsIcon = {
  studentsCountForAdvice: faUsers,
  studentsCountForTeach: faUsersLine,
  pendingExamsForPay: faVideo,
  lastMonthCreatedExams: faVideo,
  lastMonthMeetings: faVideo,
  lastMonthkarbargs: faVideo,
};
const itemsUrl = {
  studentsCountForAdvice: '/manageStudent',
  studentsCountForTeach: undefined,
  pendingExamsForPay: '/mySchoolQuizzes?status=init',
  lastMonthCreatedExams: undefined,
  lastMonthMeetings: undefined,
  lastMonthkarbargs: undefined,
};
export {itemsIcon, itemsUrl};
