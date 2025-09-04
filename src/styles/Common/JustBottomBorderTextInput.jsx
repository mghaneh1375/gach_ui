import React from 'react';
import {CommonTextInput} from './CommonTextInput';
import {MultiSearchableTextInput} from './MultiSearchableTextInput';
import {SearchableTextInput} from './SearchableTextInput';

const JustBottomBorderTextInput = props => {
  const customStyle =
    props.style === undefined
      ? {
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderRadius: 0,
          padding: 5,
        }
      : {
          ...props.style,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderRadius: 0,
          padding: 5,
        };

  if (props.resultPane === undefined)
    return (
      <CommonTextInput
        onChangeText={props.onChangeText}
        justNum={props.justNum}
        acceptComma={props.acceptComma}
        float={props.float}
        isHalf={props.isHalf}
        onPress={props.onPress}
        type={props.type}
        backgroundColor={props.backgroundColor}
        placeholder={props.placeholder}
        subText={props.subText}
        disable={props.disable}
        style={customStyle}
        parentStyle={props.parentStyle}
        value={props.value}
        multiline={props.multiline}
        onEnter={props.onEnter}
      />
    );

  if (props.multi === undefined)
    return (
      <SearchableTextInput
        onChangeText={props.onChangeText}
        justNum={props.justNum}
        isHalf={props.isHalf}
        placeholder={props.placeholder}
        subText={props.subText}
        style={customStyle}
        values={props.values}
        value={props.value}
        reset={props.reset}
        resultPaneHeight={props.resultPaneHeight}
        setSelectedItem={props.setSelectedItem}
        addNotFound={
          props.addNotFound === undefined ? false : props.addNotFound
        }
      />
    );

  return (
    <MultiSearchableTextInput
      onChangeText={props.onChangeText}
      justNum={props.justNum}
      isHalf={props.isHalf}
      placeholder={props.placeholder}
      subText={props.subText}
      style={customStyle}
      values={props.values}
      value={props.value}
      reset={props.reset}
      setSelectedItem={props.setSelectedItem}
      addNotFound={props.addNotFound === undefined ? false : props.addNotFound}
    />
  );
};

export default JustBottomBorderTextInput;
