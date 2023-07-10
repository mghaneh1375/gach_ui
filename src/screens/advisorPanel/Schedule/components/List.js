import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import {
  advisorScheduleContext,
  dispatchAdvisorScheduleContext,
} from './Context';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import {fetchMySchedules, fetchSchedules} from './Utility';
import columns from './TableStructure';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import {removeItems, showSuccess} from '../../../../services/Utility';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {routes} from '../../../../API/APIRoutes';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../translator/Common';

function List(props) {
  const useGlobalState = () => [
    React.useContext(advisorScheduleContext),
    React.useContext(dispatchAdvisorScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const statusValues = [
    {id: 'passed', item: 'گذشته'},
    {id: 'current', item: 'جاری یا آینده'},
    {id: 'all', item: 'همه'},
  ];

  const [filter, setFilter] = useState('all');

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      props.studentId === undefined
        ? fetchMySchedules(props.token)
        : fetchSchedules(props.token, props.studentId),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      if (props.studentId === undefined) dispatch({schedules: res[0].items});
      else dispatch({schedules: res[0].items, student: res[0].student});
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
      header={
        state.student === undefined
          ? 'لیست کاربرگ ها '
          : 'لیست کاربرگ های ' + state.student.name
      }
      addBtn={props.isAdvisor}
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
            <CommonButton
              theme={'transparent'}
              onPress={() => props.setMode('lesson')}
              title={'گزارش تفکیکی'}
            />
            <CommonButton
              theme={'transparent'}
              onPress={() => props.setMode('copy')}
              title={'کپی کردن برنامه'}
            />
          </PhoneView>
        </LargePopUp>
      )}
      <PhoneView>
        <JustBottomBorderSelect
          values={statusValues}
          setter={setFilter}
          value={statusValues.find(elem => elem.id === filter)}
          placeholder={'وضعیت کاربرگ'}
          subText={'وضعیت کاربرگ'}
        />
        <CommonButton
          title={commonTranslator.filter}
          onPress={async () => {
            props.setLoading(true);

            let res =
              props.studentId === undefined
                ? await fetchMySchedules(
                    props.token,
                    filter === 'all'
                      ? undefined
                      : filter == 'passed'
                      ? false
                      : true,
                  )
                : await fetchSchedules(
                    props.token,
                    props.studentId,
                    filter === 'all'
                      ? undefined
                      : filter == 'passed'
                      ? false
                      : true,
                  );
            props.setLoading(false);
            if (res != null) dispatch({schedules: res});
          }}
        />
      </PhoneView>
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
