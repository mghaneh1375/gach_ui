import React, {useState} from 'react';
import {faCalendar, faClock, faInfo} from '@fortawesome/free-solid-svg-icons';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {Image} from 'react-native';
import {styles} from '../../../../../styles/Common/Styles';
import QuizItemCard from '../../../../../components/web/QuizItemCard';
import Translator from '../../../../advisorPanel/Teach/Schedule/components/Translator';
import vars from '../../../../../styles/root';
import Circle from '../../../../../components/web/Circle';

function Card(props) {
  const [showMore, setShowMore] = useState(false);
  const [pic, setPic] = useState();

  React.useEffect(() => {
    setPic(props.plan.teacher.pic);
  }, [props.plan.teacher.pic]);

  return (
    <CommonWebBox title={props.plan.title}>
      <PhoneView style={{...styles.justifyContentCenter}}>
        <PhoneView
          style={{
            border: '2px solid',
            borderColor: 'red',
            borderRadius: '50%',
            marginTop: '-30px',
            width: '80px',
            height: '80px',
            padding: '15px',
            backgroundColor: 'white',
          }}>
          <Image
            resizeMode="contain"
            style={{
              width: '100%',
              height: '100%',
              alignSelf: 'center',
            }}
            source={{uri: pic}}
          />
        </PhoneView>
      </PhoneView>
      <EqualTwoTextInputs
        style={{
          ...styles.alignItemsCenter,
          ...styles.paddingRight15,
          backgroundColor: vars.YELLOW_WHITE,
          borderRadius: 5,
          height: 40,
          marginRight: 0,
        }}>
        <SimpleText
          style={{...styles.BlueBold, ...styles.fontSize15}}
          text={'استاد ' + props.plan.teacher.name}
        />

        <PhoneView
          style={{
            ...styles.positionAbsolute,
            top: -5,
            left: 15,
            ...styles.gap15,
          }}>
          <SimpleText
            style={{...styles.colorDarkBlue, ...styles.alignSelfCenter}}
            text={'امتیاز'}
          />
          <Circle
            diameter={50}
            text={
              props.plan.teacher.teachRate === 0
                ? '-'
                : props.plan.teacher.teachRate
            }
            color={vars.WHITE}
            backgroundColor={vars.ORANGE_RED}
          />
        </PhoneView>
      </EqualTwoTextInputs>

      {props.plan.description !== undefined && props.plan.description !== '' && (
        <MyView
          style={{
            minHeight: showMore ? 260 : 70,
            maxHeight: showMore ? 'unset' : 70,
          }}>
          <SimpleText
            style={{
              ...styles.dark_blue_color,
              ...{
                maxHeight: showMore ? 'unset' : 50,
                overflow: showMore ? 'unset' : 'hidden',
              },
            }}
            text={'توضیحات: ' + props.plan.description}
          />
          {showMore && (
            <SimpleText
              style={{
                ...styles.yellow_color,
                ...styles.alignSelfEnd,
                ...styles.cursor_pointer,
              }}
              text={'نمایش کمتر'}
              onPress={() => setShowMore(false)}
            />
          )}

          {!showMore && (
            <SimpleText
              style={{
                ...styles.yellow_color,
                ...styles.alignSelfEnd,
                ...styles.cursor_pointer,
              }}
              text={'نمایش بیشتر'}
              onPress={() => setShowMore(true)}
            />
          )}
        </MyView>
      )}

      {!showMore && (
        <>
          <PhoneView style={{...styles.gap15}}>
            <QuizItemCard
              text={Translator.start}
              val={props.plan.startAt}
              icon={faCalendar}
              background={false}
              iconFontSize={'normal'}
              color={vars.YELLOW}
              textFontSize={14}
              valFontSize={14}
              isBold={false}
            />
            <QuizItemCard
              text={Translator.teachMode}
              val={props.plan.teachMode === 'private' ? 'خصوصی' : 'نیمه خصوصی'}
              icon={faInfo}
              background={false}
              iconFontSize={'normal'}
              color={vars.YELLOW}
              textFontSize={14}
              valFontSize={14}
              isBold={false}
            />
          </PhoneView>
          <PhoneView>
            <QuizItemCard
              text={Translator.duration}
              val={props.plan.length}
              icon={faClock}
              background={false}
              iconFontSize={'normal'}
              color={vars.YELLOW}
              textFontSize={14}
              valFontSize={14}
              isBold={false}
            />
          </PhoneView>
        </>
      )}
      {props.plan.skyRoomUrl !== undefined && props.plan.skyRoomUrl !== '' && (
        <CommonButton
          onPress={() => window.open(props.plan.skyRoomUrl)}
          title={Translator.goToSkyRoom}
          theme={'dark'}
        />
      )}
    </CommonWebBox>
  );
}

export default Card;
