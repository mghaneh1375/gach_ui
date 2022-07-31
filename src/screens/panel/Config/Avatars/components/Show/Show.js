import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../../tranlates/Common';
import style from './Style';
import {remove, setAsDefault} from '../Utility';

function Show(props) {
  const edit = () => {
    props.setSelected(props.avatar);
    props.setMode('edit');
  };

  return (
    <CommonWebBox style={style.avatar}>
      <View style={{alignItems: 'center'}}>
        <img style={{...style.pic}} src={props.avatar.file} />
        <SimpleText
          style={style.defaultText}
          text={props.avatar.isDefault ? translator.default : ''}
        />
        <SimpleText
          style={style.defaultText}
          text={translator.used + ' : ' + props.avatar.used}
        />
      </View>
      <View>
        <PhoneView style={{marginBottom: -10}}>
          <CommonButton
            style={{marginTight: -10}}
            theme={'transparent'}
            onPress={() => edit()}
            title={commonTranslator.edit}
          />
          <CommonButton
            onPress={() =>
              remove(
                props.avatar.id,
                props.setLoading,
                props.token,
                props.setDefault,
                props.removeAvatar,
              )
            }
            title={commonTranslator.delete}
          />
        </PhoneView>
        <PhoneView>
          {!props.avatar.isDefault && (
            <CommonButton
              onPress={() =>
                setAsDefault(
                  props.avatar.id,
                  props.setLoading,
                  props.token,
                  props.setDefault,
                )
              }
              theme={'dark'}
              title={translator.setAsDefault}
              textStyle={style.font13}
              style={{width: 'calc(100% - 20px)', justifyContent: 'center'}}
            />
          )}
        </PhoneView>
      </View>
    </CommonWebBox>
  );
}

export default Show;
