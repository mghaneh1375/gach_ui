import {View} from 'react-native';
import {CommonButton, SimpleText} from '../../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../../tranlates/Common';
import style from './Style';
import {remove, setAsDefault} from '../Utility';

function Show(props) {
  return (
    <View style={style.avatar}>
      <img src={props.avatar.file} />
      <SimpleText
        style={style.defaultText}
        text={props.avatar.isDefault ? translator.default : ''}
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
        />
      )}
    </View>
  );
}

export default Show;
