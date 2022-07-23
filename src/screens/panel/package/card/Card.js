import {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {TextIcon, TinyTextIcon} from '../../../../styles/Common/TextIcon';
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
  styleGiftIcon,
  styleGiftIconParent,
  styleColorWhite,
} from './Style';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faGift} from '@fortawesome/free-solid-svg-icons';
import vars from '../../../../styles/root';
function Card(props) {
  const [showRemovePane, setShowRemovePane] = useState(false);

  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);
    props.afterRemove(res.doneIds);
    setShowRemovePane(false);
  };

  return (
    <View>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          url={routes.removePackages}
          expected={['excepts', 'doneIds']}
          data={{items: [props.package.id]}}
          afterFunc={afterRemove}
          toggleShowPopUp={() => setShowRemovePane(false)}
        />
      )}
      <CommonWebBox width={390} style={{height: 250}}>
        <SimpleFontIcon
          kind={'normal'}
          icon={faGift}
          parentStyle={{...styleGiftIconParent}}
          style={{...styleGiftIcon}}
        />

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
          <SimpleText
            style={{...styleColorWhite}}
            text={props.package.offPercent + '%'}
          />
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
                  text={props.package.buyers}
                />
              </View>
            )}
          </PhoneView>
        </View>

        <View>
          <PhoneView style={{...stylePhoneViewForButtonAndPrice}}>
            {props.isAdmin && (
              <PhoneView>
                <SimpleText style={{}} text={'قیمت :'} />
              </PhoneView>
            )}
            {props.isAdmin && <CommonButton title={Translate.buyQuiz} />}
            {!props.isAdmin && (
              <PhoneView style={styleJustifyContentEnd}>
                <CommonButton
                  onPress={() => setShowRemovePane(true)}
                  title={commonTranslator.delete}
                />
                <CommonButton
                  theme={'transparent'}
                  title={commonTranslator.edit}
                />
                <CommonButton theme={'dark'} title={Translate.showQuiz} />
              </PhoneView>
            )}
          </PhoneView>
        </View>
      </CommonWebBox>
    </View>
  );
}

export default Card;
