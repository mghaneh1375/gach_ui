import React, {useState} from 'react';
import {Platform, Pressable} from 'react-native';
import {CommonWebBox, SimpleText, MyView} from '../Common';
import vars from '../root';
import {
  calcInputWidth,
  CommonHalfTextInputStyleWeb,
  CommonTextInputElem,
  CommonTextInputStyleWeb,
} from './CommonText';

import translator from '../../tranlates/Common';
import SubInputText from './SubInputText';
import {getWidthHeight} from '../../services/Utility';
import MultiBox from '../../components/web/MultiBox/MultiBox';
import {styleFlexWrap} from '../../screens/studentPanel/dashboard/DashboardCard/style';
import {styles} from './Styles';

export const MultiSearchableTextInput = props => {
  const [suggests, setSuggests] = useState([]);
  const [selecting, setSelecting] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectFromChoices, setSelectFromChoices] = useState(false);
  const [showResultPane, setShowResultPane] = useState(false);

  let cancelOnFocusOut = false;

  React.useEffect(() => {
    if (!props.reset) return;

    setUserInput('');
    setSelectFromChoices(false);
  }, [props.reset]);

  React.useEffect(() => {
    if (props.value === undefined || props.value.length === 0) {
      setSelectFromChoices(true);
      return;
    }

    setSelectedItems(props.value);
  }, [props.value]);

  const select = item => {
    setUserInput('');
    setShowResultPane(false);
    setSelectFromChoices(true);
    let items = selectedItems;
    if (items.find(elem => elem.id === item.id) === undefined) items.push(item);
    props.setSelectedItem(items);
  };

  const removeFormSeletedItems = id => {
    let items = [];
    selectedItems.forEach(item => {
      if (item.id === id) return;
      items.push(item);
    });
    setSelectedItems(items);
    props.setSelectedItem(items);
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
    if (suggests.length === 0) return <SimpleText text={translator.noResult} />;
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

  const SelectedListItems = () => {
    return (
      <MultiBox
        items={selectedItems}
        onRemoveClick={id => {
          removeFormSeletedItems(id);
        }}
      />
    );
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
    if (props.addNotFound && newSuggests.length === 0) {
      newSuggests.push({id: text, name: text});
    }

    setSuggests(newSuggests);
    setShowResultPane(true);
  };

  const isApp = Platform.OS !== 'web';
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const style1 =
    Platform.OS === 'web'
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
  let parentAllStyles = isHalf
    ? {
        ...{
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 5,
          paddingBottom: 0,
        },
      }
    : {paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 0};

  if (props.parentStyle !== undefined)
    parentAllStyles = {...parentAllStyles, ...props.parentStyle};

  parentAllStyles = calcInputWidth(0, isHalf, parentAllStyles);
  return (
    <MyView style={parentAllStyles}>
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
            borderWidth: 0,
            border: 0,
            marginLeft: 0,
            marginRight: 0,
            overflow: 'auto',
            flexWrap: 'wrap',
          }}
          child={<MyView style={styles.flexWrap}>{SuggestListItems()}</MyView>}
        />
      )}
      <MyView
        style={{
          width: '100%',
          marginTop: 10,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {SelectedListItems()}
      </MyView>
    </MyView>
  );
};
