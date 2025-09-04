import React, {useEffect, useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {CommonWebBox} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {translator} from '../translate';
import {badgeContext, dispatchBadgeContext} from './Context';
import columns from './columns';
import {generalRequest} from '../../../../API/Utility';
import Ops from './Ops';
import {showSuccess} from '../../../../services/Utility';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const useGlobalState = () => [
    React.useContext(badgeContext),
    React.useContext(dispatchBadgeContext),
  ];
  const [state, dispatch] = useGlobalState();

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };
  const handleOp = (idx, row) => {
    dispatch({selectedBadge: row});
    setSelectedId(row.id);
    toggleShowOpPopUp();
  };

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getAllBadges,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) props.navigate('/');
      dispatch({badges: res[0]});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.badges === undefined) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.badges]);

  return (
    <CommonWebBox
      header={translator.badges}
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
            dispatch({badges: state.badges.filter(e => e.id !== selectedId)});
            toggleShowOpPopUp();
            showSuccess();
          }}
        />
      )}
      {state.badges && (
        <CommonDataTable
          columns={columns}
          data={state.badges}
          handleOp={handleOp}
          excel={false}
        />
      )}
    </CommonWebBox>
  );
}

export default List;
