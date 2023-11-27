import React from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {courseContext, dispatchCourseContext} from './Context';

function ListExamTags(props) {
  const useGlobalState = () => [
    React.useContext(courseContext),
    React.useContext(dispatchCourseContext),
  ];

  const [state, dispatch] = useGlobalState();

  const columns = [
    {
      name: 'عنوان',
      selector: row => row.label,
      grow: 3,
      center: true,
    },
  ];

  const fetchData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getAllExamTags,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      dispatch({tags: res[0]});
    });
  }, [props, dispatch]);

  useEffectOnce(() => {
    if (state.tags !== undefined) return;
    fetchData();
  }, [state.tags, fetchData]);

  return (
    <CommonWebBox
      header={' آزمون‌ها '}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {state.tags && (
        <CommonDataTable
          removeUrl={routes.removeExamTags}
          columns={columns}
          data={state.tags}
          token={props.token}
          setLoading={props.setLoading}
        />
      )}
    </CommonWebBox>
  );
}

export default ListExamTags;
