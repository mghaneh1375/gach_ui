import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '@/styles';
import JustBottomBorderDatePicker from '../../../../../styles/common/JustBottomBorderDatePicker.jsx';
import {
  dispatchTeachScheduleContext,
  teachScheduleContext,
} from './Context.jsx';
import Translator from './translator';
import {routes} from '@/api/apiRoutes';
import {showError, showSuccess} from '../../../../../services/utility';
import {generalRequest} from '../../../../../api/utility';
import commonTranslator from '@/translator/common';
function Copy(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [start, setStart] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [endRegistration, setEndRegistration] = useState();
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={Translator.copy}>
      <PhoneView
        style={{
          gap: '10px',
        }}>
        {state.isPackage && (
          <>
            <JustBottomBorderDatePicker
              value={startDate}
              setter={setStartDate}
              placeholder={Translator.startDate}
              subText={Translator.startDate}
            />
            <JustBottomBorderDatePicker
              value={endDate}
              setter={setEndDate}
              placeholder={Translator.endDate}
              subText={Translator.endDate}
            />
            <JustBottomBorderDatePicker
              value={endRegistration}
              setter={setEndRegistration}
              placeholder={Translator.endRegistration}
              subText={Translator.endRegistration}
            />
          </>
        )}
        {!state.isPackage && (
          <JustBottomBorderDatePicker
            value={start}
            setter={setStart}
            placeholder={Translator.start}
            subText={Translator.start}
          />
        )}
      </PhoneView>
      <CommonButton
        onPress={async () => {
          if (
            (!state.isPackage && start === undefined) ||
            (state.isPackage &&
              (startDate === undefined ||
                endDate === undefined ||
                endRegistration === undefined))
          ) {
            showError(commonTranslator.pleaseFillAllFields);
            return;
          }
          const data = state.isPackage
            ? {
                startDate: startDate,
                endDate: endDate,
                endRegistration: endRegistration,
              }
            : {
                start: start,
              };
          props.setLoading(true);
          const res = await generalRequest(
            routes.copyTeachSchedule + state.selectedScheduleId,
            'post',
            data,
            'data',
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess();
            const tmp = state.schedules;
            tmp.push(res);
            dispatch({
              schedules: tmp,
            });
            props.setMode('list');
          }
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}
export default Copy;
