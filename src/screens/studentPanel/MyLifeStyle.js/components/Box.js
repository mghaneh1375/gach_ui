import {
  faClockRotateLeft,
  faClose,
  faInfo,
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
import {Image, Pressable} from 'react-native';
import React from 'react';

function Box(props) {
  return (
    <Pressable
      onPress={() => (props.onDone === undefined ? {} : props.onDone())}>
      <PhoneView
        style={{
          ...styles.alignSelfCenter,
          ...{minWidth: props.item.advisor !== undefined ? 225 : 'unset'},
        }}>
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
          <MyView
            style={{
              ...styles.alignItemsCenter,
              ...styles.alignSelfCenter,
              ...styles.justifyContentCenter,
              ...{width: 50, height: 130},
            }}>
            <SimpleText
              style={{
                writingMode: 'tb-rl',
                fontSize: 17,
                color: vars.DARK_BLUE,
              }}
              text={props?.item?.tag}
            />
          </MyView>

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

        <MyView
          style={{
            minWidth: 150,
            maxWidth: 150,
            minHeight: 180,
            maxHeight: 180,
            padding: 5,
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 16px 4px',
            backgroundColor: 'white',
            // props.item.doneDuration !== undefined
            //   ? props.item.doneDuration === props.item.duration
            //     ? 'green'
            //     : 'yellow'
            //   : 'white',
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
                padding: props?.item?.lesson.length > 15 ? 3 : 7,
              }}>
              <SimpleText
                style={{
                  color: 'white',
                  fontSize: props?.item?.lesson.length > 15 ? 9 : 13,
                  paddingTop: props?.item?.lesson.length > 15 ? 4 : 0,
                }}
                text={props?.item?.lesson}
              />
              <SimpleFontIcon
                icon={faClose}
                kind={'normal'}
                parentStyle={{alignSelf: 'end'}}
                style={{color: 'white'}}
                onPress={() => props.remove()}
              />
            </EqualTwoTextInputs>
          )}
          {props.remove === undefined && props.item.lesson !== undefined && (
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
              <SimpleText
                style={{color: 'white', fontSize: 11}}
                text={props.item.lesson}
              />
            </MyView>
          )}

          <MyView
            style={{
              justifyContent: 'space-between',
              height:
                props.remove !== undefined || props.item.lesson !== undefined
                  ? 'calc(100% - 40px)'
                  : 'calc(100% - 5px)',
            }}>
            {props.item.startAt !== undefined && (
              <EqualTwoTextInputs
                style={{
                  marginTop: 10,
                }}>
                <SimpleText
                  style={{
                    color: vars.DARK_BLUE,
                  }}
                  text={'شروع : ' + props.item.startAt}
                />
                {props.item.description !== undefined &&
                  props.item.description !== '' && (
                    <SimpleFontIcon
                      kind="normal"
                      icon={faInfo}
                      style={{color: vars.RED, marginTop: -10}}
                    />
                  )}
              </EqualTwoTextInputs>
            )}

            {props.item.startAt === undefined && <MyView />}

            <MyView style={{...styles.gap10}}>
              {props.item.additional !== undefined && (
                <PhoneView
                  style={{
                    ...styles.gap10,
                    ...styles.alignItemsCenter,
                    ...{
                      paddingRight: 4,
                      background:
                        props.item.doneAdditional !== undefined
                          ? props.item.doneAdditional == props.item.additional
                            ? '#FFAA00'
                            : 'linear-gradient(90deg, #E6E6E6 ' +
                              (100 -
                                (100 * props.item.doneAdditional) /
                                  props.item.additional) +
                              '%, #FFAA00 ' +
                              (100 * props.item.doneAdditional) /
                                props.item.additional +
                              '%)'
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
                      text={
                        props.item.doneAdditional === undefined
                          ? props.item.additional
                          : props.item.doneAdditional +
                            ' از ' +
                            props.item.additional
                      }
                      style={{...styles.dark_blue_color, ...{textAlign: 'end'}}}
                    />
                  </MyView>
                </PhoneView>
              )}

              <PhoneView
                style={{
                  background:
                    props.item.doneDuration !== undefined
                      ? props.item.doneDuration == props.item.duration
                        ? '#FFAA00'
                        : 'linear-gradient(90deg, #E6E6E6 ' +
                          (100 -
                            (100 * props.item.doneDuration) /
                              props.item.duration) +
                          '%, #FFAA00 ' +
                          (100 * props.item.doneDuration) /
                            props.item.duration +
                          '%)'
                      : 'unset',
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
                  {props.item.doneDuration === undefined && (
                    <SimpleText
                      text={props.item.duration + ' دقیقه'}
                      style={{...styles.dark_blue_color}}
                    />
                  )}

                  {props.item.doneDuration !== undefined && (
                    <SimpleText
                      style={{...styles.dark_blue_color, ...styles.fontSize10}}
                      text={
                        props.item.doneDuration +
                        ' دقیقه از ' +
                        props.item.duration +
                        ' دقیقه '
                      }
                    />
                  )}
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
    </Pressable>
  );
}

export default Box;
