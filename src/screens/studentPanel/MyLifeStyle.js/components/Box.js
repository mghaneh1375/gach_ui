import {
  faBriefcaseClock,
  faClock,
  faClockFour,
  faClockRotateLeft,
  faClose,
  faColonSign,
  faEdit,
  faTimeline,
  faTimes,
  faTimesCircle,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import LastBuyer from '../../../general/Packages/components/Detail/LastBuyer';
import vars from '../../../../styles/root';
import {justifyContentEnd} from '../../../../styles/Common/Button';

function Box(props) {
  return (
    <PhoneView style={{...styles.alignSelfCenter}}>
      <EqualTwoTextInputs
        style={{
          ...{
            backgroundColor: vars.CREAM,
            width: 50,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 16px 4px',
            minHeight: 180,
            maxHeight: 180,
          },
        }}>
        {props.item.startAt !== undefined && (
          <MyView style={{...styles.gap10}}>
            <PhoneView style={{...styles.alignItemsEnd, ...{height: 80}}}>
              <SimpleText
                style={{
                  writingMode: 'tb-rl',
                  fontSize: 14,
                  color: vars.DARK_BLUE,
                }}
                text={'شروع'}
              />
              <SimpleText
                style={{
                  writingMode: 'tb-rl',
                  fontSize: 20,
                  color: vars.DARK_BLUE,
                }}
                text={props.item.startAt}
              />
            </PhoneView>
            <SimpleFontIcon
              kind={'normal'}
              style={{color: vars.YELLOW}}
              icon={faUserClock}
            />
          </MyView>
        )}

        {props.item.advisor !== undefined && (
          <MyView style={{...justifyContentEnd}}>
            <LastBuyer
              isJustOne={true}
              pic={props.item.advisor.pic}
              text={props.item.advisor.name}
            />
          </MyView>
        )}
      </EqualTwoTextInputs>
      <MyView
        style={{
          minWidth: 150,
          maxWidth: 150,
          minHeight: 180,
          maxHeight: 180,
          padding: 5,
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 16px 4px',
          backgroundColor:
            props.item.doneDuration !== undefined
              ? props.item.doneDuration === props.item.duration
                ? 'green'
                : 'yellow'
              : 'white',
        }}>
        {props.remove !== undefined && (
          <EqualTwoTextInputs
            style={{
              backgroundColor: vars.ORANGE_RED,
              padding: 7,
            }}>
            <SimpleText style={{color: 'white'}} text={props.item.tag} />
            <SimpleFontIcon
              icon={faClose}
              kind={'normal'}
              parentStyle={{alignSelf: 'end'}}
              style={{color: 'white'}}
              onPress={() => props.remove()}
            />
          </EqualTwoTextInputs>
        )}

        <MyView style={{justifyContent: 'space-between'}}>
          {props.item.lesson !== undefined && (
            <SimpleText text={props.item.lesson} />
          )}

          <PhoneView
            style={{
              backgroundColor:
                props.item.doneDuration !== undefined ? vars.SILVER : 'unset',
            }}>
            <SimpleFontIcon
              style={{color: vars.YELLOW}}
              kind={'normal'}
              icon={faClockRotateLeft}
            />
            <MyView>
              <SimpleText
                text={'مدت زمان'}
                style={{...styles.dark_blue_color, ...styles.fontSize10}}
              />
              <SimpleText
                text={props.item.duration + ' دقیقه'}
                style={{...styles.dark_blue_color}}
              />

              {/* {props.item.doneDuration !== undefined && (
              <SimpleText
                style={{...styles.red, ...styles.bold, ...styles.fontSize10}}
                text={'مدت انجام شده: ' + props.item.doneDuration + ' دقیقه'}
              />
            )} */}
            </MyView>
          </PhoneView>
        </MyView>

        {props.item.additional !== undefined && (
          <SimpleText
            text={props.item.additionalLabel + ' : ' + props.item.additional}
          />
        )}

        {props.item.doneAdditional !== undefined && (
          <SimpleText
            text={
              props.item.additionalLabel +
              ' انجام شده : ' +
              props.item.doneAdditional
            }
          />
        )}

        {props.item.description !== undefined && (
          <SimpleText text={props.item.description} />
        )}

        {props.onDone !== undefined && (
          <SimpleFontIcon
            onPress={() => props.onDone()}
            style={{cursor: 'pointer'}}
            icon={faEdit}
            kind={'normal'}
          />
        )}
      </MyView>
    </PhoneView>
  );
}

export default Box;
