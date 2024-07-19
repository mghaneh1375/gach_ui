import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import {dispatchTeachScheduleContext, teachScheduleContext} from './Context';
import Translator from './Translator';
import {routes} from '../../../../../API/APIRoutes';
import {showError, showSuccess} from '../../../../../services/Utility';
import {generalRequest} from '../../../../../API/Utility';
import commonTranslator from '../../../../../translator/Common';

function Copy(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [start, setStart] = useState();

  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={Translator.copy}>
      <PhoneView>
        <JustBottomBorderDatePicker
          value={start}
          setter={setStart}
          placeholder={Translator.start}
          subText={Translator.start}
        />
      </PhoneView>
      <CommonButton
        onPress={async () => {
          if (start === undefined) {
            showError(commonTranslator.pleaseFillAllFields);
            return;
          }
          const data = {
            start: start,
          };

          props.setLoading(true);
          let res = await generalRequest(
            routes.copyTeachSchedule + state.selectedScheduleId,
            'post',
            data,
            'data',
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess();
            let tmp = state.schedules;
            tmp.push(res);
            dispatch({schedules: tmp});
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
