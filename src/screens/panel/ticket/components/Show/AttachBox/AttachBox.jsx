import {faClose, faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {SimpleText} from '../../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../../styles/Common/FontIcon';
import vars from '../../../../../../styles/root';
import {style} from './style';

const AttachBox = props => {
  const getFileExtension = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  let text, background, textColor;

  switch (getFileExtension(props.filename)[0]) {
    case 'docx':
      text = 'Word';
      background = 'blue';
      textColor = vars.ORANGE_RED;
      break;
    case 'pdf':
      text = 'PDF';
      background = 'red';
      textColor = vars.DARK_BLUE;
      break;
    case 'xls':
    case 'xlsx':
      text = 'Excel';
      background = 'green';
      textColor = vars.ORANGE_RED;
      break;
  }

  const isImg =
    props.filename.indexOf('.docx') === -1 &&
    props.filename.indexOf('.xls') === -1 &&
    props.filename.indexOf('.xlsx') === -1 &&
    props.filename.indexOf('.pdf') === -1;

  return (
    <View style={style.container}>
      <View style={style.close}>
        <SimpleFontIcon
          onPress={props.removeAttach}
          style={{color: vars.ORANGE_RED}}
          icon={faClose}
        />
      </View>

      {!isImg && (
        <View
          style={{
            ...style.box,
            ...{
              background: background,
            },
          }}>
          <View style={style.icon}>
            <SimpleFontIcon
              style={{color: textColor}}
              kind={'normal'}
              icon={faPaperclip}
            />
          </View>
          <SimpleText
            style={{
              ...style.text,
              ...{
                color: textColor,
              },
            }}
            text={text}
          />
        </View>
      )}
      {isImg && (
        <img style={{width: 150, borderRadius: 10}} src={props.fileContent} />
      )}
      <SimpleText text={props.filename} style={style.filename} />
    </View>
  );
};

export default AttachBox;
