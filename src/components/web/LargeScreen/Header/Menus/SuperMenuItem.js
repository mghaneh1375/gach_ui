import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import {globalStateContext} from '../../../../../App';
import {SimpleText} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import vars from '../../../../../styles/root';
import React from 'react';

export const SuperMenuItem = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [wantedIcon, setWantedIcon] = useState(faPlus);

  const toggleIsOpen = () => {
    if (isOpen) setWantedIcon(faPlus);
    else setWantedIcon(faMinus);
    setIsOpen(!isOpen);
  };

  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

  return (
    <div
      style={{
        backgroundColor: vars.WHITE,
        marginTop: state.isInPhone ? 10 : 'unset',
      }}
      className={
        state.isInPhone
          ? 'super-menu-item super-menu-item-phone'
          : 'super-menu-item'
      }>
      <SimpleText
        style={{
          padding: 3,
          paddingRight: 12,
          color: vars.LIGHT_SILVER,
        }}
        text={props.text}
      />
      <div
        className={
          state.isInPhone
            ? 'super-menu-item-font-container-phone'
            : 'super-menu-item-font-container'
        }>
        <SimpleFontIcon
          onPress={() => toggleIsOpen()}
          style={{color: vars.LIGHT_SILVER}}
          icon={wantedIcon}
        />
        {!isOpen && (
          <SimpleFontIcon
            parentStyle={
              state.isInPhone
                ? {width: 40, left: 50}
                : {width: '30px !important'}
            }
            style={{color: vars.WHITE}}
            icon={props.icon}
          />
        )}
      </div>
      {isOpen && (
        <div className={'sub-item'}>
          {props.items.map((elem, index) => {
            return (
              <SimpleText
                onPress={() => (window.location.href = elem.url)}
                key={index}
                style={{
                  padding: 3,
                  paddingRight: 12,
                  width: '100%',
                  display: 'block',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                }}
                text={elem.text}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
