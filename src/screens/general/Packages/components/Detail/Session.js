import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import React, {useState} from 'react';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {
  faAngleDown,
  faAngleUp,
  faClock,
  faLock,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import RenderHTML from 'react-native-render-html';
import {styles} from '../../../../../styles/Common/Styles';
import {convertSecToMinWithOutHour} from '../../../../../services/Utility';
import commonTranslator from '../../../../../translator/Common';

function Session(props) {
  const [show, setShow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <CommonWebBox
      btn={
        <PhoneView style={styles.gap15}>
          {props.session.attachesCount !== undefined &&
            props.session.attachesCount > 0 && (
              <PhoneView style={{...styles.gap5, ...styles.marginLeft15}}>
                <SimpleFontIcon kind={'med'} icon={faPaperclip} />
                <SimpleText
                  style={styles.alignSelfCenter}
                  text={props.session.attachesCount}
                />
              </PhoneView>
            )}
          <SimpleFontIcon kind={'med'} icon={faClock} />
          <SimpleText
            style={styles.alignSelfCenter}
            text={convertSecToMinWithOutHour(props.session.duration) + '"'}
          />

          {(props.session.video === null ||
            props.session.video === undefined ||
            props.session.video === 'null' ||
            props.session.video === '') && (
            <SimpleFontIcon kind={'med'} icon={faLock} />
          )}
          <SimpleFontIcon
            onPress={() => setShow(!show)}
            kind={'med'}
            icon={show ? faAngleDown : faAngleUp}
          />
        </PhoneView>
      }
      header={props.session.title}>
      {show && (
        <MyView>
          <MyView
            style={{
              ...styles.textJustify,
              ...{
                maxHeight: showMore ? 'unset' : 100,
                overflow: showMore ? 'unset' : 'hidden',
              },
            }}>
            <RenderHTML
              contentWidth={'100%'}
              source={{
                html: props.session.description,
              }}
            />
          </MyView>

          {props.session.video !== null &&
            props.session.video !== undefined &&
            props.session.video !== 'null' &&
            props.session.video !== '' && (
              <SimpleText
                onPress={() => props.setSelectedSession(props.session)}
                style={{
                  ...styles.yellow_color,
                  ...styles.alignSelfEnd,
                  ...styles.cursor_pointer,
                }}
                text={'رفتن به جلسه'}
              />
            )}

          {(props.session.video === null ||
            props.session.video == undefined ||
            props.session.video === 'null' ||
            props.session.video === '') && (
            <SimpleText
              onPress={() => setShowMore(!showMore)}
              style={{
                ...styles.yellow_color,
                ...styles.alignSelfEnd,
                ...styles.cursor_pointer,
              }}
              text={
                showMore ? commonTranslator.showLess : commonTranslator.showMore
              }
            />
          )}
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Session;
