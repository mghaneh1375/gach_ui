import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from '@/styles';
import Translate from '../translate';
import commonTranslator from '@/translator/common';
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
} from './style';
import ConfirmationBatchOpPane from '../../../../components/web/ConfirmationBatchOpPane.jsx';
import {routes} from '@/api/apiRoutes';
import {formatPrice, getWidthHeight, showSuccess} from '@/services/utility';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import {faGift} from '@fortawesome/free-solid-svg-icons';
import {styles} from '@/styles/common/styles';
import {BASE_SITE_NAME} from '@/api/utility';
function Card(props) {
  const [showRemovePane, setShowRemovePane] = useState(false);
  const afterRemove = res => {
    setShowRemovePane(false);
    showSuccess(res.excepts);
    props.afterRemove(res.doneIds);
    setShowRemovePane(false);
  };
  const width = getWidthHeight()[0];
  return (
    <MyView>
      {showRemovePane && (
        <ConfirmationBatchOpPane
          setLoading={props.setLoading}
          token={props.token}
          url={routes.removePackages}
          expected={['excepts', 'doneIds']}
          data={{
            items: [props.package.id],
          }}
          afterFunc={afterRemove}
          toggleShowPopUp={() => setShowRemovePane(false)}
        />
      )}
      <CommonWebBox
        style={{
          ...styleCard,
        }}>
        <SimpleFontIcon
          kind={'large'}
          icon={faGift}
          parentStyle={{
            ...styleGiftIconParent,
          }}
          style={{
            ...styleGiftIcon,
          }}
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
              style={{
                ...styleColorWhite,
                ...styles.BlueBold,
              }}
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
            style={{
              ...styles.fontSize15,
              ...styles.BlueBold,
            }}
            text={Translate.grade + ' : ' + props.package.grade.name}
          />
          {props.package.lesson !== undefined && (
            <SimpleText
              style={{
                ...styles.fontSize15,
                ...styles.BlueBold,
              }}
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
          {props.package.priority !== undefined && (
            <SimpleText
              style={{
                ...styles.BlueBold,
                ...styles.fontSize12,
                ...styles.marginRight20,
              }}
              text={commonTranslator.priority + ' : ' + props.package.priority}
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

          {props.isAdmin && (
            <SimpleText
              style={{
                ...styles.red,
                ...styles.fontSize12,
                ...styles.marginRight20,
                ...styles.cursor_pointer,
              }}
              text={'کپی کردن لینک'}
              onPress={() => {
                navigator.clipboard.writeText(
                  BASE_SITE_NAME + 'buy/package/' + props.package.id,
                );
                showSuccess('لینک کپی شد!');
              }}
            />
          )}
        </MyView>
        {(props.isStudent === undefined || props.isStudent) && (
          <PhoneView
            style={{
              ...stylePricaPane,
            }}>
            <PhoneView>
              <SimpleText
                style={{
                  ...styles.BlueBold,
                }}
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
