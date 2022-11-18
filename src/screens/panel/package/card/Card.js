import React, {useState} from 'react';

import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
  BigBoldBlueText,
} from '../../../../styles/Common';
import Translate from '../Translate';
import commonTranslator from '../../../../translator/Common';
import {
  styleCircleBox,
  styleTitle,
  styleDigest,
  styleGiftIcon,
  styleGiftIconParent,
  styleColorWhite,
  styleCard,
  stylePricaPane,
  styleYellowBox,
} from './Style';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane';
import {routes} from '../../../../API/APIRoutes';
import {
  formatPrice,
  getWidthHeight,
  showSuccess,
} from '../../../../services/Utility';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {
  faFaucet,
  faGift,
  faJar,
  faPlaceOfWorship,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../styles/Common/Styles';
import QuizItemCard from '../../../../components/web/QuizItemCard';

function Card(props) {
  const [showRemovePane, setShowRemovePane] = useState(false);

  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);
    props.afterRemove(res.doneIds);
    setShowRemovePane(false);
  };
  let width = getWidthHeight()[0];
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
          kind={'large'}
          icon={faGift}
          parentStyle={{...styleGiftIconParent}}
          style={{...styleGiftIcon}}
        />

        <MyView
          style={{
            ...styleYellowBox,
          }}>
          <SimpleText
            style={{
              ...styleTitle,
              ...styles.BlueBold,
            }}
            text={props.package.title}
          />
          <MyView
            style={{
              ...styleCircleBox,
            }}>
            <SimpleText
              style={{...styleColorWhite, ...styles.BlueBold}}
              text={props.package.offPercent + '%'}
            />
          </MyView>
        </MyView>

        <MyView
          style={{
            ...styleDigest,
            ...styles.justifyContentCenter,
          }}>
          <SimpleText
            style={{...styles.fontSize13, ...styles.BlueBold}}
            text={Translate.grade + ' : ' + props.package.grade.name}
          />
          {props.package.lesson !== undefined && (
            <SimpleText
              style={{...styles.fontSize15, ...styles.BlueBold}}
              text={commonTranslator.lesson + ' : ' + props.package.lesson.name}
            />
          )}
        </MyView>
        <MyView
          style={{
            ...styles.gap10,
            ...styles.flexWrap,
            ...styles.marginTop20,
            // justifyContent: width > 768 ? 'space-around' : 'flex-start',
            margin: width < 768 ? '0 10px' : 0,
          }}>
          <SimpleText
            style={{
              ...styles.BlueBold,
              ...styles.fontSize12,
              ...styles.marginRight20,
            }}
            text={Translate.quizCount + props.package.quizzes}
          />

          {!props.isAdmin && (
            <SimpleText
              style={{
                ...styles.BlueBold,
                ...styles.fontSize12,
                ...styles.marginRight20,
              }}
              text={Translate.registrableCount + props.package.registrable}
            />
          )}
          <SimpleText
            style={{
              ...styles.BlueBold,
              ...styles.fontSize12,
              ...styles.marginRight20,
            }}
            text={Translate.minSelect + props.package.minSelect}
          />
          {props.isAdmin && (
            <SimpleText
              style={{
                ...styles.BlueBold,
                ...styles.fontSize12,
                ...styles.marginRight20,
              }}
              text={Translate.buyersCount + props.package.buyers}
            />
          )}
        </MyView>
        {(props.isStudent === undefined || props.isStudent) && (
          <PhoneView style={{...stylePricaPane}}>
            <PhoneView>
              <SimpleText
                style={{...styles.BlueBold}}
                text={commonTranslator.price}
              />
              <SimpleText
                style={
                  props.package.totalPrice !== props.package.realPrice
                    ? {
                        ...styles.textDecorRed,
                        ...styles.BlueBold,
                      }
                    : {
                        ...styles.BlueBold,
                      }
                }
                text={
                  props.package.totalPrice === 0
                    ? commonTranslator.free
                    : formatPrice(props.package.totalPrice) +
                      ' ' +
                      commonTranslator.priceUnit
                }
              />
              {props.package.totalPrice !== props.package.realPrice && (
                <SimpleText
                  style={{
                    ...styles.BlueBold,
                    ...styles.red,
                    ...styles.marginRight15,
                  }}
                  text={
                    formatPrice(props.package.realPrice) +
                    ' ' +
                    commonTranslator.priceUnit
                  }
                />
              )}
            </PhoneView>
          </PhoneView>
        )}
        {!props.isAdmin && (
          <CommonButton
            onPress={() => props.onPress()}
            title={Translate.buyQuiz}
          />
        )}
        {props.isAdmin && (
          <PhoneView
            style={{
              ...styles.flexNoWrap,
              ...styles.justifyContentCenter,
            }}>
            <CommonButton
              onPress={() => setShowRemovePane(true)}
              title={commonTranslator.delete}
              padding={'unset'}
            />
            <CommonButton
              onPress={() => {
                props.setSelected(props.package);
                props.setMode('edit');
              }}
              theme={'transparent'}
              title={commonTranslator.edit}
              padding={'unset'}
            />
            <CommonButton
              onPress={() => {
                props.setSelected(props.package);
                props.setMode('detail');
              }}
              theme={'dark'}
              title={Translate.showQuiz}
              padding={'unset'}
            />
          </PhoneView>
        )}
      </CommonWebBox>
    </MyView>
  );
}

export default Card;
