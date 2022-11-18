import React, {useState} from 'react';
import {getDevice} from '../../../../../services/Utility';
import {CommonRadioButton, PhoneView} from '../../../../../styles/Common';
import {styles} from '../../../../../styles/Common/Styles';

function Choice(props) {
  const [isSelected, setIsSelected] = useState(false);

  React.useEffect(() => {
    setIsSelected(props.isSelected);
  }, [props.isSelected]);

  const change = () => {
    if (props.onChange === undefined) return;
    props.onChange(props.idx);
  };

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  return (
    <PhoneView
      style={{
        ...styles.justifyContentCenter,
        ...styles.alignItemsCenter,
        ...{
          height: isInPhone ? 40 : 60,
        },
      }}>
      <CommonRadioButton
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => change()}
        style={{height: isInPhone ? 40 : 60}}
        textStyle={{alignSelf: 'center'}}
        text={props.text}
      />
    </PhoneView>
  );
}

export default Choice;
