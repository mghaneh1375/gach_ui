import React, {useState} from 'react';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles';
import commonTranslator from '@/translator/common';
import Translator from '../../translate';
import {remove, store} from './utility';
function Card(props) {
  const [show, setShow] = useState(false);
  const [key, setKey] = useState();
  const [value, setValue] = useState();
  React.useEffect(() => {
    if (props.elem === undefined) {
      setShow(true);
      return;
    }
    setKey(props.elem.key);
    setValue(props.elem.value);
  }, [props.elem]);
  return (
    <CommonWebBox
      header={key !== undefined ? key : ''}
      btn={
        <SimpleFontIcon
          onPress={() => setShow(!show)}
          kind="med"
          icon={show ? faAngleDown : faAngleUp}
        />
      }
      width={'calc(25% - 10px)'}>
      {show && (
        <MyView>
          <JustBottomBorderTextInput
            onChangeText={e => setKey(e)}
            placeholder={key}
            subText={Translator.key}
          />
          <JustBottomBorderTextInput
            onChangeText={e => setValue(e)}
            placeholder={value}
            subText={Translator.value}
          />

          {props.elem !== undefined && (
            <PhoneView
              style={{
                ...styles.gap10,
                ...styles.margin15,
              }}>
              <CommonButton
                onPress={async () => {
                  props.setLoading(true);
                  const res = await remove(
                    props.id,
                    props.elem.key,
                    props.token,
                  );
                  props.setLoading(false);
                  if (res !== null) {
                    setShow(false);
                    props.onDelete();
                  }
                }}
                title={commonTranslator.delete}
              />
            </PhoneView>
          )}
          {props.elem === undefined && (
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                const data = {
                  key: key,
                  value: value,
                };
                const res = await store(data, props.token, props.id);
                props.setLoading(false);
                if (res !== null) {
                  props.onAdd(data);
                }
              }}
              title={commonTranslator.add}
            />
          )}
        </MyView>
      )}
    </CommonWebBox>
  );
}
export default Card;
