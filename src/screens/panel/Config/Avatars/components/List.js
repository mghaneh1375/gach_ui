import React from 'react';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import Show from './Show/Show';
import translator from '../Translator';
import SuccessTransaction from '../../../../../components/web/SuccessTransaction/SuccessTransaction';
import FailTransaction from '../../../../../components/web/FailTransaction/FailTransaction';
import MyOffs from '../../../../studentPanel/‌MyOffs/MyOffs';
import SearchUser from '../../../../../components/web/SearchUser/SearchUser';

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
      <MyOffs
        placeUse={'درخانع'}
        expiredAt={'03/02/1401'}
        percent={'10%'}
        price={50000}
      />
      <SearchUser></SearchUser>
      <SuccessTransaction
        buyerName={'ahmad'}
        link={
          <SimpleText text="salam" onPress={() => console.log('success')} />
        }
      />
      <FailTransaction></FailTransaction>
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
