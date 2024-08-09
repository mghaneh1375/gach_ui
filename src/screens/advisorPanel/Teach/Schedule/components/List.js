import React, {useMemo, useState} from 'react';
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
import Translator from './Translator';

function List(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [showOp, setShowOp] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [activeValues, teachValues, registryValues, requestValues] =
    useMemo(() => {
      return [
        [
          {item: 'شروع نشده', id: 'active'},
          {item: 'برگزار شده', id: 'expired'},
          {item: 'همه', id: 'all'},
        ],
        [
          {item: 'خصوصی', id: 'private'},
          {item: 'گروهی', id: 'semi_private'},
          {item: 'همه', id: 'all'},
        ],
        [
          {
            item: 'تنها آنهایی که دانش آموز ثبت نام شده دارند',
            id: 'justHasStudents',
          },
          {item: 'همه', id: 'all'},
        ],
        [
          {
            item: 'تنها آنهایی که درخواست دهنده دارند',
            id: 'justHasRequests',
          },
          {item: 'همه', id: 'all'},
        ],
      ];
    }, []);

  const [activeMode, setActiveMode] = useState('active');
  const [teachMode, setTeachMode] = useState('all');
  const [registryStatus, setRegistryStatus] = useState('all');
  const [requestStatus, setRequestStatus] = useState('all');
  const [selectedRow, setSelectedRow] = useState();

  const fetchMySchedules = (
    token,
    activeMode,
    teachMode,
    registryStatus,
    requestStatus,
  ) => {
    const params = new URLSearchParams();
    if (activeMode !== 'all') params.append('activeMode', activeMode);
    if (teachMode !== 'all') params.append('teachMode', teachMode);
    if (registryStatus !== 'all') params.append('justHasStudents', true);
    if (requestStatus !== 'all') params.append('justHasRequests', true);
    return generalRequest(
      routes.getTeachSchedules + '?' + params.toString(),
      'get',
      undefined,
      'data',
      token,
    );
  };

  const fetchData = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      fetchMySchedules(
        props.token,
        activeMode,
        teachMode,
        registryStatus,
        requestStatus,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) {
        props.navigate('/');
        return;
      }
      dispatch({schedules: res[0]});
    });
  }, [props, dispatch, activeMode, teachMode, registryStatus, requestStatus]);

  useEffectOnce(() => {
    if (state.schedules !== undefined) return;
    fetchData();
  }, [fetchData]);

  const handleOp = (idx, row) => {
    dispatch({selectedScheduleId: row.id});
    setSelectedRow(row);
    setShowOp(true);
  };

  return (
    <>
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
              [state.selectedScheduleId],
            );

            showSuccess();
            setShowConfirmation(false);
            setShowOp(false);
          }}
          url={routes.removeTeachSchedule + state.selectedScheduleId}
          method={'delete'}
          warning={commonTranslator.sureRemove}
          toggleShowPopUp={() => setShowConfirmation(false)}
        />
      )}
      {showOp && !showConfirmation && (
        <LargePopUp
          title={'عملیات برنامه تدریس'}
          toggleShowPopUp={() => {
            setShowOp(false);
            setSelectedRow(undefined);
          }}>
          <PhoneView>
            <CommonButton
              onPress={() => props.setMode('edit')}
              title={'ویرایش'}
              theme={'transparent'}
            />
            <CommonButton
              theme={'transparent'}
              onPress={() => setShowConfirmation(true)}
              title={'حذف'}
            />
            <CommonButton
              theme={'transparent'}
              onPress={() => props.setMode('students')}
              title={'لیست دانش آموزان'}
            />
            <CommonButton
              theme={'transparent'}
              onPress={() => props.setMode('copy')}
              title={'کپی کردن برنامه'}
            />
            {selectedRow.skyRoomUrl !== undefined &&
              selectedRow.skyRoomUrl !== '' && (
                <CommonButton
                  theme={'transparent'}
                  onPress={() => window.open(selectedRow.skyRoomUrl)}
                  title={Translator.goToSkyRoom}
                />
              )}
            {selectedRow.canBuildSkyRoom && (
              <CommonButton
                theme={'transparent'}
                onPress={async () => {
                  props.setLoading(true);
                  const res = await generalRequest(
                    routes.createMeetingRoomForTeach + selectedRow.id,
                    'put',
                    undefined,
                    'data',
                    props.token,
                  );
                  props.setLoading(false);
                  if (res != null) {
                    showSuccess();
                    dispatch({
                      schedules: state.schedules.map(e => {
                        if (e.id !== selectedRow.id) return e;
                        e.canBuildSkyRoom = false;
                        e.skyRoomUrl = res;
                        return e;
                      }),
                    });
                    setShowOp(false);
                    setSelectedRow(undefined);
                  }
                }}
                title={Translator.buildSkyRoom}
              />
            )}
          </PhoneView>
        </LargePopUp>
      )}
      {!showOp && !showConfirmation && (
        <CommonWebBox
          header={'لیست برنامه\u200Cهای تدریس'}
          addBtn={true}
          onAddClick={() => props.setMode('create')}>
          <PhoneView style={{gap: '10px'}}>
            <JustBottomBorderSelect
              values={activeValues}
              setter={setActiveMode}
              value={activeValues.find(elem => elem.id === activeMode)}
              placeholder={Translator.activeMode}
              subText={Translator.activeMode}
            />
            <JustBottomBorderSelect
              values={teachValues}
              setter={setTeachMode}
              value={
                teachMode === undefined
                  ? undefined
                  : teachValues.find(elem => elem.id === teachMode)
              }
              placeholder={Translator.teachMode}
              subText={Translator.teachMode}
            />
            <JustBottomBorderSelect
              values={registryValues}
              setter={setRegistryStatus}
              value={
                registryStatus === undefined
                  ? undefined
                  : registryValues.find(elem => elem.id === registryStatus)
              }
              placeholder={Translator.registryStauts}
              subText={Translator.registryStauts}
            />
            <JustBottomBorderSelect
              values={requestValues}
              setter={setRequestStatus}
              value={
                requestStatus === undefined
                  ? undefined
                  : requestValues.find(elem => elem.id === requestStatus)
              }
              placeholder={Translator.requestStauts}
              subText={Translator.requestStauts}
            />
          </PhoneView>
          <CommonButton
            title={commonTranslator.filter}
            onPress={() => fetchData()}
          />
          {state.schedules !== undefined && (
            <CommonDataTable
              excel={false}
              handleOp={handleOp}
              columns={columns}
              data={state.schedules}
            />
          )}
        </CommonWebBox>
      )}
    </>
  );
}

export default List;
