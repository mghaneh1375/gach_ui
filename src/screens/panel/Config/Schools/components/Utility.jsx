import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../tranlates/Common';

export const filter = (props, kind, grade, city) => {
  let query = new URLSearchParams();

  if (kind !== undefined && kind !== 'all') query.append('kind', kind);

  if (grade !== undefined && grade !== 'all') query.append('grade', grade);

  if (city !== undefined && city !== 'all') query.append('city', city);

  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.fetchSchools + '?' + query.toString(),
      'get',
      undefined,
      'data',
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) props.setData(res[0]);
    else props.navigate('/');
  });
};

const mandatoryFields = ['name', 'cityId', 'grade', 'kind'];

export const create = (data, setLoading, token, afterAdd) => {
  let postData = data;
  if (postData.city !== undefined) {
    postData.cityId = postData.city.id;
    postData.city = undefined;
  }

  console.log(postData);
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
