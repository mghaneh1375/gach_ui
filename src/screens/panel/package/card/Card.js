import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {TinyTextIcon} from '../../../../styles/Common/TextIcon';
import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';
import {
  styleCommonWebBoxView,
  styleLittleView,
  styleSimpleTextTitle,
  styleViewWithGrade,
  styleFont13,
  styleViewThreeChild,
  styleTinyTextIcon,
  styleFontSize11,
  styleJustifyContentBetween,
  styleFontSize15,
  stylePhoneViewForButtonAndPrice,
  styleJustifyContentEnd,
} from './Style';
function Card(props) {
  return (
    <CommonWebBox width={390} style={{height: 250}}>
      <View
        style={{
          ...styleCommonWebBoxView,
        }}>
        <SimpleText
          style={{
            ...styleSimpleTextTitle,
          }}
          text={props.package.title}
        />
      </View>
      <View
        style={{
          ...styleLittleView,
        }}>
        <SimpleText text={props.package.offPercent} />
      </View>
      <View
        style={{
          ...styleViewWithGrade,
        }}>
        <SimpleText
          style={{...styleFont13}}
          text={commonTranslator.grade + ' : ' + props.package.grade}
        />
        <SimpleText
          style={{...styleFont13}}
          text={commonTranslator.lesson + ' : ' + props.package.lesson}
        />
      </View>
      <View style={{...styleViewThreeChild}}>
        <PhoneView style={{...styleJustifyContentBetween}}>
          <View>
            <TinyTextIcon style={{...styleTinyTextIcon}} />
            <SimpleText
              style={{...styleFontSize11}}
              text={Translate.quizCount}
            />
            <SimpleText
              style={{...styleFontSize15}}
              text={props.package.quizzes}
            />
          </View>
          {props.isAdmin && (
            <View>
              <TinyTextIcon style={{...styleTinyTextIcon}} />
              <SimpleText
                style={{...styleFontSize11}}
                text={Translate.minSelect}
              />
              <SimpleText
                style={{...styleFontSize15}}
                text={props.package.minSelect}
              />
            </View>
          )}

          {props.isAdmin && (
            <View>
              <TinyTextIcon style={{...styleTinyTextIcon}} />
              <SimpleText
                style={{...styleFontSize11}}
                text={Translate.buyersCount}
              />
              <SimpleText
                style={{...styleFontSize15}}
                text={props.package.buyersCount}
              />
            </View>
          )}
        </PhoneView>
      </View>

      <View>
        <PhoneView style={{...stylePhoneViewForButtonAndPrice}}>
          {!props.isAdmin && (
            <PhoneView>
              <SimpleText text="تومان 30.000     10.000" />
            </PhoneView>
          )}
          {!props.isAdmin && <CommonButton title={Translate.buyQuiz} />}
          {props.isAdmin && (
            <PhoneView style={styleJustifyContentEnd}>
              <CommonButton title={commonTranslator.delete} />
              <CommonButton title={commonTranslator.edit} />
            </PhoneView>
          )}
        </PhoneView>
      </View>
    </CommonWebBox>
  );
}

export default Card;
