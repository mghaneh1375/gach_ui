import React from 'react';
import {faClose, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {MyView, SimpleText} from '../../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../../styles/Common/FontIcon';
import vars from '../../../../../../styles/root';
import {style} from './style';
import {Pressable} from 'react-native';

const AttachBox = props => {
  const getFileExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  let text, background, textColor;

  switch (getFileExtension(props.filename)[0]) {
    case 'docx':
      text = 'Word';
      background = vars.ORANGE;
      textColor = vars.ORANGE_RED;
      break;
    case 'pdf':
      text = 'PDF';
      background = vars.ORANGE;
      textColor = vars.DARK_BLUE;
      break;
    case 'xls':
    case 'xlsx':
      text = 'Excel';
      background = vars.ORANGE;
      textColor = vars.ORANGE;
      break;
  }

  const isImg =
    props.filename.indexOf('.docx') === -1 &&
    props.filename.indexOf('.xls') === -1 &&
    props.filename.indexOf('.xlsx') === -1 &&
    props.filename.indexOf('.pdf') === -1;

  return (
    <MyView style={style.container}>
      {props.removeAttach !== undefined && (
        <MyView style={style.close}>
          <SimpleFontIcon
            onPress={props.removeAttach}
            style={{color: vars.ORANGE_RED}}
            icon={faClose}
          />
        </MyView>
      )}

      {!isImg && (
        <Pressable
          onPress={props.onClick}
          style={{
            ...style.box,
            ...{
              background: background,
            },
          }}>
          <MyView style={style.icon}>
            <SimpleFontIcon
              style={{color: textColor}}
              kind={'normal'}
              icon={faPaperclip}
            />
          </MyView>
          <SimpleText
            style={{
              ...style.text,
              ...{
                color: textColor,
              },
            }}
            text={text}
          />
        </Pressable>
      )}
      {isImg && props.icon === undefined && (
        <img
          style={{width: 100, height: 80, borderRadius: 1}}
          src={
            props.fileContent === undefined ? props.filename : props.fileContent
          }
        />
      )}
      {isImg && props.icon !== undefined && (
        <MyView
          style={{
            ...style.box,
            ...{
              background: background,
            },
          }}>
          <MyView style={style.imgIcon}>
            <SimpleFontIcon
              onPress={() => props.onClick()}
              style={{color: textColor}}
              kind={'normal'}
              icon={props.icon}
            />
          </MyView>
          <img
            style={{width: 100, height: 80, borderRadius: 1}}
            src={
              props.fileContent === undefined
                ? props.filename
                : props.fileContent
            }
          />
        </MyView>
      )}
      {props.fileContent !== undefined && (
        <SimpleText text={props.filename} style={style.filename} />
      )}
    </MyView>
  );
};

export default AttachBox;
