import React, {useState} from 'react';
import {dispatchNotifContext, notifContext} from '../Context';
import {routes} from '../../../../../API/APIRoutes';
import {CommonWebBox, MyView} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Translator from '../../Translate';
import {fetchAllNotifs} from '../Utility';
import Ops from './Ops';
import columns from './TableStructure';

function List(props) {
  const useGlobalState = () => [
    React.useContext(notifContext),
    React.useContext(dispatchNotifContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [showOp, setShowOp] = useState(false);

  const fetchData = React.useCallback(() => {
    if (isWorking || state.notifs !== undefined) return;

    setIsWorking(true);
    props.setLoading(true);

    Promise.all([fetchAllNotifs(props.token, props.sendVia)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return props.navigate('/');
      dispatch({notifs: res[0]});
      setIsWorking(false);
    });
  }, [isWorking, state.notifs, dispatch, props]);

  React.useEffect(() => {
    if (state.notifs === undefined) fetchData();
  }, [state.notifs, fetchData]);

  const handleOp = (idx, row) => {
    dispatch({selectedNotif: state.notifs[idx]});
    setShowOp(true);
  };

  return (
    <MyView>
      {showOp && (
        <Ops
          setMode={props.setMode}
          toggleShowPopUp={() => setShowOp(!showOp)}
        />
      )}
      <CommonWebBox
        header={Translator.list}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        {state.notifs !== undefined && (
          <CommonDataTable
            removeUrl={routes.removeNotif}
            handleOp={handleOp}
            setLoading={props.setLoading}
            columns={columns}
            data={state.notifs}
            token={props.token}
            setData={newData => {
              dispatch({notifs: newData});
            }}
          />
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
