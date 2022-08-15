import {faEye, faPen, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Image} from 'react-native';

import {
  BigBoldBlueText,
  CommonWebBox,
  PhoneView,
  SimpleText,
  MyView,
} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import vars from '../../../../../styles/root';

function MiniCard(props) {
  const [src, setSrc] = useState();

  React.useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  return (
    <CommonWebBox width={280} style={{padding: 0}}>
      <MyView>
        <PhoneView>
          {src !== undefined && (
            <Image
              style={{
                width: 100,
                height: 140,
                borderRadius: 11,
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              source={src}
            />
          )}
          {src === undefined && (
            <MyView
              style={{
                width: 100,
                height: 140,
                borderRadius: 11,
                objectFit: 'cover',
                objectPosition: 'center',
                justifyContent: 'center',
              }}>
              <FontIcon
                theme={'transparent'}
                style={{width: 30, marginTop: 32}}
                icon={faPlus}
                textColor={'#efefef'}
                text={'فایل را اضافه کنید'}
              />
            </MyView>
          )}

          <MyView style={{width: 160, justifyContent: 'center'}}>
            {props.subTexts !== undefined &&
              props.subTexts.map((elem, index) => {
                return (
                  <PhoneView key={index} style={{padding: 0, paddingRight: 10}}>
                    <SimpleText style={{fontSize: 11}} text={elem.label} />
                    <SimpleText
                      style={{
                        fontSize: 13,
                        color: vars.DARK_BLUE,
                      }}
                      text={elem.value}
                    />
                  </PhoneView>
                );
              })}
          </MyView>
        </PhoneView>

        <MyView style={{justifyContent: 'space-around', marginTop: -15}}>
          <MyView>
            <BigBoldBlueText
              style={{padding: 0, paddingRight: 10, fontSize: 15}}
              text={props.header}
            />
            {src === undefined && (
              <BigBoldBlueText
                style={{
                  padding: 0,
                  paddingRight: 10,
                  fontSize: 15,
                }}
                text={'فایل را اضافه کنید'}
              />
            )}
            <SimpleText
              style={{padding: 0, paddingRight: 10}}
              text={props.text}
            />
          </MyView>
          {src !== undefined && (props.ops === undefined || props.ops) && (
            <PhoneView style={{paddingRight: 15, gap: 15}}>
              <FontIcon
                onPress={() => window.open(props.src)}
                theme="rect"
                kind="normal"
                back={'orange'}
                icon={faEye}
              />
              <FontIcon
                onPress={() => setSrc(undefined)}
                theme="rect"
                kind="normal"
                back={'yellow'}
                icon={faTrash}
              />
              <FontIcon
                onPress={props.onPress}
                theme="rect"
                kind="normal"
                back={'blue'}
                icon={faPen}
              />
            </PhoneView>
          )}
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}
export default MiniCard;
