import React, {useState} from 'react';
import {dispatchNotifContext, notifContext} from '../Context.jsx';
import {routes} from '@/api/apiRoutes';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import Translator from '../../translate';
import {fetchAllNotifs} from '../utility';
import Ops from './Ops.jsx';
import columns from './tableStructure';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
function List(props) {
  const useGlobalState = () => [
    React.useContext(notifContext),
    React.useContext(dispatchNotifContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);
  const [from, setFrom] = useState(Date.now() - 2592000000);
  const [to, setTo] = useState();
  const [minUsersCount, setMinUsersCount] = useState(2);
  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      fetchAllNotifs(props.token, props.sendVia, from, to, minUsersCount),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return props.navigate('/');
      dispatch({
        notifs: res[0],
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to, minUsersCount]);
  React.useEffect(() => {
    if (state.notifs === undefined) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.notifs]);
  const handleOp = (idx, row) => {
    dispatch({
      selectedNotif: state.notifs[idx],
    });
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
            <PhoneView
              style={{
                gap: '10px',
              }}>
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
              <JustBottomBorderTextInput
                value={minUsersCount}
                onChangeText={e => setMinUsersCount(e)}
                subText={'حداقل تعداد دریافت کنندگان'}
                placeholder={'حداقل تعداد دریافت کنندگان'}
                justNum={true}
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
                dispatch({
                  notifs: newData,
                });
              }}
            />
          </>
        )}
      </CommonWebBox>
    </MyView>
  );
}
export default List;
