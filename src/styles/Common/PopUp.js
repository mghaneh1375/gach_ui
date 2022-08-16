import React from 'react';
import {CommonButton, CommonWebBox, PhoneView, MyView} from '../Common';
import translator from '../../tranlates/Common';
import {TextIcon} from './TextIcon';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {styles} from './Styles';

const modal = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(230,230,230,0.8)',
    height: '100vh',
    top: 0,
    left: 0,
    width: '100%',
    position: 'fixed',
    zIndex: 20,
  },
  box: {
    position: 'absolute',
    left: 0,
    right: 200,
    top: 90,
  },
  marginBottom20: {
    marginBottom: 20,
  },
  padding0: {
    padding: 0,
  },
  padding5and30: {
    padding: '5px 30px',
  },
};

export function LargePopUp(props) {
  return (
    <MyView style={modal.container}>
      <CommonWebBox
        style={modal.box}
        child={
          <MyView>
            <TextIcon
              style={{...modal.marginBottom20, ...modal.padding0}}
              onPress={() => props.toggleShowPopUp()}
              text={props.title}
              icon={faClose}
            />
            {props.children}
            <PhoneView style={{...styles.marginTop20}}>
              {props.btns}
              {(props.removeCancel === undefined || !props.removeCancel) && (
                <CommonButton
                  style={{...modal.padding5and30}}
                  onPress={() => props.toggleShowPopUp()}
                  title={translator.cancel}
                />
              )}
            </PhoneView>
          </MyView>
        }
      />
    </MyView>
  );
}
