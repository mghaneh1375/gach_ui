import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../../../api/utility';
import {showSuccess} from '@/services/utility';
import commonTranslator from '@/translator/common';
export const filter = async (token, kind, grade, state, city, hasUser) => {
  const query = new URLSearchParams();
  if (kind !== undefined && kind !== 'all') query.append('kind', kind);
  if (grade !== undefined && grade !== 'all') query.append('grade', grade);
  if (city !== undefined) query.append('city', city.id);
  if (state !== undefined) query.append('state', state.id);
  if (hasUser !== undefined && hasUser !== 'all')
    query.append('hasUser', hasUser);
  const res = await generalRequest(
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
export const create = async (data, setLoading, token, afterAdd) => {
  const postData = data;
  if (postData.city !== undefined) {
    postData.cityId = postData.city.id;
    postData.city = undefined;
  }
  setLoading(true);
  const res = await generalRequest(
    routes.addSchool,
    'post',
    data,
    'id',
    token,
    mandatoryFields,
  );
  setLoading(false);
  if (res !== undefined) {
    data.id = res;
    showSuccess(commonTranslator.success);
    afterAdd(data);
  }
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
        afterUpdate(tableData);
        showSuccess(commonTranslator.success);
      }
    })
    .catch(x => {
      setLoading(false);
    });
};
