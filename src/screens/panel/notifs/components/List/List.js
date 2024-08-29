import React, {useState} from 'react';
import {dispatchNotifContext, notifContext} from '../Context';
import {routes} from '../../../../../API/APIRoutes';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import Translator from '../../Translate';
import {fetchAllNotifs} from '../Utility';
import Ops from './Ops';
import columns from './TableStructure';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';

function List(props) {
  const useGlobalState = () => [
    React.useContext(notifContext),
    React.useContext(dispatchNotifContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);
  const [from, setFrom] = useState(Date.now() - 2592000000);
  const [to, setTo] = useState();

  const fetchData = React.useCallback(() => {
    props.setLoading(true);

    Promise.all([fetchAllNotifs(props.token, props.sendVia, from, to)]).then(
      res => {
        props.setLoading(false);
        if (res[0] === null) return props.navigate('/');
        dispatch({notifs: res[0]});
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  React.useEffect(() => {
    if (state.notifs === undefined) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.notifs]);

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
          <>
            <PhoneView style={{gap: '10px'}}>
              <JustBottomBorderDatePicker
                value={from}
                setter={setFrom}
                placeholder={'تاریخ آغاز فیلتر'}
                subText={'تاریخ آغاز فیلتر'}
              />
              <JustBottomBorderDatePicker
                value={to}
                setter={setTo}
                placeholder={'تاریخ پایان فیلتر'}
                subText={'تاریخ پایان فیلتر'}
              />
            </PhoneView>
            <CommonButton onPress={() => fetchData()} title={'اعمال فیلتر'} />
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
          </>
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default List;
