export const routes = {
  whichKindOfAuthIsAvailable: 'user/whichKindOfAuthIsAvailable?NID=',
  forgetPassword: 'user/forgetPassword',
  resetPassword: 'user/resetPassword',
  signIn: 'user/signIn',
  signup: 'user/signUp',
  getMySummary: 'general/getMySummary',
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
  getSubjectsKeyVals: 'admin/content/getSubjectsKeyVals',
  getTagsKeyVals: 'general/getTagsKeyVals',
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
  changeArrangeQuestions: 'quiz/manage/arrangeQuestions/',
  fetchAllQuiz: 'quiz/manage/getAll/regular',
  fetchQuiz: 'quiz/manage/get/',
  fetchQuizTags: 'quiz/manage/getDistinctTags',
  fetchIRYSCQuiz: 'quiz/manage/get/irysc/',
  fetchSchoolQuiz: 'quiz/manage/get/school/',
  editQuiz: 'quiz/manage/edit/',
  buyQuiz: 'quiz/public/buy',
  fetchMyQuizzes: 'quiz/public/myQuizzes/',
  reviewQuiz: 'quiz/public/reviewQuiz/',
  doQuiz: 'quiz/public/launch/',
  storeStudentAnswers: 'quiz/public/storeAnswers/',
  resetStudentQuizEntryTime: 'quiz/manage/resetStudentQuizEntryTime/',
  fetchParticipantReport: 'quiz/report/participantReport/',
  fetchAuthorReport: 'quiz/report/authorReport/',
  fetchSchoolReport: 'quiz/report/schoolReport/',
  fetchCityReport: 'quiz/report/cityReport/',
  fetchStateReport: 'quiz/report/stateReport/',
  fetchGenderReport: 'quiz/report/genderReport/',
  fetchQuizAnswerSheet: 'quiz/manage/getQuizAnswerSheet/',
  fetchStudentAnswerSheet: 'quiz/manage/getStudentAnswerSheet/',
  fetchMyAnswerSheet: 'quiz/public/getMyAnswerSheet/',
  fetchQuizAnswerSheets: 'quiz/manage/getQuizAnswerSheets/',
  fetchQuizRanking: 'quiz/report/showRanking/',
  fetchQuizKarname: 'quiz/report/getStudentStat/',
  setQuizAnswerSheet: 'quiz/manage/setQuizAnswerSheet/',
  storeAnswers: 'quiz/manage/storeAnswers/',
  correct: 'quiz/manage/correct/10/2/30/70/4/',
  createTaraz: 'quiz/manage/createTaraz/',
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
  getRecpForQuiz: 'quiz/public/getRecpForQuiz/',
  addQuizzesToPackage: 'quiz/manage/addQuizzesToPackage/',
  removeQuizzesFromPackage: 'quiz/manage/removeQuizzesFromPackage/',
  addQuestion: 'admin/question/store/',
  editQuestion: 'admin/question/edit/',
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
  removeStudents: 'admin/user/removeStudents',
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
  getAuthorsKeyVals: 'admin/config/author/getAuthorsKeyVals',
  editAuthor: 'admin/config/author/edit/',
  removeAuthors: 'admin/config/author/remove',
  getAuthorTransactions: 'admin/config/author/getTransactions/',
  getAuthorLastTransaction: 'admin/config/author/getLastTransaction/',
  createAuthorTransaction: 'admin/config/author/addTransaction/',
  removeAuthorTransactions: 'admin/config/author/removeTransactions/',
  getGiftConfig: 'admin/config/gift/getConfig',
  getAllGift: 'admin/config/gift/get',
  removeGift: 'admin/config/gift/remove',
  addGift: 'admin/config/gift/store',
  editGift: 'admin/config/gift/edit/',
  updateGiftConfig: 'admin/config/config/update',
  checkDuplicate: 'admin/user/checkDuplicate',
  acceptInvite: 'admin/user/acceptInvite/',
  addSchoolByAgent: 'admin/user/addSchool',
  removeSchoolFormAgent: 'admin/user/removeSchools',
  getAllAgent: 'admin/user/getMySchools',
  fetchAllTarazLevels: 'admin/config/tarazLevel/get',
  createTarazLevel: 'admin/config/tarazLevel/create',
  updateTarazLevel: 'admin/config/tarazLevel/edit/',
  removeTarazLevels: 'admin/config/tarazLevel/remove',
  getAllStudent: 'admin/user/getStudents',
  addStudents: 'admin/user/addStudent',
  checkOffCode: 'general/checkOffCode',
  getTransactions: 'admin/transaction/get?',
  getMyOffs: 'general/myOffs',
  chargeAccount: 'general/chargeAccount',
  fetchInvoice: 'general/fetchInvoice/',
  getQuestionTagsExcel: 'general/getQuestionTagsExcel',
  addCertificate: 'certificate/admin/store',
  setCertificateImg: 'certificate/admin/setImg/',
  getSubjectCodesExcel: 'general/getSubjectCodesExcel',
  addUserToCert: 'certificate/admin/addUserToCert/',
  getCertificate: 'certificate/admin/get/',
  fetchAllCertificate: 'certificate/admin/getAll',
};
