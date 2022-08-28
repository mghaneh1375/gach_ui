import React, {useState} from 'react';
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

  return (
    <PhoneView
      style={{
        ...styles.justifyContentCenter,
        ...styles.alignItemsCenter,
      }}>
      <CommonRadioButton
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => change()}
        text={props.text}
      />
    </PhoneView>
  );
}

export default Choice;
