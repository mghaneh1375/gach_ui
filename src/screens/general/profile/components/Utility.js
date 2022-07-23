import {routes} from '../../../../API/APIRoutes';
import {fetchUser, removeAuthCache, setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {Device} from '../../../../models/Device';
import {getDevice, showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../tranlates/Common';
import translator from '../translate';

const changePassMandatoryFields = ['oldPass', 'newPass', 'confirmNewPass'];
const changeUsernameMandatoryFields = ['username', 'mode'];
const changeInfoMandatoryFields = [
  'firstName',
  'lastName',
  'schoolId',
  'gradeId',
  'cityId',
  'NID',
  'sex',
];

export const changePass = async (
  setLoading,
  token,
  navigate,
  userId,
  oldPass,
  pass,
  rpass,
) => {
  setLoading(true);

  let res = await generalRequest(
    userId !== undefined ? routes.changePass + userId : routes.changePass,
    'post',
    {
      oldPass: oldPass,
      newPass: pass,
      confirmNewPass: rpass,
    },
    undefined,
    token,
    changePassMandatoryFields,
  );

  setLoading(false);

  if (res) {
    if (userId === undefined) {
      showSuccess(translator.changePassSuccessfully);
      removeAuthCache();
      const isApp = getDevice().indexOf(Device.App) !== -1;
      setTimeout(function () {
        navigate(isApp ? 'Login' : '/login');
      }, 2000);
    } else showSuccess(commonTranslator.success);
  }
};

export const changeUsername = async (
  setLoading,
  token,
  userId,
  mode,
  newUsername,
) => {
  setLoading(true);

  let res = await generalRequest(
    userId !== undefined
      ? routes.updateUsername + userId
      : routes.updateUsername,
    'post',
    {
      mode: mode,
      username: newUsername,
    },
    userId === undefined ? ['token', 'reminder'] : undefined,
    token,
    changeUsernameMandatoryFields,
  );

  setLoading(false);
  return res;
};

export const fetchAvatars = async (setLoading, token) => {
  setLoading(true);
  let res = await generalRequest(
    routes.fetchAllAvatars,
    'get',
    undefined,
    'data',
    token,
  );
  setLoading(false);
  return res;
};

export const updateUserPic = async (
  newFilename,
  isAdmin,
  user,
  passedUser,
  setUser,
) => {
  if (user === undefined || isAdmin) return;
  let u = user;
  u.pic = newFilename;
  let newUserModel = passedUser;
  newUserModel.user = u;
  await setCacheItem('user', JSON.stringify(newUserModel));
  setUser(newUserModel);
};

export const getPreRequirements = async (
  setLoading,
  setStates,
  setGrades,
  setBranches,
  setSchools,
) => {
  setLoading(true);

  Promise.all([
    generalRequest(routes.fetchState, 'get', undefined, 'data'),
    generalRequest(routes.fetchGrades, 'get', undefined, 'data'),
    generalRequest(routes.fetchBranches, 'get', undefined, 'data'),
    generalRequest(routes.fetchSchoolsDigest, 'get', undefined, 'data'),
  ]).then(res => {
    setLoading(false);
    if (res[0] !== null) setStates(res[0]);
    if (res[1] !== null) setGrades(res[1]);
    if (res[2] !== null) setBranches(res[2]);
    if (res[3] !== null) setSchools(res[3]);
  });
};

export const updateInfo = async (setLoading, token, userId, data) => {
  setLoading(true);

  let res = await generalRequest(
    userId !== undefined ? routes.updateInfo + userId : routes.updateInfo,
    'post',
    data,
    undefined,
    token,
    changeInfoMandatoryFields,
  );

  if (res !== null) {
    if (userId === undefined) {
      setCacheItem('user', undefined);
      fetchUser(token, user => {
        setLoading(false);
        showSuccess(commonTranslator.success);
      });
    } else {
      setLoading(false);
      showSuccess(commonTranslator.success);
    }
  } else setLoading(false);
};

export const updateForm = async (token, userId, data) => {
  let res = await generalRequest(
    userId !== undefined ? routes.sendRoleForm + userId : routes.sendRoleForm,
    'post',
    data,
    undefined,
    token,
  );
  return res;
};
