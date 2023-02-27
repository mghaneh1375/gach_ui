import {
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
  faListNumeric,
} from '@fortawesome/free-solid-svg-icons';
import RenderHTML from 'react-native-render-html';
import {styles} from '../../../../../styles/Common/Styles';
import {convertSecToMinWithOutHour} from '../../../../../services/Utility';

function Chapter(props) {
  const [show, setShow] = useState(false);

  return (
    <CommonWebBox
      btn={
        <PhoneView style={styles.gap15}>
          <SimpleFontIcon kind={'med'} icon={faListNumeric} />
          <SimpleText
            style={styles.alignSelfCenter}
            text={'تعداد جلسات: ' + props.chapter.sessions}
          />

          <SimpleFontIcon kind={'med'} icon={faClock} />
          <SimpleText
            style={styles.alignSelfCenter}
            text={convertSecToMinWithOutHour(props.chapter.duration) + '"'}
          />

          <SimpleFontIcon
            onPress={() => setShow(!show)}
            kind={'med'}
            icon={show ? faAngleDown : faAngleUp}
          />
        </PhoneView>
      }
      header={props.chapter.title}>
      {show && (
        <MyView>
          <MyView
            style={{
              ...styles.textJustify,
            }}>
            <RenderHTML
              contentWidth={'100%'}
              source={{
                html: props.chapter.description,
              }}
            />
          </MyView>

          <SimpleText
            onPress={() => props.setSelectedChapter(props.chapter)}
            style={{
              ...styles.yellow_color,
              ...styles.alignSelfEnd,
              ...styles.cursor_pointer,
            }}
            text={'مشاهده جلسات'}
          />
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Chapter;
