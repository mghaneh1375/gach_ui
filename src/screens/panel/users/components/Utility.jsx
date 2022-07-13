import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const filter = (props, status) => {
  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.fetchAllUsers,
      'get',
      undefined,
      'users',
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] == null) {
      props.navigate('/');
      return;
    }
    props.setData(res[0]);
  });
};
