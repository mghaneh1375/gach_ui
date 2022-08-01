export const routes = {
  whichKindOfAuthIsAvailable: 'user/whichKindOfAuthIsAvailable?NID=',
  forgetPassword: 'user/forgetPassword',
  resetPassword: 'user/resetPassword',
  signIn: 'user/signIn',
  signup: 'user/signUp',
  activate: 'user/activate',
  resendCode: 'user/resendCode',
  updateInfo: 'user/updateInfo/',
  fetchUser: 'user/fetchUser/',
  checkCode: 'user/checkCode',
  getRoleForms: 'user/getRoleForms',
  sendRoleForm: 'user/sendRoleForm/',
  updateUsername: 'user/updateUsername/',
  setUsername: 'user/setNewUsername',
  changePass: 'user/changePassword/',
  logout: 'user/logout',
  adminLogin: 'admin/user/signIn/',
  fetchTinyUser: 'admin/user/fetchTinyUser?',
  addAccess: 'admin/user/addAccess/',
  removeAccess: 'admin/user/removeAccess/',
  toggleStatus: 'admin/user/toggleStatus/',
  fetchState: 'general/fetchStates',
  fetchNewAlerts: 'general/getNewAlerts',
  fetchSchoolsDigest: 'general/fetchSchoolsDigest',
  fetchGrades: 'admin/content/grades',
  fetchLesson: 'admin/content/lessons',
  fetchGradeLessons: 'admin/content/gradeLessons',
  addLesson: 'admin/content/addLesson/',
  editLesson: 'admin/content/updateLesson/',
  removeLessons: 'admin/content/deleteLessons',
  removeSubjects: 'admin/content/deleteSubjects',
  addBatchSubjects: 'admin/content/addBatch',
  addSubject: 'admin/content/addSubject/',
  editSubject: 'admin/content/updateSubject/',
  fetchSubjects: 'admin/content/all',
  fetchGradesAndBranches: 'admin/content/gradesAndBranches',
  removeGrades: 'admin/content/deleteGrades',
  addGrade: 'admin/content/addGrade',
  editGrade: 'admin/content/updateGrade/',
  addBranch: 'admin/content/addBranch',
  editBranch: 'admin/content/updateBranch/',
  fetchBranches: 'admin/content/branches',
  uploadQuizAttaches: 'ckeditor/quiz',
  fetchIRYSCRegistrableQuizzes: 'quiz/public/get/irysc',
  createQuiz: 'quiz/manage/store/',
  fetchAllQuiz: 'quiz/manage/getAll/regular',
  fetchQuizTags: 'quiz/manage/getDistinctTags',
  fetchIRYSCQuiz: 'quiz/manage/get/irysc/',
  fetchSchoolQuiz: 'quiz/manage/get/school/',
  editQuiz: 'quiz/manage/edit/',
  fetchQuizAnswerSheets: 'quiz/manage/getQuizAnswerSheets/',
  setQuizAnswerSheet: 'quiz/manage/setQuizAnswerSheet/',
  correct: 'quiz/manage/correct/10/2/30/70/4/',
  updateQuestionMark: 'quiz/manage/updateQuestionMark/',
  removeIRYSCQuiz: 'quiz/manage/remove/irysc/',
  removeSchoolQuiz: 'quiz/manage/remove/school/',
  generateQuestionPDF: 'quiz/manage/generateQuestionPDF/',
  getIRYSCParticipants: 'quiz/manage/getParticipants/irysc/',
  getSchoolParticipants: 'quiz/manage/getParticipants/school/',
  removeQuestionFromQuiz: 'quiz/manage/removeQuestionFromQuiz/',
  forceRegistry: 'quiz/manage/forceRegistry/',
  forceDeportation: 'quiz/manage/forceDeportation/',
  fetchQuestions: 'quiz/manage/fetchQuestions/',
  addBatchQuestionsToQuiz: 'quiz/manage/addBatchQuestionsToQuiz/',
  addQuestionToQuizzes: 'quiz/manage/addQuestionToQuizzes/',
  fetchAllPackages: 'quiz/manage/getPackages',
  fetchPackageQuizzes: 'quiz/manage/getPackageQuizzes/',
  removePackages: 'quiz/manage/removePackages',
  createPackage: 'quiz/manage/createPackage',
  updatePackage: 'quiz/manage/updatePackage/',
  addQuizzesToPackage: 'quiz/manage/addQuizzesToPackage/',
  removeQuizzesFromPackage: 'quiz/manage/removeQuizzesFromPackage/',
  addBatchQuestions: 'admin/question/addBatch',
  removeQuestion: 'admin/question/remove',
  getSubjectQuestions: 'admin/question/subjectQuestions',
  addBatchFiles: 'admin/general/uploadFiles/',
  fetchAllOffs: 'admin/off/offs',
  storeOffs: 'admin/off/store',
  updateOff: 'admin/off/update/',
  storeOffsWithExcel: 'admin/off/storeWithExcel',
  removeOffs: 'admin/off/remove',
  fetchAllTickets: 'admin/ticket/getRequests',
  fetchMyTickets: 'ticket/getMyRequests',
  fetchTicket: 'admin/ticket/getRequest/',
  submitTicket: 'ticket/submit',
  setAnswerTicket: 'ticket/setAnswer/',
  sendTicket: 'ticket/sendRequest/',
  addFileToTicket: 'ticket/addFileToRequest/',
  closeTicketRequest: 'admin/ticket/rejectRequests',
  removeTickets: 'admin/ticket/remove',
  fetchAllUsers: 'admin/user/fetchTinyUser',
  fetchAllAvatars: 'admin/config/avatar/getAll',
  addAvatar: 'admin/config/avatar/add',
  deleteAvatar: 'admin/config/avatar/delete/',
  editAvatar: 'admin/config/avatar/edit/',
  setAvatarAsDefault: 'admin/config/avatar/setDefault/',
  setAvatarAsMyPic: 'user/setAvatar/',
  getAllConfiguration: 'admin/config/config/getAll',
  updateConfiguration: 'admin/config/config/update',
  fetchSchools: 'admin/config/school/fetchSchools',
  removeSchools: 'admin/config/school/remove',
  addSchool: 'admin/config/school/add',
  editSchool: 'admin/config/school/edit/',
  createAuthor: 'admin/config/author/store',
  getAllAuthors: 'admin/config/author/get',
  editAuthor: 'admin/config/author/edit/',
  removeAuthors: 'admin/config/author/remove',
  getAuthorTransactions: 'admin/config/author/getTransactions/',
  getAuthorLastTransaction: 'admin/config/author/getLastTransaction/',
  createAuthorTransaction: 'admin/config/author/addTransaction/',
  removeAuthorTransactions: 'admin/config/author/removeTransactions/',
};
