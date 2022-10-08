import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';

export const filter = async (token, kind, grade, state, city, hasUser) => {
  let query = new URLSearchParams();

  if (kind !== undefined && kind !== 'all') query.append('kind', kind);

  if (grade !== undefined && grade !== 'all') query.append('grade', grade);

  if (city !== undefined) query.append('city', city.id);

  if (state !== undefined) query.append('state', state.id);

  if (hasUser !== undefined && hasUser !== 'all')
    query.append('hasUser', hasUser);

  let res = await generalRequest(
    routes.fetchSchools + '?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );

  if (res !== null) return res;

  return null;
};

const mandatoryFields = ['name', 'cityId', 'grade', 'kind'];

export const create = (data, setLoading, token, afterAdd) => {
  let postData = data;
  if (postData.city !== undefined) {
    postData.cityId = postData.city.id;
    postData.city = undefined;
  }
  setLoading(true);
  Promise.all([
    generalRequest(
      routes.addSchool,
      'post',
      data,
      'id',
      token,
      mandatoryFields,
    ),
  ])
    .then(res => {
      setLoading(false);
      if (res[0] !== undefined) {
        data.id = res[0];
        afterAdd(data);
        showSuccess(commonTranslator.success);
      }
    })
    .catch(x => {
      setLoading(false);
    });
};

export const update = (id, tableData, data, setLoading, token, afterUpdate) => {
  setLoading(true);
  Promise.all([
    generalRequest(
      routes.editSchool + id,
      'put',
      data,
      undefined,
      token,
      mandatoryFields,
    ),
  ])
    .then(res => {
      setLoading(false);
      if (res[0] !== null) {
        console.log(tableData);
        afterUpdate(tableData);
        showSuccess(commonTranslator.success);
      }
    })
    .catch(x => {
      setLoading(false);
    });
};
