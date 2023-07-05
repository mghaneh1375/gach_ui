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
import {
  faCancel,
  faCheck,
  faClock,
  faListSquares,
  faRemove,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import {
  convertSecToMinWithOutSec,
  formatPrice,
} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';
import {Translator} from '../Translator';
import {Rating} from 'react-native-ratings';
import {
  styleCircleBox,
  styleColorWhite,
  stylePricaPane,
  styleTitle,
  styleYellowBox,
} from '../../../panel/package/card/Style';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';

function Card(props) {
  const [img, setImg] = useState();

  React.useEffect(() => {
    setImg(props.package.img);
  }, [props.package.img]);

  const fontSize = props.isInPhone ? 10 : 11;
  const valFontSize = props.isInPhone ? 12 : 15;

  return (
    <CommonWebBox width={props.isInPhone ? 320 : 350}>
      <Image
        style={{
          width: '100%',
          height: 200,
        }}
        resizeMode="contain"
        source={img}
      />
      <MyView style={{...styles.gap10, ...{minHeight: 230}}}>
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
        <PhoneView style={{gap: 100}}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.margin15}}
            text={props.package.sessionsCount + ' جلسه'}
          />

          {/* <QuizItemCard
            text={Translator.sessionsCount}
            val={props.package.sessionsCount + ' جلسه'}
            icon={faListSquares}
            textFontSize={fontSize}
            color={vars.YELLOW}
            valFontSize={valFontSize}
          /> */}
          {/* <QuizItemCard
            text={Translator.cert}
            iconVal={props.package.hasCert ? faCheck : faRemove}
            iconColor={props.package.hasCert ? vars.GREEN : vars.YELLOW}
            val={'icon'}
            icon={faSun}
            color={vars.YELLOW}
            textFontSize={fontSize}
            valFontSize={valFontSize}
          /> */}
          <PhoneView>
            <SimpleText
              style={{...styles.BlueBold, ...styles.margin15}}
              text={Translator.cert + ' '}
            />
            <SimpleFontIcon
              style={{color: props.package.hasCert ? vars.GREEN : vars.YELLOW}}
              kind={'normal'}
              icon={props.package.hasCert ? faCheck : faRemove}
            />
          </PhoneView>
        </PhoneView>
        <SimpleText
          style={styles.BlueBold}
          text={
            Translator.teacher + commonTranslator.col + props.package.teacher
          }
        />

        {props.package.rate !== undefined && (
          <PhoneView style={{width: '100%', direction: 'ltr'}}>
            <Rating
              type="star"
              readonly={true}
              ratingCount={5}
              imageSize={30}
              fractions={2}
              style={{
                direction: 'ltr',
              }}
              startingValue={props.package.rate}
            />
          </PhoneView>
        )}

        <EqualTwoTextInputs style={{...styles.flexNoWrap}}>
          {!props.isInMyMode && (
            <PhoneView style={{...styles.alignSelfCenter}}>
              <SimpleText
                style={{...styles.BlueBold}}
                text={commonTranslator.price + ' '}
              />
              <SimpleText
                style={
                  props.package.afterOff !== undefined &&
                  props.package.price !== props.package.afterOff
                    ? {
                        ...styles.textDecorRed,
                        ...styles.BlueBold,
                      }
                    : {
                        ...styles.BlueBold,
                      }
                }
                text={
                  props.package.price === 0
                    ? commonTranslator.free
                    : formatPrice(props.package.price) +
                      ' ' +
                      commonTranslator.priceUnit
                }
              />
              {props.package.afterOff !== undefined &&
                props.package.price !== props.package.afterOff && (
                  <SimpleText
                    style={{
                      ...styles.BlueBold,
                      ...styles.red,
                      ...styles.marginRight15,
                    }}
                    text={
                      formatPrice(props.package.afterOff) +
                      ' ' +
                      commonTranslator.priceUnit
                    }
                  />
                )}
            </PhoneView>
          )}
          {props.isInMyMode && <SimpleText />}
          <CommonButton
            onPress={() => window.open('/packages/' + props.package.slug)}
            title={Translator.select}
          />
        </EqualTwoTextInputs>

        <PhoneView style={styles.gap10}>
          {props.package.tags !== undefined &&
            props.package.tags.map((elem, index) => {
              return <SimpleText key={index} text={'#' + elem} />;
            })}
        </PhoneView>
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
