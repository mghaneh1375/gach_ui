import {faEye, faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
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
  //   const [show, setShow] = useState();

  React.useEffect(() => {
    setSrc(props.src);
  }, [props.src]);

  const link = props.src;
  return (
    <CommonWebBox width={250} style={{padding: 0}}>
      <View>
        <PhoneView>
          <Image
            style={{
              width: 100,
              height: 140,
              borderRadius: 12,
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            source={src}
          />
          <View style={{justifyContent: 'space-around', marginTop: -15}}>
            <View>
              <BigBoldBlueText
                style={{padding: 0, paddingRight: 10, fontSize: 15}}
                text={props.header}
              />
              <SimpleText
                style={{padding: 0, paddingRight: 10}}
                text={props.text}
              />
            </View>
            <PhoneView style={{paddingRight: 15, gap: 15}}>
              <FontIcon
                onPress={window.open(`${(<img src={props.src} />)}`)}
                theme="rect"
                kind="normal"
                back={'orange'}
                icon={faEye}
              />
              <FontIcon
                onPress={props.onPress}
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
          </View>
        </PhoneView>
      </View>
    </CommonWebBox>
  );
}

export default MiniCard;
