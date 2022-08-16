import React, {useState} from 'react';
import {Platform, Pressable} from 'react-native';
import {getWidthHeight} from '../../services/Utility';
import {CommonWebBox, MyView, SimpleText} from '../Common';
import vars from '../root';
import {
  CommonHalfTextInputStyleWeb,
  CommonTextInputElem,
  CommonTextInputStyleWeb,
} from './CommonText';

import SubInputText from './SubInputText';

export const SearchableTextInput = props => {
  const [suggests, setSuggests] = useState([]);
  const [selecting, setSelecting] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectFromChoices, setSelectFromChoices] = useState(false);
  const [showResultPane, setShowResultPane] = useState(false);

  let cancelOnFocusOut = false;

  React.useEffect(() => {
    if (!props.reset) return;

    setUserInput('');
    setSelectFromChoices(false);
  }, [props.reset]);

  React.useEffect(() => {
    setUserInput(props.value);
  }, [props.value]);

  const select = item => {
    setUserInput(item.name);
    setShowResultPane(false);
    setSelectFromChoices(true);
    props.setSelectedItem(item);
  };

  const setSelectingStatue = status => {
    setSelecting(status);
    if (!status) {
      setShowResultPane(false);
      cancelOnFocusOut = false;
      if (!selectFromChoices) {
        setUserInput('');
        props.setSelectedItem(undefined);
      }
    } else cancelOnFocusOut = true;
  };

  const SuggestListItems = () => {
    if (suggests.length === 0) return <SimpleText text="نتیجه ای یافت نشد" />;
    return suggests.map(suggest => (
      <Pressable
        onFocus={() => setSelectingStatue(true)}
        onBlur={() => setSelectingStatue(false)}
        key={suggest.id}
        onPress={e => select(suggest)}>
        <SimpleText style={{cursor: 'pointer'}} text={suggest.name} />
      </Pressable>
    ));
  };

  const checkSelect = () => {
    setTimeout(function () {
      if (cancelOnFocusOut) return;
      setShowResultPane(false);
      if (!selectFromChoices) {
        setUserInput('');
        props.setSelectedItem(undefined);
      }
    }, 400);
  };

  const changeUserInput = text => {
    setUserInput(text);
    setSelectFromChoices(false);
    cancelOnFocusOut = false;
    var newSuggests = [];
    if (text.length < 2) {
      setShowResultPane(false);
      setSuggests(newSuggests);
      return;
    }
    for (var i = 0; i < props.values.length; i++) {
      if (props.values[i].name.includes(text))
        newSuggests.push(props.values[i]);
    }

    setSuggests(newSuggests);
    setShowResultPane(true);
  };

  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';

  const style1 = !isApp
    ? isHalf
      ? CommonHalfTextInputStyleWeb
      : CommonTextInputStyleWeb
    : {};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  const inputProps = {
    placeholder: props.placeholder,
    onChangeText: e => changeUserInput(e),
    style: allStyle,
    value: userInput,
    onBlur: () => checkSelect(),
  };

  if (props.justNum !== undefined && Platform.OS === 'web') {
    inputProps.keyboardType = 'numeric';
    inputProps.onKeyPress = e => {
      var charCode = e.which ? e.which : e.keyCode;
      if (charCode !== 8 && String.fromCharCode(charCode).match(/[^0-9]/g))
        e.preventDefault();
    };
  }
  let width = getWidthHeight()[0];
  return (
    <MyView
      style={
        isHalf
          ? {
              width: isApp || width < 768 ? '100%' : 'calc(50% - 10px)',
              maxWidth: width > 768 ? 300 : '100%',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 0,
            }
          : {paddingLeft: 5, paddingRight: 5, paddingTop: 5, paddingBottom: 0}
      }>
      <CommonTextInputElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}

      {showResultPane && (
        <CommonWebBox
          style={{
            width: '100%',
            height: 100,
            marginTop: props.subText !== undefined ? -20 : 10,
            backgroundColor: vars.WHITE,
            borderWidth: 1,
            marginLeft: 0,
            marginRight: 0,
            overflow: 'auto',
          }}
          child={<MyView>{SuggestListItems()}</MyView>}
        />
      )}
    </MyView>
  );
};
