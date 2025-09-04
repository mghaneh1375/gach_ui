import React, {useEffect, useState} from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import {dispatchPointContext, pointContext} from './Context';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './columns';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import Ops from './Ops';
import translator from '../translator';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const useGlobalState = () => [
    React.useContext(pointContext),
    React.useContext(dispatchPointContext),
  ];
  const [state, dispatch] = useGlobalState();
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = (idx, row) => {
    dispatch({selectedPoint: row});
    setSelectedId(row.id);
    toggleShowOpPopUp();
  };

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getAllPoints,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) props.navigate('/');
      dispatch({points: res[0]});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.points === undefined) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.points]);

  return (
    <CommonWebBox
      header={translator.points}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {showOpPopUp && (
        <Ops
          id={selectedId}
          toggleShowPopUp={() => toggleShowOpPopUp()}
          token={props.token}
          setLoading={props.setLoading}
          setMode={props.setMode}
          onRemove={() => {
            dispatch({points: state.points.filter(e => e.id !== selectedId)});
            toggleShowOpPopUp();
            showSuccess();
          }}
        />
      )}
      {state.points && (
        <CommonDataTable
          columns={columns}
          data={state.points}
          handleOp={handleOp}
          excel={false}
        />
      )}
    </CommonWebBox>
  );
}

export default List;
