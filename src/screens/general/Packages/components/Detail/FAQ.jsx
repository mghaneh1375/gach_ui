import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {EqualTwoTextInputs, SimpleText} from '@/styles';
import {SimpleFontIcon} from '../../../../../styles/common/FontIcon';
import {styles} from '@/styles/common/styles';
function FAQ(props) {
  const [show, setShow] = useState(false);
  return (
    <Pressable
      onPress={() => setShow(!show)}
      style={{
        ...styles.borderBottom1,
        ...styles.paddingBottomUp5,
      }}>
      <EqualTwoTextInputs>
        <SimpleText text={props.elem.question} />
        <SimpleFontIcon
          onPress={() => setShow(!show)}
          kind={'med'}
          icon={show ? faAngleDown : faAngleUp}
        />
      </EqualTwoTextInputs>
      {show && <SimpleText text={props.elem.answer} />}
    </Pressable>
  );
}
export default FAQ;
