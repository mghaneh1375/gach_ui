import React, {useState} from 'react';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../../styles/Common/Styles';
import commonTranslator from '../../../../../translator/Common';
import Translator from '../../Translate';
import {remove, store} from './Utility';

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
            <PhoneView style={{...styles.gap10, ...styles.margin15}}>
              <CommonButton
                onPress={async () => {
                  props.setLoading(true);
                  let res = await remove(props.id, props.elem.key, props.token);
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
                let data = {
                  key: key,
                  value: value,
                };
                let res = await store(data, props.token, props.id);
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
