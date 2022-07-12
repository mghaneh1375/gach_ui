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
          paddingBottom: 0,
        }
      : {
          ...props.style,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderRadius: 0,
          paddingBottom: 0,
        };

  if (props.resultPane === undefined)
    return (
      <CommonTextInput
        onChangeText={props.onChangeText}
        justNum={props.justNum}
        float={props.float}
        isHalf={props.isHalf}
        onPress={props.onPress}
        type={props.type}
        placeholder={props.placeholder}
        subText={props.subText}
        disable={props.disable}
        style={customStyle}
        parentStyle={props.parentStyle}
        value={props.value}
        multiline={props.multiline}
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
        setSelectedItem={props.setSelectedItem}
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
    />
  );
};

export default JustBottomBorderTextInput;
