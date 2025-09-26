import {
  faMoneyBill,
  faUsers,
  faUsersLine,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
const itemsIcon = {
  studentsCountForAdvice: faUsers,
  studentsCountForTeach: faUsersLine,
  pendingExamsForPay: faVideo,
  lastMonthCreatedExams: faVideo,
  lastMonthMeetings: faVideo,
  lastMonthKarbargs: faVideo,
  lastMonthSettled: faMoneyBill,
  pendingSettled: faVideo,
};
const itemsUrl = {
  studentsCountForAdvice: '/manageStudent',
  studentsCountForTeach: undefined,
  pendingExamsForPay: '/mySchoolQuizzes?status=init',
  lastMonthCreatedExams: undefined,
  lastMonthMeetings: undefined,
  lastMonthKarbargs: undefined,
};
export {itemsIcon, itemsUrl};
