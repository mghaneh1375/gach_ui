import {Image} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import React, {useState} from 'react';
import vars from '../../../../styles/root';
import {styles} from '../../../../styles/Common/Styles';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import {faClock, faListSquares, faSun} from '@fortawesome/free-solid-svg-icons';
import {
  convertSecToMinWithOutSec,
  formatPrice,
} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';

function Card(props) {
  const [img, setImg] = useState();

  React.useEffect(() => {
    setImg(props.package.img);
  }, [props.package.img]);

  const fontSize = props.isInPhone ? 10 : 11;
  const valFontSize = props.isInPhone ? 12 : 15;

  return (
    <CommonWebBox width={350}>
      <Image
        style={{
          width: '100%',
          height: 200,
        }}
        resizeMode="cover"
        source={img}
      />
      <PhoneView
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: -35,
          paddingRight: 10,
          paddingTop: 5,
          paddingBottom: 5,
          backgroundColor: vars.SOLID_CREAM,
        }}>
        <SimpleText style={styles.BlueBold} text={props.package.title} />
      </PhoneView>
      <PhoneView>
        <QuizItemCard
          text={'مدت دوره'}
          val={convertSecToMinWithOutSec(props.package.duration)}
          icon={faClock}
          color={vars.YELLOW}
          textFontSize={fontSize}
          valFontSize={valFontSize}
        />
        <QuizItemCard
          text={'تعداد جلسات'}
          val={props.package.sessionsCount}
          icon={faListSquares}
          textFontSize={fontSize}
          color={vars.YELLOW}
          valFontSize={valFontSize}
        />
        <QuizItemCard
          text={'گواهی دوره'}
          val={props.package.hasCert ? 'دارد' : 'ندارد'}
          icon={faSun}
          color={vars.YELLOW}
          textFontSize={fontSize}
          valFontSize={valFontSize}
        />
      </PhoneView>
      <SimpleText
        style={styles.BlueBold}
        text={'نام استاد: ' + props.package.teacher}
      />
      <EqualTwoTextInputs>
        <SimpleText
          style={{
            ...styles.fontSize20,
            ...styles.BlueBold,
            ...styles.alignSelfCenter,
          }}
          text={
            formatPrice(props.package.price) + ' ' + commonTranslator.priceUnit
          }
        />
        <CommonButton onPress={() => props.onClick()} title={'انتخاب دوره'} />
      </EqualTwoTextInputs>

      <PhoneView style={styles.gap10}>
        {props.package.tags.map((elem, index) => {
          return <SimpleText key={index} text={'#' + elem} />;
        })}
      </PhoneView>
    </CommonWebBox>
  );
}

export default Card;
