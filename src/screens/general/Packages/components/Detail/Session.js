import {
  EqualTwoTextInputs,
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
  faPlay,
} from '@fortawesome/free-solid-svg-icons';
import RenderHTML from 'react-native-render-html';
import {styles} from '../../../../../styles/Common/Styles';
import {
  convertSecToMin,
  convertSecToMinWithOutHour,
  systemFonts,
  tagsStyles,
} from '../../../../../services/Utility';
import {SimpleTextIcon} from '../../../../../styles/Common/TextIcon';

function Session(props) {
  const [show, setShow] = useState(true);
  const [showMore, setShowMore] = useState(true);

  return (
    <MyView style={{...styles.borderBottom1, ...styles.paddingBottomUp5}}>
      <EqualTwoTextInputs>
        <SimpleText
          text={'جلسه ' + (props.index + 1) + ': ' + props.session.title}
          style={{...styles.BlueBold}}
        />
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
            text={
              props.session.duration > 3600
                ? convertSecToMin(props.session.duration) + '"'
                : convertSecToMinWithOutHour(props.session.duration) + '"'
            }
          />

          {(props.session.video === null ||
            props.session.video === undefined ||
            props.session.video === 'null' ||
            props.session.video === '') && (
            <SimpleFontIcon kind={'med'} style={{color: 'red'}} icon={faLock} />
          )}
          <SimpleFontIcon
            onPress={() => setShow(!show)}
            kind={'med'}
            icon={show ? faAngleDown : faAngleUp}
          />
        </PhoneView>
      </EqualTwoTextInputs>
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
              tagsStyles={tagsStyles}
              systemFonts={systemFonts}
            />
          </MyView>

          {props.session.video !== null &&
            props.session.video !== undefined &&
            props.session.video !== 'null' &&
            props.session.video !== '' && (
              <>
                {props.isFree &&
                  props.user === null &&
                  props.session.price > 0 && (
                    <SimpleText
                      onPress={() => props.navigate('/login')}
                      style={{
                        ...styles.alignSelfEnd,
                        ...styles.yellow_color,
                        ...styles.cursor_pointer,
                        ...styles.fontSize17,
                        ...{
                          direction: 'ltr',
                        },
                      }}
                      text={
                        'برای ورود به جلسه باید ابتدا در سامانه ورود کرده باشید'
                      }
                    />
                  )}
                {(!props.isFree ||
                  props.user !== null ||
                  props.session.price == 0) && (
                  <SimpleTextIcon
                    onPress={() => props.setSelectedSession(props.session)}
                    style={{
                      ...styles.alignSelfEnd,
                      ...{
                        direction: 'ltr',
                      },
                    }}
                    iconStyle={{...styles.yellow_color}}
                    textStyle={{
                      ...styles.yellow_color,
                      ...styles.cursor_pointer,
                      ...styles.fontSize22,
                    }}
                    icon={faPlay}
                    text={'رفتن به جلسه'}
                  />
                )}
              </>
            )}

          {/* {(props.session.video === null ||
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
          )} */}
        </MyView>
      )}
    </MyView>
  );
}

export default Session;
