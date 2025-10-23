import React, {useMemo, useState} from 'react';
import {getDevice} from '@/services/utility';
import {CommonRadioButton, PhoneView} from '@/styles';
import {styles} from '@/styles/common/styles';
function Choice(props) {
  const [isSelected, setIsSelected] = useState(false);
  React.useEffect(() => {
    setIsSelected(props.isSelected);
  }, [props.isSelected]);
  const change = () => {
    if (props.onChange === undefined) return;
    props.onChange(props.idx);
  };
  const isInPhone = useMemo(() => {
    return getDevice().indexOf('WebPort') !== -1;
  }, []);
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
        style={{
          height: isInPhone ? 40 : 60,
        }}
        textStyle={
          isInPhone
            ? {
                alignSelf: 'center',
                fontSize: 12,
              }
            : {
                alignSelf: 'center',
              }
        }
        text={props.text}
      />
    </PhoneView>
  );
}
export default Choice;
