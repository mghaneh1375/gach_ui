import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
  SimpleText,
} from '@/styles';
import JustBottomBorderTextInput from '../../../../../styles/common/JustBottomBorderTextInput';
import translator from '../translator';
import commonTranslator from '@/translator/common';
import {create, update} from './utility';
import {changeText} from '../../../../../services/utility';
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
        <PhoneView
          style={{
            gap: 15,
          }}>
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
            const data = {
              min: min,
              max: max,
              color: color,
              priority: priority,
            };
            props.setLoading(true);
            const res =
              props.selectedLevel === undefined
                ? await create(data, props.token)
                : await update(props.selectedLevel.id, data, props.token);
            props.setLoading(false);
            if (res !== null) {
              data.id =
                props.selectedLevel === undefined
                  ? res
                  : props.selectedLevel.id;
              if (props.selectedLevel === undefined) props.addLevel(data);
              else props.editLevel(data);
              console.log(data);
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
