import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonWebBox, MyView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {courseContext, dispatchCourseContext} from './Context';
// import columns from './tableCourse';

function List(props) {
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
      generalRequest(routes.getAllTags, 'get', undefined, 'data', props.token),
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
      header={' جلسات مشاوره '}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {state.tags && (
        <CommonDataTable
          removeUrl={routes.removeTag}
          columns={columns}
          data={state.tags}
          token={props.token}
          setLoading={props.setLoading}
        />
      )}
    </CommonWebBox>
  );
}

export default List;