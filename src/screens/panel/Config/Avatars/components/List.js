import React from 'react';
import {CommonWebBox, MyView, PhoneView} from '../../../../../styles/Common';
import Show from './Show/Show';
import translator from '../Translator';
import MakeQuiz from '../../../../studentPanel/MakeQuiz/MakeQuiz';
import {RoleCard} from '../../../../../styles/Common/RoleCard';
import vars from '../../../../../styles/root';
import BoxRanking from '../../../../general/BoxRanking/BoxRanking';
import {Circle} from 'victory-core';
// import WheelsOfPrizes from '../../../../../components/web/WheelsOfPrizes/WheelsOfPrizes';

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
      <PhoneView style={{marginRight: 70, marginTop: 20, gap: 50}}>
        <BoxRanking
          school={'بیذسیب'}
          grade={'دبیرستان'}
          name={'البرز منشی زادگان'}
          city={'تعران'}
          valScore={'30 امتیاز'}
          valQuiz={'9000  آزمون'}
          field={'نرمییی'}
          rank={'1000'}
        />
        <BoxRanking
          school={'بیذسیب'}
          grade={'دبیرستان'}
          name={'البرز منشی زادگان'}
          city={'تعران'}
          valScore={'30 امتیاز'}
          valQuiz={'9000  آزمون'}
          field={'نرمییی'}
          rank={'1000'}
        />
        <BoxRanking
          school={'بیذسیب'}
          grade={'دبیرستان'}
          name={'البرز منشی زادگان'}
          city={'تعران'}
          valScore={'30 امتیاز'}
          valQuiz={'9000  آزمون'}
          field={'نرمییی'}
          rank={'1000'}
        />
      </PhoneView>
      <RoleCard
        text={translator.avatars}
        style={{marginTop: 20}}
        color={vars.ORANGE}
        source={require('../../../../../images/student.png')}
      />
      <MakeQuiz />
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
