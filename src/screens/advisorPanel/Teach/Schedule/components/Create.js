import React, {useEffect, useMemo, useState} from 'react';
import {
  showError,
  showSuccess,
  trueFalseValues,
} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import Translator from './Translator';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import commonTranslator from '../../../../../translator/Common';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {dispatchTeachScheduleContext, teachScheduleContext} from './Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(teachScheduleContext),
    React.useContext(dispatchTeachScheduleContext),
  ];
  const [state, dispatch] = useGlobalState();

  const teachModes = useMemo(() => {
    return [
      {item: Translator.private, id: 'private'},
      {item: Translator.semiPrivate, id: 'semi_private'},
    ];
  }, []);

  const [title, setTitle] = useState();
  const [length, setLength] = useState();
  const [teachMode, setTeachMode] = useState('private');
  const [visibility, setVisibility] = useState(true);
  const [start, setStart] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [minCap, setMinCap] = useState();
  const [maxCap, setMaxCap] = useState();
  const [needRegistryConfirmation, setNeedRegistryConfirmation] =
    useState(true);

  const fetchSchedule = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.getTeachSchedule + state.selectedScheduleId,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] != null) {
        setTitle(res[0].title);
        setDescription(res[0].description);
        setTeachMode(res[0].teachMode);
        setPrice(res[0].price);
        setVisibility(res[0].visibility);
        setMinCap(res[0].minCap);
        setMaxCap(res[0].maxCap);
        setLength(res[0].length);
        setStart(res[0].startAt);
        setNeedRegistryConfirmation(res[0].needRegistryConfirmation);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedScheduleId, props.token]);

  useEffect(() => {
    if (!props.isInEditMode) return;
    fetchSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isInEditMode]);

  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={props.isInEditMode ? Translator.update : Translator.create}>
      <PhoneView style={{gap: '20px'}}>
        <JustBottomBorderTextInput
          value={title}
          onChangeText={e => setTitle(e)}
          placeholder={Translator.title}
          subText={Translator.title}
        />
        <JustBottomBorderTextInput
          value={length}
          onChangeText={e => setLength(e)}
          justNum={true}
          placeholder={Translator.duration}
          subText={Translator.duration}
        />
        <JustBottomBorderTextInput
          value={price}
          onChangeText={e => setPrice(e)}
          justNum={true}
          placeholder={Translator.price}
          subText={Translator.price}
        />
        <JustBottomBorderSelect
          values={trueFalseValues}
          setter={setVisibility}
          value={trueFalseValues.find(e => e.id === visibility)}
          placeholder={commonTranslator.visibility}
          subText={commonTranslator.visibility}
        />
        <JustBottomBorderSelect
          values={teachModes}
          setter={setTeachMode}
          value={teachModes.find(e => e.id === teachMode)}
          placeholder={Translator.teachMode}
          subText={Translator.teachMode}
        />
        {(!props.isInEditMode || start !== undefined) && (
          <JustBottomBorderDatePicker
            value={start}
            setter={setStart}
            placeholder={Translator.start}
            subText={Translator.start}
          />
        )}

        {teachMode === 'private' && (
          <JustBottomBorderSelect
            values={trueFalseValues}
            setter={setNeedRegistryConfirmation}
            value={trueFalseValues.find(e => e.id === needRegistryConfirmation)}
            placeholder={Translator.needRegistryConfirmation}
            subText={Translator.needRegistryConfirmation}
          />
        )}
        {teachMode === 'semi_private' && (
          <>
            <JustBottomBorderTextInput
              value={minCap}
              onChangeText={e => setMinCap(e)}
              justNum={true}
              placeholder={Translator.minCap}
              subText={Translator.minCap}
            />
            <JustBottomBorderTextInput
              value={maxCap}
              onChangeText={e => setMaxCap(e)}
              justNum={true}
              placeholder={Translator.maxCap}
              subText={Translator.maxCap}
            />
          </>
        )}
      </PhoneView>
      <JustBottomBorderTextInput
        value={description}
        onChangeText={e => setDescription(e)}
        placeholder={Translator.description}
        subText={Translator.description}
        multiline={true}
      />
      <CommonButton
        onPress={async () => {
          if (
            start === undefined ||
            length === undefined ||
            (teachMode === 'semi_private' &&
              (minCap === undefined || maxCap === undefined))
          ) {
            showError(commonTranslator.pleaseFillAllFields);
            return;
          }
          const data = {
            title: title,
            length: length,
            visibility: visibility,
            teachMode: teachMode,
            description: description,
            start: start,
          };
          if (teachMode === 'semi_private') {
            data.minCap = minCap;
            data.maxCap = maxCap;
          } else data.needRegistryConfirmation = needRegistryConfirmation;

          if (price !== undefined) data.price = price;

          props.setLoading(true);
          let res = await generalRequest(
            props.isInEditMode
              ? routes.updateTeachSchedule + state.selectedScheduleId
              : routes.createTeachSchedules,
            props.isInEditMode ? 'put' : 'post',
            data,
            'data',
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess();
            if (props.isInEditMode) {
              dispatch({
                schedules: state.schedules.map(e => {
                  if (e.id !== state.selectedScheduleId) return e;
                  return res;
                }),
              });
            } else {
              let tmp = state.schedules;
              tmp.push(res);
              dispatch({schedules: tmp});
            }
            props.setMode('list');
          }
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}

export default Create;
