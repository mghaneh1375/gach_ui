import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {
  EqualTwoTextInputs,
  MyView,
  SimpleText,
} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {styles} from '../../../../../styles/Common/Styles';

function FAQ(props) {
  const [show, setShow] = useState(false);

  return (
    <Pressable
      onPress={() => setShow(!show)}
      style={{...styles.borderBottom1, ...styles.paddingBottomUp5}}>
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
