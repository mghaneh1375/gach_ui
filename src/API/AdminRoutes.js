export const adminRoutes = {
  adminDashboardInfo: 'admin/dashboard/getInfo',
  // SETTLED API
  settlementRequests: 'admin/settled/getSettledRequests',
  createSettlementRequest: 'admin/settled/createSettlementRequest/',
  setSettlementRequestStatus: 'admin/settled/changeSettlementRequestStatus/',

  // USER MANAGEMENT API
  adminLogin: 'admin/user/signIn/',
  generateTempCode: 'admin/user/generateTempCode/',
  createUserByAdmin: 'admin/user/createUser',
  fetchTinyUser: 'admin/user/fetchTinyUser?',
  addAccess: 'admin/user/addAccess/',
  removeAccess: 'admin/user/removeAccess/',
  toggleStatus: 'admin/user/toggleStatus/',
  getUsersReport: 'admin/user/getUsersReport',
  removeStudents: 'admin/user/removeStudents',
  removeUsers: 'admin/user/removeUsers',

  // CONTENT MANAGEMENT API
  fetchGrades: 'admin/content/grades',
  fetchLessonGrades: 'admin/content/lessonsInGrade',
  fetchLessonBranch: 'admin/content/lessonsInBranch',
  getLessonsDigest: 'admin/content/getLessonsDigest',
  fetchGradeLessons: 'admin/content/gradeLessons',
  fetchGradeLessonsInGradesAndBranches:
    'admin/content/gradeLessonsInGradesAndBranches',
  addLesson: 'admin/content/addLesson/',
  editLesson: 'admin/content/updateLesson/',
  removeLessons: 'admin/content/deleteLessons/',
  removeSubjects: 'admin/content/deleteSubjects',
  addBatchSubjects: 'admin/content/addBatch',
  addSubject: 'admin/content/addSubject/',
  editSubject: 'admin/content/updateSubject/',
  updateBatchSubjects: 'admin/content/updateBatchSubjects',
  fetchSubjects: 'admin/content/all',
  getSubjectsKeyVals: 'admin/content/getSubjectsKeyVals',
  fetchGradesAndBranches: 'admin/content/gradesAndBranches',
  fetchCourseIntroductionList: 'admin/course/list',
  removeGrades: 'admin/content/deleteGrades',
  removeCourseIntroduction: 'admin/course/',
  addCourseIntroduction: 'admin/course/',
  addGrade: 'admin/content/addGrade',
  editGrade: 'admin/content/updateGrade/',
  addBranch: 'admin/content/addBranch',
  editBranch: 'admin/content/updateBranch/',
  fetchBranches: 'admin/content/branches',

  // QUESTION MANAGEMENT API
  addQuestion: 'admin/question/store/',
  addEscapeQuizQuestion: 'admin/question/storeEscapeQuizQuestion/',
  editQuestion: 'admin/question/edit/',
  editEscapeQuizQuestion: 'admin/question/editEscapeQuizQuestion/',
  addBatchQuestions: 'admin/question/addBatch',
  addBatchEscapeQuizQuestions: 'admin/question/addBatchEscapeQuizQuestions',
  removeQuestion: 'admin/question/remove',
  removeEscapeQuiz: 'admin/question/removeEscapeQuiz',
  getSubjectQuestions: 'admin/question/subjectQuestions',
  removeEscapeQuizQuestion: 'admin/question/removeEscapeQuizQuestion',
  getEscapeQuizQuestions: 'admin/question/escapeQuizQuestions',

  // OFF MANAGEMENT API
  fetchAllOffs: 'admin/off/offs',
  getShopCopunReport: 'admin/off/getShopCopunReport',
  getShopCopunRevReport: 'admin/off/getShopCopunRevReport',
  storeOffs: 'admin/off/store',
  updateOff: 'admin/off/update/',
  storeOffsWithExcel: 'admin/off/storeWithExcel',
  removeOffs: 'admin/off/remove',

  // TICKET API
  fetchAllTickets: 'admin/ticket/getRequests',
  fetchTicket: 'admin/ticket/getRequest/',
  closeTicketRequest: 'admin/ticket/rejectRequests',
  removeTickets: 'admin/ticket/remove',

  // CONFIG MANAGEMENT API
  fetchAllAvatars: 'admin/config/avatar/getAll',
  addAvatar: 'admin/config/avatar/add',
  deleteAvatar: 'admin/config/avatar/delete/',
  editAvatar: 'admin/config/avatar/edit/',
  setAvatarAsDefault: 'admin/config/avatar/setDefault/',

  // BUY REPORTS API
  buyReport: 'admin/report/buyersReport',

  // COMMENT API
  getAllComments: 'comment/admin/getComments',
  setCommentStatus: 'comment/admin/setCommentStatus/',
  toggleTopStatus: 'comment/admin/toggleTopStatus/',
  getCommentsCount: 'comment/admin/getCommentsCount/',
  getListOfPackageLevels: 'admin/package_level/list',
  storePackageLevel: 'admin/package_level/store',
  updatePackageLevel: 'admin/package_level/update/',
  removePackageLevel: 'admin/package_level/remove/',

  // PACKAGE_CONTENT API
  contentBuyers: 'package_content/admin/buyers/',
  contentForceRegistry: 'package_content/admin/force_registry/',
  contentForceFire: 'package_content/admin/forceFire/',
  getAllCotents: 'package_content/admin/allContents',
  findMissed: 'package_content/admin/findMissed',

  // CV API
  cropAndAddQuestionsToQuiz: 'admin/cv_question/cropAndAddQuestionsToQuiz/',

  // QUIZ API
  quizDigests: 'admin/quiz/digests',

  // CONFIG API
  getAdminDashboardConfig: 'admin/dashboard/getConfig',
  setAdminDashboardConfig: 'admin/dashboard/setConfig',

  // ADVISOR API
  fetchAdvisorGeneralInfo: 'admin/advisor/generalInfo/',
  getAllAdvisorsDigest: 'admin/advisor/getAllAdvisorsDigest',
  createAdviceTagsReport: 'admin/advice_tag_report/createReportTag',
  editAdviceTagsReport: 'admin/advice_tag_report/editReportTag/',
  removeAdviceTagsReport: 'admin/advice_tag_report/removeTags',
  getAdviceTagsReport: 'admin/advice_tag_report/getAllReportTags',
  setAdviceReportAsSeen: 'admin/advice_tag_report/setReportAsSeen/',
  getAdviceReports: 'admin/advice_tag_report/getAdviceReports',

  // TEACH API
  getAdvisorIRYSCPercent: 'teach/admin/getAdvisorIRYSCPercent/',
  setAdvisorIRYSCPercent: 'teach/admin/setAdvisorIRYSCPercent/',
  getTeachTagsReport: 'teach/admin/getAllReportTags',
  getTeachSchedulesForAdmin: 'teach/admin/getSchedules',
  createTeachTagsReport: 'teach/admin/createReportTag',
  removeTeachTagsReport: 'teach/admin/removeTags',
  editTeachReportTag: 'teach/admin/editReportTag/',
  getTeachReportsForAdmin: 'teach/admin/getTeachReports',
  getAllTeachersDigest: 'teach/admin/getAllTeachersDigest',
  setTeachReportAsSeen: 'teach/admin/setTeachReportAsSeen/',
  getAllTeachTransactions: 'teach/admin/getTransactions',
};
