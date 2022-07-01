export const routes = {
  whichKindOfAuthIsAvailable: 'user/whichKindOfAuthIsAvailable?NID=',
  forgetPassword: 'user/forgetPassword',
  resetPassword: 'user/resetPassword',
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
  forceRegistry: 'quiz/manage/forceRegistry/',
  forceDeportation: 'quiz/manage/forceDeportation/',
  fetchQuestions: 'quiz/manage/fetchQuestions/',
  addBatchQuestionsToQuiz: 'quiz/manage/addBatchQuestionsToQuiz/',
  addBatchQuestions: 'admin/question/addBatch',
  addBatchFiles: 'admin/general/uploadFiles/',
};
