import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import columns from './Columns';
import {dispatchFinanceContext, financeContext} from './Context';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import commonTranslator from '../../../../translator/Common';
import {LargePopUp} from '../../../../styles/Common/PopUp';

function List(props) {
  const useGlobalState = () => [
    React.useContext(financeContext),
    React.useContext(dispatchFinanceContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [showOpPopUp, setShowOpPopUp] = useState(false);

  const fetchData = React.useCallback(() => {
    if (state.data !== undefined || isWorking) return;

    setIsWorking(true);
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getMyFinancePlans,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      dispatch({
        data: res[0].data,
        maxVideoCalls: res[0].maxVideoCalls,
        minPrice: res[0].minPrice,
      });

      setIsWorking(false);
    });
  }, [dispatch, props, state.data, isWorking]);

  React.useEffect(() => {
    if (state.data !== undefined) return;
    fetchData();
  }, [state.data, fetchData]);

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const handleOp = idx => {
    dispatch({selectedRow: state.data[idx]});
    toggleShowOpPopUp();
  };

  return (
    <>
      {showOpPopUp && (
        <LargePopUp
          title={commonTranslator.opMenu}
          toggleShowPopUp={toggleShowOpPopUp}>
          <PhoneView>
            <CommonButton
              dir={'rtl'}
              theme={'transparent'}
              onPress={() => props.setMode('edit')}
              title={commonTranslator.edit}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {!showOpPopUp && (
        <CommonWebBox
          header={commonTranslator.myFinancePlans}
          addBtn={true}
          onAddClick={() => props.setMode('create')}>
          {state.data !== undefined && (
            <CommonDataTable
              setLoading={props.setLoading}
              token={props.token}
              data={state.data}
              columns={columns}
              handleOp={handleOp}
              removeUrl={routes.removeOffers}
            />
          )}
        </CommonWebBox>
      )}
    </>
  );
}

export default List;
