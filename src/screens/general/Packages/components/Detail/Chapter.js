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
import {
  convertSecToMinWithOutHour,
  systemFonts,
  tagsStyles,
} from '../../../../../services/Utility';
import Session from './Session';

function Chapter(props) {
  const [show, setShow] = useState(false);
  const [sessions, setSessions] = useState();
  const [showSessions, setShowSessions] = useState(true);

  React.useEffect(() => {
    setSessions(props.sessions);
  }, [props.sessions]);

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
              tagsStyles={tagsStyles}
              systemFonts={systemFonts}
            />
          </MyView>

          <MyView style={{...styles.gap15, ...styles.marginTop20}}>
            {showSessions &&
              sessions !== undefined &&
              sessions.map((elem, index) => {
                return (
                  <Session
                    user={props.user}
                    navigate={props.navigate}
                    setSelectedSession={s => {
                      props.onPressSession(elem.id);
                    }}
                    session={elem}
                    key={index}
                    isFree={props.isFree}
                    index={index}
                  />
                );
              })}
          </MyView>

          <SimpleText
            onPress={() => setShowSessions(!showSessions)}
            style={{
              ...styles.yellow_color,
              ...styles.alignSelfEnd,
              ...styles.cursor_pointer,
              ...styles.paddingTop10,
            }}
            text={showSessions ? 'بستن جلسات' : 'مشاهده جلسات'}
          />
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Chapter;
