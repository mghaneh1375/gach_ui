import {
  faBook,
  faClock,
  faCode,
  faComment,
  faLevelUp,
  faMoneyBills,
  faMoneyCheck,
  faRegistered,
  faTicket,
  faUser,
  faUserAlt,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import {getPast} from '@/services/utility';
const itemsIcon = {
  pendingChunks: faVideo,
  pendingTickets: faTicket,
  pendingSettleRequests: faMoneyCheck,
  pendingRequestForAdvisorAnswer: faClock,
  pendingRequestForStudentPay: faMoneyBills,
  lastMonthKarbargs: faBook,
  lastMonthMeetings: faMoneyCheck,
  lastMonthSettled: faMoneyCheck,
  pendingUpgradeLevelRequests: faLevelUp,
  lastMonthCustomQuizRegistry: faRegistered,
  lastMonthOpenQuizRegistry: faRegistered,
  lastMonthTutorialCount: faCode,
  lastMonthContentBuyCount: faLevelUp,
  lastMonthAdviceMeetings: faBook,
  lastMonthTeachReportsCount: faBook,
  pendingComments: faComment,
  activeTeachers: faUser,
  activeAdvisors: faUserAlt,
};
const itemsUrl = {
  pendingChunks: undefined,
  pendingTickets: '/ticket?status=pending',
  pendingSettleRequests: '/settlementRequests?status=pending',
  pendingRequestForAdvisorAnswer: undefined,
  pendingRequestForStudentPay: undefined,
  lastMonthKarbargs: undefined,
  lastMonthMeetings: undefined,
  lastMonthSettled:
    '/settlementRequests?status=paid&from=' + getPast(30, false),
  pendingUpgradeLevelRequests: '/ticket?section=upgradelevel&status=pending',
  lastMonthCustomQuizRegistry:
    '/admin/report/general?section=CUSTOM_QUIZ&from=' + getPast(30, false),
  lastMonthOpenQuizRegistry:
    '/admin/report/general?section=OPEN_QUIZ_EXAM&from=' + getPast(30, false),
  lastMonthTutorialCount: undefined,
  lastMonthContentBuyCount:
    '/admin/report/general?section=CONTENT&from=' + getPast(30, false),
  lastMonthAdviceMeetings:
    '/admin/report/general?section=ADVISOR&from=' + getPast(30, false),
  lastMonthTeachReportsCount: '/admin/teach/reports',
  pendingComments: '/all-comments',
  activeTeachers: undefined,
  activeAdvisors: undefined,
};
export {itemsIcon, itemsUrl};
