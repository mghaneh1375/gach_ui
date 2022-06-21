import {CommonTextInput} from './CommonTextInput';
import {MultiSearchableTextInput} from './MultiSearchableTextInput';
import {SearchableTextInput} from './SearchableTextInput';

export const JustBottomBorderTextInput = props => {
  const customStyle = {
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
        isHalf={props.isHalf}
        placeholder={props.placeholder}
        subText={props.subText}
        style={customStyle}
        value={props.value}
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
      reset={props.reset}
      setSelectedItem={props.setSelectedItem}
    />
  );
};
