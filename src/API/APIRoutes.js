export const routes = {
  whichKindOfAuthIsAvailable: 'user/whichKindOfAuthIsAvailable?NID=',
  forgetPassword: 'user/forgetPassword',
  resetPassword: 'user/resetPassword',
  signIn: 'user/signIn',
  signup: 'user/signUp',
  buildSpinner: 'general/buildSpinner/',
  giveMyGift: 'general/giveMyGift',
  giveMyGifts: 'general/giveMyGifts',
  buildSpinnerAgain: 'general/buildSpinnerAgain/',
  checkCert: 'general/checkCert/',
  getMySummary: 'general/getMySummary',
  exchange: 'general/exchange',
  createOff: 'user/createOpenCardOff',
  activate: 'user/activate',
  resendCode: 'user/resendCode',
  updateInfo: 'user/updateInfo/',
  fetchUser: 'user/fetchUser/',
  checkCode: 'user/checkCode',
  getMyRecps: 'user/myTransactions',
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
  fetchSiteStats: 'general/getSiteStats',
  fetchRankingList: 'general/getRankingList/',
  fetchFinishedQuizzes: 'quiz/public/getFinishedQuizzes',
  fetchState: 'general/fetchStates',
  fetchNewAlerts: 'general/getNewAlerts',
  getMyAlerts: 'general/getMyAlerts',
  fetchSchoolsDigest: 'general/fetchSchoolsDigest',
  fetchContentDigests: 'general/fetchContentDigests',
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
  getQuestionAllFlags: 'general/getAllFlags',
  checkAvailableQuestions: 'general/checkAvailableQuestions',
  prepareCustomQuiz: 'quiz/public/prepareCustomQuiz',
  payCustomQuiz: 'quiz/public/payCustomQuiz/',
  fetchGradesAndBranches: 'admin/content/gradesAndBranches',
  removeGrades: 'admin/content/deleteGrades',
  addGrade: 'admin/content/addGrade',
  editGrade: 'admin/content/updateGrade/',
  addBranch: 'admin/content/addBranch',
  editBranch: 'admin/content/updateBranch/',
  fetchBranches: 'admin/content/branches',
  uploadQuizAttaches: 'ckeditor/quiz',
  fetchIRYSCRegistrableQuizzes: 'quiz/public/get/irysc',
  setCorrectorByStudentMode: 'quiz/manage/setCorrectorByStudentMode/',
  setCorrectorByQuestionMode: 'quiz/manage/setCorrectorByQuestionMode/',
  getQuizRecpForSchool: 'quiz/school/recp/',
  getQuizTotalPriceForSchool: 'quiz/school/getTotalPrice/',
  finalizeSchoolQuiz: 'quiz/school/finalize/',
  getMyMarkListForSpecificStudent:
    'quiz/school/getMyMarkListForSpecificStudent/',
  getMyMarks: 'quiz/school/getMyMarks/',
  getMyMarkListForSpecificQuestion:
    'quiz/school/getMyMarkListForSpecificQuestion/',
  setMark: 'quiz/school/setMark/',
  getMyTasks: 'quiz/school/getMyTasks',
  getMyMarkList: 'quiz/school/getMyMarkList/',
  createQuiz: 'quiz/manage/store/',
  changeArrangeQuestions: 'quiz/manage/arrangeQuestions/',
  finalizeQuizResult: 'quiz/manage/finalizeQuizResult/',
  fetchAllQuiz: 'quiz/manage/getAll/',
  fetchQuiz: 'quiz/manage/get/',
  fetchQuizTags: 'quiz/manage/getDistinctTags',
  editQuiz: 'quiz/manage/edit/',
  buyQuiz: 'quiz/public/buy',
  fetchPackage: 'quiz/manage/getPackage/',
  groupBuyQuiz: 'quiz/public/groupBuy',
  fetchMyQuizzes: 'quiz/public/myQuizzes/',
  fetchMySchoolQuizzes: 'quiz/public/mySchoolQuizzes',
  fetchMyCustomQuizzes: 'quiz/public/myCustomQuizzes/',
  reviewQuiz: 'quiz/public/reviewQuiz/',
  rateQuiz: 'quiz/public/rate/',
  doQuiz: 'quiz/public/launch/',
  getMySubmits: 'quiz/public/getMySubmits/',
  getMyQuestionPDF: 'quiz/public/getMyQuestionPDF/',
  getMyAnswerSheetPDF: 'quiz/public/getMyAnswerSheetPDF/',
  storeStudentAnswers: 'quiz/public/storeAnswers/',
  uploadStudentAnswers: 'quiz/public/uploadAnswers/',
  uploadStudentAnswersSheet: 'quiz/public/uploadAnswersSheet/',
  resetStudentQuizEntryTime: 'quiz/manage/resetStudentQuizEntryTime/',
  getLogs: 'quiz/manage/getLog/',
  fetchParticipantReport: 'quiz/report/participantReport/',
  fetchA1Report: 'quiz/report/A1/',
  fetchAuthorReport: 'quiz/report/authorReport/',
  fetchSchoolReport: 'quiz/report/schoolReport/',
  fetchKarnameReport: 'quiz/report/karnameReport/',
  fetchCityReport: 'quiz/report/cityReport/',
  fetchStateReport: 'quiz/report/stateReport/',
  fetchGenderReport: 'quiz/report/genderReport/',
  fetchQuizAnswerSheet: 'quiz/manage/getQuizAnswerSheet/',
  fetchStudentAnswerSheet: 'quiz/manage/getStudentAnswerSheet/',
  addCorrector: 'quiz/manage/addCorrector/',
  fetchQuizCorrectors: 'quiz/manage/getCorrectors/',
  fetchQuizCorrector: 'quiz/manage/getCorrector/',
  fetchMyAnswerSheet: 'quiz/public/getMyAnswerSheet/',
  fetchQuizAnswerSheets: 'quiz/manage/getQuizAnswerSheets/',
  fetchQuizRanking: 'quiz/report/showRanking/',
  fetchQuizKarname: 'quiz/report/getStudentStat/',
  setQuizAnswerSheet: 'quiz/manage/setQuizAnswerSheet/',
  storeAnswers: 'quiz/manage/storeAnswers/',
  correct: 'quiz/manage/correct/10/2/30/70/4/',
  CVCorrect: 'correct/',
  createTaraz: 'quiz/manage/createTaraz/',
  transferToOpenQuiz: 'quiz/manage/createFromIRYSCQuiz/',
  updateQuestionMark: 'quiz/manage/updateQuestionMark/',
  removeIRYSCQuiz: 'quiz/manage/remove/irysc/',
  removeOpenQuiz: 'quiz/manage/remove/open/',
  removeSchoolQuiz: 'quiz/manage/remove/school/',
  generateQuestionPDF: 'quiz/manage/generateQuestionPDF/',
  getParticipants: 'quiz/manage/getParticipants/',
  removeQuestionFromQuiz: 'quiz/manage/removeQuestionFromQuiz/',
  forceRegistry: 'quiz/manage/forceRegistry/',
  forceDeportation: 'quiz/manage/forceDeportation/',
  removeCorrectors: 'quiz/manage/removeCorrectors/',
  fetchQuestions: 'quiz/manage/fetchQuestions/',
  addBatchQuestionsToQuiz: 'quiz/manage/addBatchQuestionsToQuiz/',
  addQuestionToQuizzes: 'quiz/manage/addQuestionToQuizzes/',
  fetchAllPackages: 'quiz/manage/getPackages',
  fetchAllPackagesDigest: 'quiz/manage/getPackagesDigest',
  fetchPackageQuizzes: 'quiz/manage/getPackageQuizzes/',
  removePackages: 'quiz/manage/removePackages',
  createPackage: 'quiz/manage/createPackage',
  updatePackage: 'quiz/manage/updatePackage/',
  getRecpForQuiz: 'quiz/public/getRecpForQuiz/',
  addFileToQuiz: 'quiz/manage/addAttach/',
  removeFileToQuiz: 'quiz/manage/removeAttach/',
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
  removeUsers: 'admin/user/removeUsers',
  fetchAllUsers: 'admin/user/fetchTinyUser',
  fetchAllAvatars: 'admin/config/avatar/getAll',
  addAvatar: 'admin/config/avatar/add',
  deleteAvatar: 'admin/config/avatar/delete/',
  editAvatar: 'admin/config/avatar/edit/',
  setAvatarAsDefault: 'admin/config/avatar/setDefault/',
  setAvatarAsMyPic: 'user/setAvatar/',
  blockNotif: 'user/blockNotif/',
  getAllConfiguration: 'admin/config/config/getAll',
  getCertConfiguration: 'admin/config/config/getCert',
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
  giftReport: 'admin/config/gift/report',
  removeGift: 'admin/config/gift/remove',
  addGift: 'admin/config/gift/store',
  editGift: 'admin/config/gift/edit/',
  updateGiftConfig: 'admin/config/gift/updateConfig',
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
  chargeAccount: 'general/chargeAccount/',
  fetchInvoice: 'general/fetchInvoice/',
  getQuestionTagsExcel: 'general/getQuestionTagsExcel',
  issueMyCert: 'certificate/issueMyCert/',
  issueCert: 'certificate/issueCert/',
  verifyCert: 'certificate/verifyCert/',
  getMyCerts: 'certificate/getMyCerts/',
  addCertificate: 'certificate/admin/store',
  editCertificate: 'certificate/admin/update/',
  setCertificateImg: 'certificate/admin/setImg/',
  getAllCertsDigest: 'general/getAllCertsDigest',
  getAllQuizzesDigest: 'general/getAllQuizzesDigest',
  getAllContentQuizzesDigest: 'general/getAllContentQuizzesDigest',
  getSubjectCodesExcel: 'general/getSubjectCodesExcel',
  getAuthorCodesExcel: 'general/getAuthorCodesExcel',
  addUserToCert: 'certificate/admin/addUserToCert/',
  editUserInCert: 'certificate/admin/editUserInCert/',
  getCertificate: 'certificate/admin/get/',
  fetchAllCertificate: 'certificate/admin/getAll',
  removeCertificate: 'certificate/admin/remove',
  removeStudentsFromCertificate: 'certificate/admin/removeStudents/',
  rateContent: 'package_content/public/rate/',
  teacherPackages: 'package_content/public/teacherPackages?',
  fetchContents: 'package_content/public/getAll',
  fetchMyContents: 'package_content/public/getMy',
  fetchContent: 'package_content/public/get/',
  fetchSessions: 'package_content/public/getSessions/',
  getTeacherBio: 'package_content/public/getTeacherBio',
  getChapters: 'package_content/public/chapters/',
  removeContent: 'package_content/manage/remove/',
  contentBuyers: 'package_content/admin/buyers/',
  contentForceRegistry: 'package_content/admin/force_registry/',
  contentForceFire: 'package_content/admin/forceFire/',
  getAllCotents: 'package_content/admin/allContents',
  storeContent: 'package_content/manage/store',
  updateContent: 'package_content/manage/update/',
  changeVisibility: 'package_content/manage/changeVisibility/',
  updateSessionContent: 'package_content/manage/updateSession/',
  setImgContent: 'package_content/manage/setImg/',
  removeImgContent: 'package_content/manage/removeImg/',
  removeSessionImgContent: 'package_content/manage/removeSessionImg/',
  fetchSessionInContent: 'package_content/manage/fetchSessions/',
  addSessionToContent: 'package_content/manage/addSession/',
  copySessionInContent: 'package_content/manage/copySession/',
  setSessionVideo: 'package_content/manage/setSessionVideo/',
  removeVideoFromSession: 'package_content/manage/removeVideoFromSession/',
  addٰAttachToSession: 'package_content/manage/addٰAttachToSession/',
  removeAttachFromSession: 'package_content/manage/removeAttachFromSession/',
  removeSessionFromContent: 'package_content/manage/removeSession/',
  distinctTagsContents: 'package_content/public/distinctTags',
  buyContent: 'package_content/public/buy/',
  distinctTeachersContents: 'package_content/public/distinctTeachers',
  sessionVideoChunkFile: 'package_content/manage/sessionVideoChunkFile/',
  completeUploadSessionVideo:
    'package_content/manage/completeUploadSessionVideo/',
  addFAQ: 'package_content/faq/store',
  updateFAQ: 'package_content/faq/update/',
  removeFAQ: 'package_content/faq/remove/',
  getFAQ: 'package_content/faq/get/',
  addSeo: 'package_content/seo/store/',
  removeSeo: 'package_content/seo/remove/',
  getSeo: 'package_content/seo/get/',
  addAdv: 'package_content/adv/store',
  updateAdv: 'package_content/adv/update/',
  removeAdv: 'package_content/adv/remove/',
  getAdv: 'package_content/adv/getAll',
  setSeenNotif: 'notifs/setSeen/',
  fetchNotif: 'notifs/get/',
  addAttachToNotif: 'notifs/addAttach/',
  myNotifs: 'notifs/myNotifs',
  fetchAllNotifs: 'notifs/manage/getAll',
  getNotif: 'notifs/manage/get/',
  storeNotif: 'notifs/manage/store',
  simpleStoreNotif: 'notifs/manage/simpleStore',
  removeNotif: 'notifs/manage/remove/',
  getNotifStudents: 'notifs/manage/getStudents/',
  getQuestionReportTags: 'questionReport/manage/getAllTags',
  getQuestionReportSeen: 'questionReport/manage/setSeen/',
  getQuestionReportReports: 'questionReport/manage/getReports/',
  addQuestionReportTag: 'questionReport/manage/addTag',
  removeQuestionReportTags: 'questionReport/manage/remove',
  editQuestionReportTag: 'questionReport/manage/editTag/',
  getVisibleQuestionReportTags: 'questionReport/public/getAllTags',
  storeQuestionReport: 'questionReport/public/storeReport/',
  getAllTags: 'advisor/tag/getAllTags',
  getAllLife: 'advisor/tag/getAllLifeTags',
  removeTag: 'advisor/tag/removeTags',
  removeLife: 'advisor/tag/removeLifeTags',
  createTag: 'advisor/tag/createTag',
  createLifeTag: 'advisor/tag/createLifeTag',
  setPic: 'user/setPic',
};
