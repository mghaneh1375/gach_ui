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
import commonTranslator from '../../../../tranlates/Common';
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
import {formatPrice, showSuccess} from '../../../../services/Utility';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {faGift, faPlug} from '@fortawesome/free-solid-svg-icons';
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
            text={commonTranslator.grade + ' : ' + props.package.grade.name}
          />
          <SimpleText
            style={{...styles.fontSize15, ...styles.BlueBold}}
            text={commonTranslator.lesson + ' : ' + props.package.lesson.name}
          />
        </MyView>
        <PhoneView
          style={{
            ...styles.gap10,
            ...styles.flexWrap,
            ...styles.justifyContentSpaceAround,
            ...styles.marginTop20,
          }}>
          <PhoneView>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView style={{...styles.justifyContentCenter}}>
              <SimpleText
                style={{...styles.fontSize10, ...styles.BlueBold}}
                text={Translate.quizCount}
              />
              <SimpleText
                style={{
                  ...styles.fontSize15,
                  ...styles.alignSelfCenter,
                  ...styles.BlueBold,
                }}
                text={props.package.quizzes}
              />
            </MyView>
          </PhoneView>

          {!props.isAdmin && (
            <PhoneView>
              <FontIcon
                kind={'small'}
                icon={faPlug}
                parentStyle={{marginLeft: 5}}
              />
              <MyView style={{...styles.justifyContentCenter}}>
                <SimpleText
                  style={{...styles.fontSize10, ...styles.BlueBold}}
                  text={Translate.registrableCount}
                />
                <SimpleText
                  style={{
                    ...styles.fontSize15,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={props.package.registrable}
                />
              </MyView>
            </PhoneView>
          )}

          <PhoneView>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView style={{...styles.justifyContentCenter}}>
              <SimpleText
                style={{...styles.fontSize10, ...styles.BlueBold}}
                text={Translate.minSelect}
              />
              <SimpleText
                style={{
                  ...styles.fontSize15,
                  ...styles.alignSelfCenter,
                  ...styles.BlueBoldr,
                }}
                text={props.package.minSelect}
              />
            </MyView>
          </PhoneView>

          {props.isAdmin && (
            <PhoneView>
              <FontIcon
                kind={'small'}
                icon={faPlug}
                parentStyle={{marginLeft: 5}}
              />
              <MyView>
                <SimpleText
                  style={{...styles.fontSize10, ...styles.BlueBold}}
                  text={Translate.buyersCount}
                />
                <SimpleText
                  style={{
                    ...styles.fontSize15,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={props.package.buyers}
                />
              </MyView>
            </PhoneView>
          )}
        </PhoneView>

        <PhoneView style={{...stylePricaPane}}>
          {!props.isAdmin && (
            <PhoneView>
              <SimpleText text={'قیمت : '} />
              <SimpleText
                style={{
                  ...styles.textDecorRed,
                  ...styles.BlueBold,
                }}
                text={formatPrice(props.package.totalPrice) + ' تومان '}
              />
              <SimpleText
                style={{
                  ...styles.BlueBold,
                  ...styles.red,
                  ...styles.marginRight15,
                }}
                text={formatPrice(props.package.realPrice) + ' تومان '}
              />
            </PhoneView>
          )}
        </PhoneView>
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
