import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../styles/Common';
import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';
import {
  styleCommonWebBoxView,
  styleLittleView,
  styleTitle,
  styleDigest,
  styleFontSize13,
  styleFontSize11,
  styleFontSize15,
  styleJustifyContentEnd,
  styleGiftIcon,
  styleGiftIconParent,
  styleColorWhite,
  styleTextDecorRed,
  styleItemsGrandParent,
  styleItemsParent,
  styleItem,
  styleCard,
  stylePricaPane,
} from './Style';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {routes} from '../../../../API/APIRoutes';
import {showSuccess} from '../../../../services/Utility';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faGift} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../styles/Common/Styles';

function Card(props) {
  const [showRemovePane, setShowRemovePane] = useState(false);

  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);
    props.afterRemove(res.doneIds);
    setShowRemovePane(false);
  };

  return (
    <MyView>
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
      <CommonWebBox style={{...styleCard}}>
        <SimpleFontIcon
          kind={'normal'}
          icon={faGift}
          parentStyle={{...styleGiftIconParent}}
          style={{...styleGiftIcon}}
        />

        <MyView
          style={{
            ...styleCommonWebBoxView,
          }}>
          <SimpleText
            style={{
              ...styleTitle,
            }}
            text={props.package.title}
          />
        </MyView>
        <MyView
          style={{
            ...styleLittleView,
          }}>
          <SimpleText
            style={{...styleColorWhite}}
            text={props.package.offPercent + '%'}
          />
        </MyView>
        <MyView
          style={{
            ...styleDigest,
          }}>
          <SimpleText
            style={{...styleFontSize13}}
            text={commonTranslator.grade + ' : ' + props.package.grade.name}
          />
          <SimpleText
            style={{...styleFontSize13}}
            text={commonTranslator.lesson + ' : ' + props.package.lesson.name}
          />
        </MyView>
        <PhoneView
          style={{
            ...styles.gap50,
            ...styles.flexWrap,
            ...styles.justifyContentSpaceAround,
            ...styles.marginTop20,
          }}>
          <MyView>
            <SimpleText
              style={{...styleFontSize11}}
              text={Translate.quizCount}
            />
            <SimpleText
              style={{...styleFontSize15}}
              text={props.package.quizzes}
            />
          </MyView>

          {props.isAdmin && (
            <MyView>
              <SimpleText
                style={{...styleFontSize11}}
                text={Translate.minSelect}
              />
              <SimpleText
                style={{...styleFontSize15}}
                text={props.package.minSelect}
              />
            </MyView>
          )}
          {props.isAdmin && (
            <MyView>
              <SimpleText
                style={{...styleFontSize11}}
                text={Translate.buyersCount}
              />
              <SimpleText
                style={{...styleFontSize15}}
                text={props.package.buyers}
              />
            </MyView>
          )}
        </PhoneView>

        <PhoneView style={{...stylePricaPane}}>
          {!props.isAdmin && (
            <PhoneView>
              <SimpleText text={'قیمت : '} />
              <SimpleText
                style={{
                  ...styleTextDecorRed,
                }}
                text={' 30.000 ' + 'تومان'}
              />
              <SimpleText text={' 10.000 ' + 'تومان'} />
            </PhoneView>
          )}
          {!props.isAdmin && <CommonButton title={Translate.buyQuiz} />}
          {props.isAdmin && (
            <PhoneView style={styles.flexNoWrap}>
              <CommonButton
                onPress={() => setShowRemovePane(true)}
                title={commonTranslator.delete}
                padding={'lite'}
              />
              <CommonButton
                onPress={() => {
                  props.setSelected(props.package);
                  props.setMode('edit');
                }}
                theme={'transparent'}
                title={commonTranslator.edit}
                padding={'lite'}
              />
              <CommonButton
                onPress={() => {
                  props.setSelected(props.package);
                  props.setMode('detail');
                }}
                theme={'dark'}
                title={Translate.showQuiz}
                padding={'lite'}
              />
            </PhoneView>
          )}
        </PhoneView>
      </CommonWebBox>
    </MyView>
  );
}

export default Card;
