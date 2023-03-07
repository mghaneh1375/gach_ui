import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {questionReportContext, dispatchQuestionReportContext} from './Context';
import columns from './TableStructure';

function List(props) {
  const useGlobalState = () => [
    React.useContext(questionReportContext),
    React.useContext(dispatchQuestionReportContext),
  ];

  const [state, dispatch] = useGlobalState();

  const fetchData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.getQuestionReportTags,
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
      header={' تگ های خرابی سوال '}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {state.tags !== undefined && (
        <CommonDataTable
          removeUrl={routes.removeQuestionReportTags}
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
