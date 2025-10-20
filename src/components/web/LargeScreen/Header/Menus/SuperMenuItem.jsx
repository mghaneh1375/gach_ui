import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import {useTheme} from 'styled-components';
import {globalStateContext} from '@/App.jsx';
import {SimpleText} from '@/styles/CommonComponents.jsx';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import vars from '@/styles/root';
import React from 'react';

export const SuperMenuItem = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [wantedIcon, setWantedIcon] = useState(faChevronDown);

  const toggleIsOpen = () => {
    if (isOpen) setWantedIcon(faChevronDown);
    else setWantedIcon(faChevronUp);
    setIsOpen(!isOpen);
  };

  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();
  const theme = useTheme();

  return (
    <div
      style={{
        // backgroundColor: props.selected ? vars.YELLOW : vars.WHITE,
        marginTop: state.isInPhone ? 2 : 'unset',
      }}
      className={
        state.isInPhone
          ? 'super-menu-item super-menu-item-phone'
          : 'super-menu-item'
      }>
      <div
        className={
          state.isInPhone
            ? 'super-menu-item-font-container-phone'
            : 'super-menu-item-font-container'
        }>
        <SimpleFontIcon
          parentStyle={
            state.isInPhone ? {width: 40, left: 50} : {width: '30px !important'}
          }
          style={{
            color:
              props.selected !== undefined && props.selected
                ? vars.WHITE
                : theme.components.menu.colors.icon,
          }}
          icon={props.icon}
        />
      </div>
      <SimpleText
        style={{
          padding: theme.components.menu.spaces.padding,
          color: props.selected
            ? vars.WHITE
            : theme.components.menu.colors.text,
        }}
        text={props.text}
      />
      <SimpleFontIcon
        onPress={() => toggleIsOpen()}
        parentStyle={{
          width: 30,
          height: 30,
          marginRight: 'auto',
        }}
        style={{
          color:
            props.selected !== undefined && props.selected
              ? vars.WHITE
              : theme.components.menu.colors.text,
        }}
        icon={wantedIcon}
      />

      <div className={`sub-item ${isOpen ? '' : 'hidden'}`}>
        {props.items.map((elem, index) => {
          if (elem.text === undefined) return;
          return (
            <PhoneView
              key={index}
              style={{
                width: '100%',
                cursor: 'pointer',
                backgroundColor: theme.components.menu.colors.background,
                padding: theme.components.menu.spaces.subItemPadding,
                paddingRight: theme.components.menu.spaces.subItemPaddingRight,
                gap: 5,
                alignItems: 'center',
              }}>
              <SimpleFontIcon
                icon={faCheck}
                parentStyle={{width: 30, height: 30}}
                style={{color: theme.components.menu.colors.text}}
              />
              <SimpleText
                onPress={() => (window.location.href = elem.url)}
                style={{color: theme.components.menu.colors.text}}
                text={elem.text}
              />
            </PhoneView>
          );
        })}
      </div>
    </div>
  );
};
