import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from './../../../../../styles/Common';
import {TinyTextIcon} from '../../../../../styles/Common/TextIcon';
import Translate from './Translate';
import commonTranslator from '../../../../../tranlates/Common';
import {
  styleCommonWebBoxView,
  styleTitle,
  styleDigest,
  styleFontSize13,
  styleTinyTextIcon,
  styleFontSize11,
  styleFontSize15,
  styleItemsParent,
  styleItem,
  styleFullItem,
  styleItemsGrandParent,
  styleCard,
  stylePricaPane,
} from './../../../package/card/Style';
import {convertTimestamp} from '../../../../../services/Utility';
import {isOnlineKeyVals, kindQuizKeyVals} from '../KeyVals';

function Card(props) {
  return (
    <CommonWebBox style={{...styleCard}}>
      <View
        style={{
          ...styleCommonWebBoxView,
        }}>
        <SimpleText
          style={{
            ...styleTitle,
          }}
          text={props.quiz.title}
        />
      </View>

      <View style={{...styleItemsGrandParent}}>
        <PhoneView style={{...styleItemsParent}}>
          {props.quiz.reminder !== undefined && (
            <PhoneView style={{...styleItem}}>
              <TinyTextIcon />
              <View>
                <SimpleText
                  style={{...styleFontSize11}}
                  text={Translate.reminder}
                />
                <SimpleText
                  style={{...styleFontSize15}}
                  text={props.quiz.reminder}
                />
              </View>
            </PhoneView>
          )}
          <PhoneView style={{...styleItem}}>
            <TinyTextIcon />
            <View>
              <SimpleText style={{...styleFontSize11}} text={Translate.kind} />
              <SimpleText
                style={{...styleFontSize13}}
                text={
                  kindQuizKeyVals.find(elem => elem.id === props.quiz.mode).item
                }
              />
            </View>
          </PhoneView>
          <PhoneView style={{...styleItem}}>
            <TinyTextIcon />
            <View>
              <SimpleText
                style={{...styleFontSize11}}
                text={Translate.isOnline}
              />
              <SimpleText
                style={{...styleFontSize13}}
                text={
                  isOnlineKeyVals.find(elem => elem.id === props.quiz.isOnline)
                    .item
                }
              />
            </View>
          </PhoneView>
          {props.quiz.studentsCount !== undefined && (
            <PhoneView style={{...styleItem}}>
              <TinyTextIcon />
              <View>
                <SimpleText
                  style={{...styleFontSize11}}
                  text={Translate.studentsCount}
                />
                <SimpleText
                  style={{...styleFontSize15}}
                  text={props.quiz.studentsCount}
                />
              </View>
            </PhoneView>
          )}

          {props.quiz.visibility !== undefined && (
            <View style={{...styleItem}}>
              <TinyTextIcon style={{...styleTinyTextIcon}} />
              <SimpleText
                style={{...styleFontSize11}}
                text={commonTranslator.visibility + ' : '}
              />
              <SimpleText
                style={{...styleFontSize15}}
                text={props.quiz.visibility}
              />
            </View>
          )}
          <PhoneView style={{...styleFullItem}}>
            <TinyTextIcon />
            <View>
              <SimpleText
                style={{...styleFontSize11}}
                text={Translate.launching}
              />
              <SimpleText
                style={{...styleFontSize11}}
                text={
                  commonTranslator.from +
                  convertTimestamp(props.quiz.start) +
                  commonTranslator.to +
                  convertTimestamp(props.quiz.end)
                }
              />
            </View>
          </PhoneView>
          <PhoneView style={{...styleFullItem}}>
            <TinyTextIcon />
            <View>
              <SimpleText
                style={{...styleFontSize11}}
                text={Translate.registery}
              />
              <SimpleText
                style={{...styleFontSize11}}
                text={
                  commonTranslator.from +
                  convertTimestamp(props.quiz.startRegistry) +
                  commonTranslator.to +
                  convertTimestamp(props.quiz.endRegistry)
                }
              />
            </View>
          </PhoneView>
        </PhoneView>
      </View>

      <View>
        <PhoneView style={{...stylePricaPane}}>
          {!props.isAdmin && (
            <PhoneView>
              <SimpleText text={Translate.price} />
              <SimpleText text={props.quiz.price + ' تومان'} />
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
        <View
          style={{
            ...styleDigest,
          }}>
          <SimpleText style={{...styleFontSize13}} text={props.quiz.tags} />
        </View>
      </View>
    </CommonWebBox>
  );
}

export default Card;
