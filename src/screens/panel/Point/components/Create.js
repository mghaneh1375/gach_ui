import React, {useEffect, useState} from 'react';
import translator from '../translator';
import {dispatchPointContext, pointContext} from './Context';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import {showError, showSuccess} from '../../../../services/Utility';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(pointContext),
    React.useContext(dispatchPointContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [metric, setMetric] = useState(
    props.updateMode ? state.selectedPoint?.action : undefined,
  );
  const [point, setPoint] = useState(
    props.updateMode ? state.selectedPoint?.point : undefined,
  );
  const [values, setValues] = useState();

  const fetchActions = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(routes.getActions, 'get', undefined, 'data', props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] == null) props.setMode('list');
      dispatch({actions: res[0]});
      setValues(
        res[0].map(e => ({
          id: e.action,
          item: e.actionFa,
        })),
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.actions) {
      setValues(
        state.actions.map(e => ({
          id: e.action,
          item: e.actionFa,
        })),
      );
      return;
    }
    fetchActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.actions]);

  if (!values) return <></>;

  return (
    <CommonWebBox onBackClick={() => props.setMode('list')} backBtn={true}>
      <PhoneView style={{...styles.gap10}}>
        <JustBottomBorderSelect
          placeholder={translator.metric}
          subText={translator.metric}
          setter={setMetric}
          values={values}
          value={
            metric === undefined
              ? undefined
              : values.find(elem => elem.id === metric)
          }
        />
        <JustBottomBorderTextInput
          placeholder={translator.point}
          subText={translator.point}
          value={point}
          onChangeText={e => setPoint(e)}
          justNum={true}
        />
      </PhoneView>

      <CommonButton
        onPress={async () => {
          if (metric === undefined || point === undefined) {
            showError('لطفا تمام موارد را وارد نمایید');
            return;
          }
          props.setLoading(true);

          const response = await generalRequest(
            props.updateMode
              ? routes.updatePoint + state.selectedPoint.id
              : routes.createPoint,
            props.updateMode ? 'put' : 'post',
            {
              action: metric,
              point: point,
            },
            'data',
            props.token,
          );
          props.setLoading(false);
          if (response != null) {
            if (props.updateMode)
              dispatch({needUpdate: true, selectedPoint: response});
            else dispatch({points: [...state.points, response]});
            props.setMode('list');
            showSuccess();
          }
        }}
        theme={'dark'}
        title={'ذخیره'}
      />
    </CommonWebBox>
  );
}

export default Create;
