import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {teachScheduleContext, dispatchTeachScheduleContext} from './Context';
import columns from './TableStructure';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import ConfirmationBatchOpPane from '../../../../../components/web/ConfirmationBatchOpPane';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {routes} from '../../../../../API/APIRoutes';
import CommonDataTable from '../../../../../styles/Common/CommonDataTable';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {removeItems, showSuccess} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';
import {generalRequest} from '../../../../../API/Utility';

function List(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
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

  const fetchMySchedules = (token, filter = '') => {
    return generalRequest(
      filter === undefined
        ? routes.getTeachSchedules
        : routes.getTeachSchedules + '?' + filter,
      'get',
      undefined,
      'data',
      token,
    );
  };

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([fetchMySchedules(props.token)]).then(res => {
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
      header={'لیست برنامه های تدریس'}
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
          url={routes.removeTeachSchedule + state.selectedSchedule.id}
          method={'delete'}
          warning={'آیا از حذف آیتم مورد نظر اطمینان دارید؟'}
          toggleShowPopUp={() => setShowConfirmation(false)}
        />
      )}
      {showOp && !showConfirmation && (
        <LargePopUp
          title={'ویرایش برنامه تدریس'}
          toggleShowPopUp={() => setShowOp(false)}>
          <PhoneView>
            <CommonButton
              onPress={() => props.setMode('edit')}
              title={'مشاهده برنامه'}
              theme={'transparent'}
            />
            <CommonButton
              theme={'transparent'}
              onPress={() => setShowConfirmation(true)}
              title={'حذف'}
            />
            <CommonButton
              theme={'transparent'}
              onPress={() => props.setMode('lesson')}
              title={'گزارش تفکیکی'}
            />
            {props.isAdvisor && (
              <CommonButton
                theme={'transparent'}
                onPress={() => props.setMode('copy')}
                title={'کپی کردن برنامه'}
              />
            )}
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

            // let res =
            //   props.studentId === undefined
            //     ? await fetchMySchedules(
            //         props.token,
            //         filter === 'all'
            //           ? undefined
            //           : filter == 'passed'
            //           ? false
            //           : true,
            //       )
            //     : await fetchSchedules(
            //         props.token,
            //         props.studentId,
            //         filter === 'all'
            //           ? undefined
            //           : filter == 'passed'
            //           ? false
            //           : true,
            //       );
            // props.setLoading(false);
            // if (res != null) dispatch({schedules: res});
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
