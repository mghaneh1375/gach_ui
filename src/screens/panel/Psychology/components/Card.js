import React, {useState} from 'react';
import {getDevice} from '../../../../services/Utility';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import {styles} from '../../../../styles/Common/Styles';
import {faMessage, faUser, faQuestion} from '@fortawesome/free-solid-svg-icons';
import {Image, Pressable} from 'react-native';

function Card(props) {
  const navigate = props.navigate;

  const [view, setView] = useState(props.show);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  return (
    <>
      <PhoneView>
        <CommonWebBox width={isInPhone ? '100%' : '80%'}>
          <PhoneView>
            <PhoneView style={{...styles.width15}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={{
                  uri: 'https://symbiosisonlinepublishing.com/flyers/Psychologycoverpage.jpg',
                }}
              />
            </PhoneView>

            <PhoneView style={{...styles.width80}}>
              <MyView
                style={{
                  backgroundColor: '#FFEFCE',
                  padding: '8px',
                  borderRadius: '7px',
                  ...styles.BlueBold,
                  ...styles.width50,
                }}>
                <SimpleText text={props.name} />
              </MyView>

              <SimpleText text={props.description} />
            </PhoneView>
          </PhoneView>
        </CommonWebBox>
        {view && (
          <CommonWebBox width={isInPhone ? '100%' : '20%'}>
            <MyView style={{height: '125px', ...styles.gap10}}>
              <PhoneView>
                <SimpleFontIcon
                  style={{color: '#FFAA00'}}
                  kind={'normal'}
                  theme="rect"
                  back={'yellow'}
                  icon={faMessage}
                />
                <SimpleText text={`تعداد سوال : ${props.numberQuestion} `} />
              </PhoneView>

              <PhoneView>
                <SimpleFontIcon
                  style={{color: '#FFAA00'}}
                  kind={'normal'}
                  theme="rect"
                  back={'yellow'}
                  icon={faUser}
                />
                <SimpleText text={` مخاطب : ${props.audience} `} />
              </PhoneView>
              {props.price === undefined && (
                <PhoneView>
                  <SimpleFontIcon
                    style={{color: '#FFAA00'}}
                    kind={'normal'}
                    theme="rect"
                    back={'yellow'}
                    icon={faUser}
                  />
                  <SimpleText text={`مدت تقریبی : ${props.time}`} />
                </PhoneView>
              )}
              {props.price !== undefined && (
                <Pressable
                  style={{
                    backgroundColor: '#FFAA00',
                    padding: '5px',
                    borderRadius: '5px',
                    ...styles.flexDirectionRow,
                  }}>
                  <SimpleText text={` ${props.price} تومان `} />
                  <SimpleText
                    style={{
                      ...styles.marginRight25,
                      ...styles.colorWhite,
                    }}
                    text={' مشاهده '}
                  />
                </Pressable>
              )}
            </MyView>
          </CommonWebBox>
        )}
        {!view && (
          <CommonWebBox
            style={{...styles.gap0}}
            width={isInPhone ? '100%' : '20%'}>
            <MyView style={{height: '125px', ...styles.gap10}}>
              <PhoneView>
                <SimpleFontIcon
                  style={{color: '#FFAA00'}}
                  kind={'normal'}
                  theme="rect"
                  back={'yellow'}
                  icon={faMessage}
                />
                <SimpleText text={`تعداد سوال : ${props.numberQuestion} `} />
              </PhoneView>

              <PhoneView>
                <FontIcon
                  // style={{color: '#FFAA00'}}
                  kind={'midSize'}
                  theme="circle"
                  back={'yellow'}
                  icon={faQuestion}
                />
                <SimpleText text={` پاسخ داده شده : ${props.answered} سوال `} />
              </PhoneView>

              <PhoneView>
                <FontIcon
                  kind={'midSize'}
                  theme="circle"
                  back={'yellow'}
                  icon={faQuestion}
                />
                <SimpleText
                  text={` پاسخ داده نشده : ${props.notAnswered} سوال `}
                />
              </PhoneView>

              <PhoneView
                style={{
                  ...styles.flexDirectionRow,
                }}>
                <Pressable style={{padding: '5px'}}>
                  <SimpleText text={' جزئیات '} />
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: '#FFAA00',
                    borderRadius: '5px',
                    paddingRight: '15px',
                    paddingLeft: '15px',
                    ...styles.marginRight40,
                  }}>
                  <SimpleText
                    style={{
                      padding: '5px',
                      ...styles.colorWhite,
                    }}
                    text={' شروع '}
                  />
                </Pressable>
              </PhoneView>
            </MyView>
          </CommonWebBox>
        )}
      </PhoneView>
    </>
  );
}

export default Card;
