import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

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
