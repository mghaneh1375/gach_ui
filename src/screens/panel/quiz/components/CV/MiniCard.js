import {faEye, faPen, faTrash, faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {Image, View} from 'react-native';

import {
  BigBoldBlueText,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';

function MiniCard(props) {
  const [src, setSrc] = useState();

  React.useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  return (
    <CommonWebBox width={250} style={{padding: 0}}>
      <View>
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
            <View
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
            </View>
          )}

          <View style={{justifyContent: 'space-around', marginTop: -15}}>
            <View>
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
            </View>
            {src !== undefined && (
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
          </View>
        </PhoneView>
      </View>
    </CommonWebBox>
  );
}
export default MiniCard;
