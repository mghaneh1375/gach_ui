import React, {useEffect, useState} from 'react';
import {dispatchExchangeContext, exchangeContext} from './Context';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonWebBox} from '../../../../styles/Common';
import translator from './translator';
import {showSuccess} from '../../../../services/Utility';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './columns';
import Ops from './Ops';

function List(props) {
  const [showOpPopUp, setShowOpPopUp] = useState(false);
  const [selectedId, setSelectedId] = useState();

  const useGlobalState = () => [
    React.useContext(exchangeContext),
    React.useContext(dispatchExchangeContext),
  ];
  const [state, dispatch] = useGlobalState();

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const handleOp = (idx, row) => {
    setSelectedId(row.id);
    toggleShowOpPopUp();
  };

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getAllExchanges,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) props.navigate('/');
      dispatch({exchanges: res[0]});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.exchanges === undefined) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.exchanges]);

  return (
    <CommonWebBox
      header={translator.exchanges}
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
            dispatch({
              badges: state.exchanges.filter(e => e.id !== selectedId),
            });
            toggleShowOpPopUp();
            showSuccess();
          }}
        />
      )}
      {state.exchanges && (
        <CommonDataTable
          columns={columns}
          data={state.exchanges}
          handleOp={handleOp}
          excel={false}
          paginate={false}
        />
      )}
    </CommonWebBox>
  );
}

export default List;
