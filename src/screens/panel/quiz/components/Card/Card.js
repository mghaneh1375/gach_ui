import React from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from './../../../../../styles/Common';
import Translate from './Translate';
import commonTranslator from '../../../../../tranlates/Common';
import {
  styleCommonWebBoxView,
  styleTitle,
  styleDigest,
  styleFontSize11,
  styleFontSize15,
  styleItemsParent,
  styleItem,
  styleItemsGrandParent,
  styleCard,
  stylePricaPane,
} from './../../../package/card/Style';
import {convertTimestamp} from '../../../../../services/Utility';
import {launchModeKeyVals, kindQuizKeyVals} from '../KeyVals';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {faPlug} from '@fortawesome/free-solid-svg-icons';
import {styles} from '../../../../../styles/Common/Styles';

function Card(props) {
  return (
    <CommonWebBox style={{...styleCard, ...styles.BlueBold}}>
      <MyView
        style={{
          ...styleCommonWebBoxView,
          ...styles.BlueBold,
        }}>
        <SimpleText
          style={{
            ...styleTitle,
            ...styles.BlueBold,
          }}
          text={props.quiz.title}
        />
      </MyView>

      <MyView style={{...styleItemsGrandParent}}>
        <PhoneView style={{...styleItemsParent}}>
          {props.quiz.reminder !== undefined && (
            <PhoneView style={{...styleItem, ...styles.alignItemsCenter}}>
              <FontIcon
                kind={'small'}
                icon={faPlug}
                parentStyle={{marginLeft: 5}}
              />
              <MyView>
                <SimpleText
                  style={{...styleFontSize11, ...styles.BlueBold}}
                  text={Translate.reminder}
                />
                <SimpleText
                  style={{...styleFontSize15, ...styles.BlueBold}}
                  text={props.quiz.reminder}
                />
              </MyView>
            </PhoneView>
          )}
          <PhoneView style={{...styleItem, ...styles.alignItemsCenter}}>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView>
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={Translate.kind}
              />
              <SimpleText
                style={{...styles.fontSize15, ...styles.BlueBold}}
                text={
                  kindQuizKeyVals.find(elem => elem.id === props.quiz.mode).item
                }
              />
            </MyView>
          </PhoneView>
          <PhoneView style={{...styleItem, ...styles.alignItemsCenter}}>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView>
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={Translate.isOnline}
              />
              <SimpleText
                style={{...styles.fontSize15, ...styles.BlueBold}}
                text={
                  launchModeKeyVals.find(
                    elem => elem.id === props.quiz.launchMode,
                  ).item
                }
              />
            </MyView>
          </PhoneView>
          {props.quiz.studentsCount !== undefined && (
            <PhoneView style={{...styleItem, ...styles.alignItemsCenter}}>
              <FontIcon
                kind={'small'}
                icon={faPlug}
                parentStyle={{marginLeft: 5}}
              />
              <MyView>
                <SimpleText
                  style={{...styleFontSize11, ...styles.BlueBold}}
                  text={Translate.studentsCount}
                />
                <SimpleText
                  style={{...styleFontSize15, ...styles.BlueBold}}
                  text={props.quiz.studentsCount}
                />
              </MyView>
            </PhoneView>
          )}
          {props.quiz.visibility !== undefined && (
            <PhoneView style={{...styleItem, ...styles.alignItemsCenter}}>
              <FontIcon
                kind={'small'}
                icon={faPlug}
                parentStyle={{marginLeft: 5}}
              />
              <MyView>
                <SimpleText
                  style={{...styleFontSize11, ...styles.BlueBold}}
                  text={commonTranslator.visibility + ':'}
                />
                <SimpleText
                  style={{...styles.fontSize15, ...styles.BlueBold}}
                  text={props.quiz.visibility ? 'قابل رویت' : 'مخفی'}
                />
              </MyView>
            </PhoneView>
          )}
          <PhoneView style={{...styles.alignItemsCenter}}>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView>
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={Translate.startLaunching}
              />
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={convertTimestamp(props.quiz.start)}
              />
            </MyView>
          </PhoneView>
          <PhoneView style={{...styles.alignItemsCenter}}>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView>
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={Translate.endLaunching}
              />
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={convertTimestamp(props.quiz.end)}
              />
            </MyView>
          </PhoneView>
          <PhoneView style={{...styles.alignItemsCenter}}>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView>
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={Translate.startRegistery}
              />
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={convertTimestamp(props.quiz.startRegistry)}
              />
            </MyView>
          </PhoneView>
          <PhoneView style={{...styles.alignItemsCenter}}>
            <FontIcon
              kind={'small'}
              icon={faPlug}
              parentStyle={{marginLeft: 5}}
            />
            <MyView>
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={Translate.endRegistery}
              />
              <SimpleText
                style={{...styleFontSize11, ...styles.BlueBold}}
                text={convertTimestamp(props.quiz.endRegistry)}
              />
            </MyView>
          </PhoneView>
        </PhoneView>
      </MyView>

      <MyView>
        <PhoneView style={{...stylePricaPane}}>
          {!props.isAdmin && (
            <PhoneView>
              <SimpleText style={{...styles.BlueBold}} text={Translate.price} />
              <SimpleText
                style={{...styles.BlueBold}}
                text={props.quiz.price + ' تومان'}
              />
            </PhoneView>
          )}
          <PhoneView>
            <CommonButton
              onPress={() => props.onClick(props.quiz.id)}
              theme={
                props.quiz.isSelected !== undefined && props.quiz.isSelected
                  ? 'yellow'
                  : 'yellow-transparent'
              }
              title={
                props.quiz.isSelected !== undefined && props.quiz.isSelected
                  ? commonTranslator.selected
                  : commonTranslator.select
              }
            />
          </PhoneView>
        </PhoneView>
        {props.quiz.tags !== undefined && props.quiz.tags.length > 0 && (
          <MyView
            style={{
              ...styleDigest,
            }}>
            <SimpleText
              style={{...styles.fontSize15, ...styles.BlueBold}}
              text={'# ' + props.quiz.tags.join(' - ')}
            />
          </MyView>
        )}
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
