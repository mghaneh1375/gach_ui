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
      <img style={{...style.pic}} src={props.avatar.file} />
      <PhoneView>
        <SimpleText
          style={style.defaultText}
          text={props.avatar.isDefault ? translator.default : ''}
        />
      </PhoneView>
      <SimpleText
        style={style.defaultText}
        text={translator.used + ' : ' + props.avatar.used}
      />
      <PhoneView>
        <CommonButton
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
    </CommonWebBox>
  );
}

export default Show;
