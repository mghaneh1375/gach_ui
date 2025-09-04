import {CommonButton, PhoneView, SimpleText, MyView} from '@/styles';
import translator from '../../translator';
import commonTranslator from '../../../../../../translator/common';
import style from './style';
import {remove, setAsDefault} from '../utility';
function Show(props) {
  const edit = () => {
    props.setSelected(props.avatar);
    props.setMode('edit');
  };
  return (
    <MyView style={style.avatar}>
      <MyView
        style={{
          alignItems: 'center',
        }}>
        <img
          style={{
            ...style.pic,
          }}
          src={props.avatar.file}
        />
        <SimpleText
          style={style.defaultText}
          text={props.avatar.isDefault ? translator.default : ''}
        />
        <SimpleText
          style={style.defaultText}
          text={translator.used + ' : ' + props.avatar.used}
        />
      </MyView>
      <MyView>
        <PhoneView
          style={{
            marginBottom: -10,
          }}>
          <CommonButton
            style={{
              marginTight: -10,
            }}
            theme={'transparent'}
            onPress={() => edit()}
            title={commonTranslator.edit}
            padding={'unset'}
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
            padding={'unset'}
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
              style={{
                width: 'calc(100% - 20px)',
                justifyContent: 'center',
              }}
            />
          )}
        </PhoneView>
      </MyView>
    </MyView>
  );
}
export default Show;
