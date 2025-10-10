import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {CommonWebBox} from '@/styles/CommonComponents.jsx';
import React, {useState} from 'react';
import {generalRequest} from '@/api/utility.js';
import {routes} from '@/api/apiRoutes';
import Teacher from './Teacher.jsx';
function Teachers(props) {
  const [teachers, setTeachers] = useState();
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const fetchData = React.useCallback(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.distinctTeachersContentsForAdmin,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] == null) props.navigate('/');
      setTeachers(res[0]);
    });
  }, [state, dispatch, props]);
  useEffectOnce(() => {
    fetchData();
  });
  const [state, dispatch] = useGlobalState();
  const setLoading = new_statue => {
    dispatch({
      loading: new_statue,
    });
  };
  return (
    <CommonWebBox>
      {teachers !== undefined &&
        teachers.map((e, index) => {
          return (
            <Teacher
              key={index}
              token={state.token}
              name={e.teacher}
              nid={e.nid}
              bio={e.bio}
              setLoading={setLoading}
            />
          );
        })}
    </CommonWebBox>
  );
}
export default Teachers;
