import React, {useEffect, useState} from 'react';
import {CommonWebBox} from '../../../../styles/Common';
import {dispatchLevelContext, levelContext} from './Context';
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
    React.useContext(levelContext),
    React.useContext(dispatchLevelContext),
  ];
  const [state, dispatch] = useGlobalState();
  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = (idx, row) => {
    dispatch({selectedLevel: row});
    setSelectedId(row.id);
    toggleShowOpPopUp();
  };

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getAllLevels,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) props.navigate('/');
      dispatch({levels: res[0]});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.levels === undefined) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.levels]);

  return (
    <CommonWebBox
      header={translator.levels}
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
            dispatch({levels: state.levels.filter(e => e.id !== selectedId)});
            toggleShowOpPopUp();
            showSuccess();
          }}
        />
      )}
      {state.levels && (
        <CommonDataTable
          columns={columns}
          data={state.levels}
          handleOp={handleOp}
          excel={false}
        />
      )}
    </CommonWebBox>
  );
}

export default List;
