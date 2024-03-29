import {faMedal, faPlane, faQuestion} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Image} from 'react-native';
import {globalStateContext} from '../../../App';
import Circle from '../../../components/web/Circle';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';

function BoxRanking(props) {
  const [pic, setPic] = useState();

  React.useEffect(() => {
    setPic(props.pic);
  }, [props.pic]);

  const useGlobalState = () => [React.useContext(globalStateContext)];

  const [state] = useGlobalState();

  return (
    <CommonWebBox width={state.isInPhone ? 320 : 390}>
      <Circle
        style={{
          ...styles.positionAbsolute,
          marginRight: state.isInPhone ? -45 : -75,
          ...styles.marginTop20,
        }}
        child={
          pic !== undefined && (
            <Image
              style={{
                width: state.isInPhone ? 90 : 140,
                height: state.isInPhone ? 90 : 140,
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              source={pic}
            />
          )
        }
        diameter={state.isInPhone ? 100 : 150}
        backgroundColor={vars.YELLOW_WHITE}></Circle>
      <PhoneView
        style={{
          ...styles.positionAbsolute,
          top: -25,
          left: 15,
          ...styles.gap15,
        }}>
        <SimpleText
          style={{...styles.colorDarkBlue, ...styles.alignSelfCenter}}
          text={props.useFilter ? 'رتبه در پایه تحصیلی' : 'رتبه در آیریسک'}
        />
        <Circle
          diameter={50}
          text={props.rank}
          color={vars.DARK_BLUE}
          backgroundColor={vars.YELLOW_WHITE}
        />
      </PhoneView>
      <MyView
        style={{paddingRight: 70, ...styles.gap15, ...styles.marginTop20}}>
        <PhoneView style={{...styles.justifyContentSpaceBetween}}>
          <QuizItemCard
            textFontSize={10}
            valFontSize={16}
            text={'تعداد آزمون شرکت کرده '}
            val={props.valQuiz}
            icon={faQuestion}
            iconFontSize={'normal'}
            color={vars.ORANGE}
          />
          <QuizItemCard
            textFontSize={10}
            valFontSize={16}
            text={'جمع امتیاز'}
            val={props.valScore}
            icon={faMedal}
            iconFontSize={'normal'}
            backgroundColor={vars.ORANGE}
            color={vars.ORANGE}
          />
        </PhoneView>
        <MyView
          style={{
            ...styles.justifyContentCenter,
            ...styles.paddingRight15,
            backgroundColor: vars.YELLOW_WHITE,
            borderRadius: 5,
            height: 40,
            marginRight: 0,
          }}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={'نام و نام خانوادگی :' + ' ' + props.name}
          />
        </MyView>
        <MyView style={{marginTop: -10, ...styles.gap5}}>
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'مدرسه : ' + ' ' + props.school}
          />
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'شهر : ' + ' ' + props.city}
          />
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'پایه : ' + ' ' + props.grade}
          />
          {props.field !== undefined && props.field !== '' && (
            <SimpleText
              style={{...styles.colorDarkBlue}}
              text={'رشته : ' + ' ' + props.field}
            />
          )}
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default BoxRanking;
