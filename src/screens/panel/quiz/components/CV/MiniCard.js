import {faEye, faPen, faPlus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {View} from 'react-native';
import {
  BigBoldBlueText,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import {removeItems} from '../../../../../services/Utility';
import {remove} from '../../../Config/Avatars/components/Utility';
import translator from '../../../../../tranlates/Common';

function MiniCard(props) {
  //   const [show, setShow] = useState();
  const link = props.src;
  console.log('====================================');
  console.log(link);
  console.log('====================================');
  return (
    <CommonWebBox width={250} style={{padding: 0}}>
      <View>
        <PhoneView>
          {props.src !== undefined && (
            <img
              style={{
                width: 100,
                height: 140,
                borderRadius: 12,
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              src={link}></img>
          )}
          {props.src === undefined && (
            <View
              style={{
                width: 100,
                height: 140,
                borderRadius: 12,
                objectFit: 'cover',
                objectPosition: 'center',
                justifyContent: 'center',
              }}>
              <FontIcon theme="rect" kind="normal" style={{}} icon={faPlus} />
            </View>
          )}
          <View style={{justifyContent: 'space-around', marginTop: -15}}>
            <View>
              <BigBoldBlueText
                style={{padding: 0, paddingRight: 10, fontSize: 15}}
                text={props.header}
              />
              {props.src === undefined && (
                <BigBoldBlueText
                  style={{padding: 0, paddingRight: 10, fontSize: 15}}
                  text={'فایل را اضافه کنید'}
                />
              )}
              <SimpleText
                style={{padding: 0, paddingRight: 10}}
                text={props.text}
              />
            </View>
            {props.src !== undefined && (
              <PhoneView style={{paddingRight: 15, gap: 15}}>
                <FontIcon
                  onPress={() => window.open(props.src)}
                  theme="rect"
                  kind="normal"
                  back={'orange'}
                  icon={faEye}
                />
                <FontIcon
                  onPress={() => remove(link)}
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
