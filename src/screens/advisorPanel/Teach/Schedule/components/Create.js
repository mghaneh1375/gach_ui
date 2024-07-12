import {useMemo, useState} from 'react';
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

function Create(props) {
  const teachModes = useMemo(() => {
    return [
      {item: 'خصوصی', id: 'private'},
      {item: 'نیمه خصوصی', id: 'semi_private'},
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
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={Translator.create}>
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
        <JustBottomBorderDatePicker
          value={start}
          setter={setStart}
          placeholder={Translator.start}
          subText={Translator.start}
        />
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
            price: price,
            start: start,
          };
          if (teachMode === 'semi_private') {
            data.minCap = minCap;
            data.maxCap = maxCap;
          } else data.needRegistryConfirmation = needRegistryConfirmation;
          props.setLoading(true);
          let res = await generalRequest(
            routes.createTeachSchedules,
            'post',
            data,
            'id',
            props.token,
          );
          props.setLoading(false);
          if (res !== null) {
            showSuccess();
          }
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}

export default Create;
