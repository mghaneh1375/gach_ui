import React from 'react';
import {CommonWebBox, PhoneView, MyView} from '../../../../../styles/Common';
import Card from '../../card/Card';
import commonTranslator from '../../../../../translator/Common';

function List(props) {
  return (
    <CommonWebBox
      header={commonTranslator.packageQuiz}
      addBtn={true}
      onAddClick={() => props.setMode('create')}>
      <MyView>
        <PhoneView style={{gap: 15, paddingRight: 5}}>
          {props.packages !== undefined &&
            props.packages.map((package_, index) => {
              return (
                <Card
                  afterRemove={props.afterRemove}
                  isAdmin={props.isAdmin}
                  isStudent={!props.isAdmin}
                  key={index}
                  package={package_}
                  setLoading={props.setLoading}
                  token={props.token}
                  setMode={props.setMode}
                  setSelected={props.setSelected}
                />
              );
            })}
        </PhoneView>
      </MyView>
    </CommonWebBox>
  );
}

export default List;
