import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {
  advisorScheduleContext,
  dispatchAdvisorScheduleContext,
} from './Context';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {fetchSchedules, removeSchedule} from './Utility';
import columns from './TableStructure';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {removeItems, showSuccess} from '../../../../services/Utility';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {routes} from '../../../../API/APIRoutes';

function List(props) {
  const useGlobalState = () => [
    React.useContext(advisorScheduleContext),
    React.useContext(dispatchAdvisorScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([fetchSchedules(props.token, props.studentId)]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        props.navigate('/');
        return;
      }

      dispatch({schedules: res[0]});
    });
  }, [props, dispatch]);

  useEffectOnce(() => {
    if (state.schedules !== undefined) return;
    fetchData();
  }, [fetchData]);

  const handleOp = idx => {
    dispatch({selectedSchedule: state.schedules[idx]});
    setShowOp(true);
  };

  return (
    <CommonWebBox
      header={'لیست کاربرگ ها'}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      {showConfirmation && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          data={undefined}
          afterFunc={() => {
            removeItems(
              state.schedules,
              items => {
                dispatch({schedules: items});
              },
              [state.selectedSchedule.id],
            );

            showSuccess();
            setShowConfirmation(false);
            setShowOp(false);
          }}
          url={routes.removeSchedule + state.selectedSchedule.id}
          method={'delete'}
          warning={'آیا از حذف آیتم مورد نظر اطمینان دارید؟'}
          toggleShowPopUp={() => setShowConfirmation(false)}
        />
      )}
      {showOp && !showConfirmation && (
        <LargePopUp
          title={'برنامه هفتگی ' + state.selectedSchedule.weekStartAt}
          toggleShowPopUp={() => setShowOp(false)}>
          <PhoneView>
            <CommonButton
              onPress={() => props.setMode('edit')}
              title={'مشاهده برنامه'}
              theme={'transparent'}
            />
            {state.selectedSchedule.canDelete && (
              <CommonButton
                theme={'transparent'}
                onPress={() => setShowConfirmation(true)}
                title={'حذف'}
              />
            )}
          </PhoneView>
        </LargePopUp>
      )}
      {state.schedules !== undefined && (
        <CommonDataTable
          handleOp={handleOp}
          columns={columns}
          data={state.schedules}
        />
      )}
    </CommonWebBox>
  );
}

export default List;
