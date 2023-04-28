import React, {useState} from 'react';
import {faMedal, faQuestion} from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-native';
import {globalStateContext} from '../../../App';
import Circle from '../../../components/web/Circle';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';

function Card(props) {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  const [pic, setPic] = useState();

  React.useEffect(() => {
    setPic(props.data.pic);
  }, [props.data.pic]);

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
          text={'امتیاز'}
        />
        <Circle
          diameter={50}
          text={props.data.rate === 0 ? '-' : props.data.rate}
          color={vars.DARK_BLUE}
          backgroundColor={vars.YELLOW_WHITE}
        />
      </PhoneView>
      <MyView
        style={{paddingRight: 80, ...styles.gap15, ...styles.marginTop20}}>
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
            text={'نام و نام خانوادگی :' + ' ' + props.data.name}
          />
          {props.isMyAdvisor && (
            <SimpleText
              style={{...styles.BlueBold, ...styles.fontSize15, ...styles.red}}
              text={'مشاور من'}
            />
          )}
        </MyView>
        <MyView style={{marginTop: -10, ...styles.gap5}}>
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'تعداد دانش آموزان : ' + ' ' + props.data.stdCount}
          />
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'درباره مشاور : ' + ' ' + props.data.bio}
          />

          {!props.isMyAdvisor &&
            props.data.acceptStd &&
            !props.hasOpenRequest &&
            state.token !== undefined &&
            state.token !== null && (
              <CommonButton
                onPress={() => props.onSelect()}
                title={'درخواست مشاوره'}
              />
            )}
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
