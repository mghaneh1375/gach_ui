import React from 'react';
import {CommonWebBox, MyView, PhoneView} from '../../../../../styles/Common';
import Show from './Show/Show';
import translator from '../Translator';

function List(props) {
  const setDefaultAvatar = avatarId => {
    let allAvatars = props.avatars.map(elem => {
      elem.isDefault = elem.id === avatarId;
      return elem;
    });
    props.setAvatars(allAvatars);
  };
  const removeAvatar = avatarId => {
    let allAvatars = props.avatars.filter(elem => {
      return elem.id !== avatarId;
    });

    props.setAvatars(allAvatars);
  };
  return (
    <MyView>
      <CommonWebBox
        header={translator.avatars}
        addBtn={true}
        onAddClick={() => props.setMode('create')}>
        <PhoneView style={{gap: 30}}>
          {props.avatars !== undefined &&
            props.avatars.map((elem, index) => {
              return (
                <Show
                  setDefault={setDefaultAvatar}
                  setSelected={props.setSelected}
                  setMode={props.setMode}
                  removeAvatar={removeAvatar}
                  token={props.token}
                  setLoading={props.setLoading}
                  key={index}
                  avatar={elem}
                />
              );
            })}
        </PhoneView>
      </CommonWebBox>
    </MyView>
  );
}

export default List;
