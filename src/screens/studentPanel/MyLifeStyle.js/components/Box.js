import {
  faClockRotateLeft,
  faClose,
  faEdit,
  faQuestion,
  faUserClock,
} from '@fortawesome/free-solid-svg-icons';
import {
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import {justifyContentEnd} from '../../../../styles/Common/Button';
import {Image} from 'react-native';

function Box(props) {
  return (
    <PhoneView style={{...styles.alignSelfCenter, ...{minWidth: 225}}}>
      {(props.item.startAt !== undefined || props.item.advisor) && (
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
            <MyView
              style={{
                ...justifyContentEnd,
                ...styles.alignItemsCenter,
                ...{width: 40, marginRight: 5},
              }}>
              <Image
                source={props.item.advisor.pic}
                resizeMode={'contain'}
                style={{
                  cursor: 'pointer',
                  width: '100%',
                  height: '40px',
                  border: '1px solid',
                  borderRadius: '50%',
                }}
              />
            </MyView>
          )}
        </EqualTwoTextInputs>
      )}
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
              backgroundColor:
                props.item.lesson === undefined
                  ? vars.YELLOW
                  : props.item.additional === undefined
                  ? vars.ORANGE_RED
                  : vars.DARK_BLUE,
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
        {props.remove === undefined && (
          <MyView
            style={{
              backgroundColor:
                props.item.lesson === undefined
                  ? vars.YELLOW
                  : props.item.additional === undefined
                  ? vars.ORANGE_RED
                  : vars.DARK_BLUE,
              padding: 7,
            }}>
            <SimpleText style={{color: 'white'}} text={props.item.tag} />
          </MyView>
        )}

        <MyView
          style={{
            justifyContent: 'space-between',
            height: 'calc(100% - 40px)',
          }}>
          {props.item.lesson !== undefined && (
            <SimpleText
              style={{
                ...styles.dark_blue_color,
                ...styles.fontSize13,
                ...styles.marginTop10,
              }}
              text={props.item.lesson}
            />
          )}
          {props.item.lesson === undefined && <MyView />}

          <MyView>
            {props.item.additional !== undefined && (
              <PhoneView
                style={{
                  ...styles.gap10,
                  ...styles.alignItemsCenter,
                  ...{
                    marginRight: 4,
                    backgroundColor:
                      props.item.doneAdditional !== undefined
                        ? vars.SILVER
                        : 'unset',
                  },
                }}>
                <FontIcon kind={'small'} back={'yellow'} icon={faQuestion} />

                <MyView>
                  <SimpleText
                    text={props.item.additionalLabel}
                    style={{...styles.dark_blue_color, ...styles.fontSize10}}
                  />
                  <SimpleText
                    text={props.item.additional}
                    style={{...styles.dark_blue_color, ...{textAlign: 'end'}}}
                  />
                </MyView>
              </PhoneView>
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
        </MyView>

        {/* {props.item.doneAdditional !== undefined && (
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
        )} */}
      </MyView>
    </PhoneView>
  );
}

export default Box;
