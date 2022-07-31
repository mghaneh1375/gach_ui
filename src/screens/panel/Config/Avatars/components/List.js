import {CommonWebBox, PhoneView} from '../../../../../styles/Common';
import Show from './Show/Show';
import translator from '../Translator';
import {View} from 'react-native';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TextIcon} from '../../../../../styles/Common/TextIcon';
import CardPic from './CardPic/CardPic';

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
    <CommonWebBox
      header={translator.avatars}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <View>
        <PhoneView
          style={{
            width: '100%',
            height: '100vh',
            backgroundColor: '#efefef',
          }}>
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
      </View>
    </CommonWebBox>
  );
}

export default List;
