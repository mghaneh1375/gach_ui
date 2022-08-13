import {faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import {SimpleText} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import vars from '../../../../../styles/root';

export const SuperMenuItem = props => {
  const [isOpen, setIsOpen] = useState(false);
  const [wantedIcon, setWantedIcon] = useState(faPlus);

  const toggleIsOpen = () => {
    if (isOpen) setWantedIcon(faPlus);
    else setWantedIcon(faMinus);
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{backgroundColor: isOpen ? vars.YELLOW : vars.WHITE}}
      className={'super-menu-item'}>
      <SimpleText
        style={{
          padding: 3,
          paddingRight: 12,
          color: isOpen ? vars.WHITE : vars.LIGHT_SILVER,
        }}
        text={props.text}
      />
      <div className={'super-menu-item-font-container'}>
        <SimpleFontIcon
          onPress={() => toggleIsOpen()}
          style={{color: isOpen ? vars.WHITE : vars.LIGHT_SILVER}}
          icon={wantedIcon}
        />
        {!isOpen && (
          <SimpleFontIcon style={{color: vars.WHITE}} icon={props.icon} />
        )}
      </div>
      {isOpen && (
        <div className={'sub-item'}>
          {props.items.map((elem, index) => {
            return (
              <SimpleText
                onPress={() => props.navigate(elem.url)}
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
