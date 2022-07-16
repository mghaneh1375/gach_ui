export const routes = {
  whichKindOfAuthIsAvailable: 'user/whichKindOfAuthIsAvailable?NID=',
  forgetPassword: 'user/forgetPassword',
  resetPassword: 'user/resetPassword',
  signIn: 'user/signIn',
  signup: 'user/signUp',
  activate: 'user/activate',
  resendCode: 'user/resendCode',
  updateInfo: 'user/updateInfo',
  fetchUser: 'user/fetchUser',
  checkCode: 'user/checkCode',
  sendRoleForm: 'user/sendRoleForm',
  updateUsername: 'user/updateUsername',
  setUsername: 'user/setNewUsername',
  changePass: 'user/changePassword',
  logout: 'user/logout',
  fetchTinyUser: 'admin/user/fetchTinyUser?',
  addAccess: 'admin/user/addAccess/',
  fetchState: 'general/fetchStates',
  fetchSchoolsDigest: 'general/fetchSchoolsDigest',
  fetchGrades: 'admin/content/grades',
  fetchBranches: 'admin/content/branches',
  uploadQuizAttaches: 'ckeditor/quiz',
  createQuiz: 'quiz/manage/store/',
  fetchAllQuiz: 'quiz/manage/getAll/regular',
  fetchIRYSCQuiz: 'quiz/manage/get/irysc/',
  fetchSchoolQuiz: 'quiz/manage/get/school/',
  editQuiz: 'quiz/manage/edit/',
  removeIRYSCQuiz: 'quiz/manage/remove/irysc/',
  removeSchoolQuiz: 'quiz/manage/remove/school/',
  getIRYSCParticipants: 'quiz/manage/getParticipants/irysc/',
  getSchoolParticipants: 'quiz/manage/getParticipants/school/',
  removeQuestionFromQuiz: 'quiz/manage/removeQuestionFromQuiz/',
  forceRegistry: 'quiz/manage/forceRegistry/',
  forceDeportation: 'quiz/manage/forceDeportation/',
  fetchQuestions: 'quiz/manage/fetchQuestions/',
  addBatchQuestionsToQuiz: 'quiz/manage/addBatchQuestionsToQuiz/',
  addBatchQuestions: 'admin/question/addBatch',
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
};
