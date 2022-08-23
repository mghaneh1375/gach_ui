import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
  SimpleText,
} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {create, update} from './Utility';
import {changeText} from '../../../../../services/Utility';
import {HexColorPicker} from 'react-colorful';

function Create(props) {
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [color, setColor] = useState();
  const [priority, setPriority] = useState();

  React.useState(() => {
    if (props.selectedLevel === undefined) return;
    setMin(props.selectedLevel.min);
    setMax(props.selectedLevel.max);
    setColor(props.selectedLevel.color);
    setPriority(props.selectedLevel.priority);
  }, [props.selectedLevel]);

  return (
    <MyView>
      <CommonWebBox
        header={
          props.editLevel !== undefined
            ? commonTranslator.add
            : commonTranslator.edit
        }
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView style={{gap: 15}}>
          <JustBottomBorderTextInput
            onChangeText={e => changeText(e, setMin)}
            value={min}
            placeholder={translator.min}
            subText={translator.min}
            justNum={true}
          />
          <JustBottomBorderTextInput
            onChangeText={e => changeText(e, setMax)}
            value={max}
            placeholder={translator.max}
            subText={translator.max}
            justNum={true}
          />
          <JustBottomBorderTextInput
            onChangeText={e => changeText(e, setPriority)}
            value={priority}
            placeholder={commonTranslator.priority}
            subText={commonTranslator.priority}
            justNum={true}
          />
        </PhoneView>

        <SimpleText text={translator.color} />
        <HexColorPicker color={color} onChange={setColor} />

        <CommonButton
          onPress={async () => {
            let data = {
              min: min,
              max: max,
              color: color,
              priority: priority,
            };
            props.setLoading(true);
            let res = (await (props.selectedLevel === undefined))
              ? create(data, props.token)
              : update(props.selectedLevel.id, data, props.token);
            props.setLoading(false);
            if (res !== null) {
              data.id =
                props.selectedLevel === undefined
                  ? res
                  : props.selectedLevel.id;

              if (props.selectedLevel === undefined) props.addLevel(data);
              else props.editLevel(data);
              props.setMode('list');
            }
          }}
          theme={'dark'}
          title={commonTranslator.confirm}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default Create;
