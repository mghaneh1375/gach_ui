import {useState} from 'react';
import {View} from 'react-native-web';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../Translator';
import commonTranslate from '../../../../../tranlates/Common';
import {createAuthor, editAuthor} from '../List/Utility';

function CreateAuthor(props) {
  const [name, setName] = useState(
    props.author !== undefined ? props.author.name : '',
  );
  const [tag, setTag] = useState(
    props.author !== undefined ? props.author.tag : '',
  );

  return (
    <CommonWebBox
      header={Translate.newAuthor}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <View>
        <PhoneView>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.authorName}
            value={name}
            onChangeText={text => setName(text)}
          />

          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={Translate.tag}
            value={tag}
            onChangeText={text => setTag(text)}
            subText={commonTranslate.notNecessary}
          />
        </PhoneView>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let res =
              props.author === undefined
                ? await createAuthor(props.token, {
                    name: name,
                    tag: tag,
                  })
                : await editAuthor(props.token, props.author.id, {
                    name: name,
                    tag: tag,
                  });
            props.setLoading(false);
            if (res !== null) {
              props.afterAdd({
                name: name,
                tag: tag,
                lastTransaction:
                  props.author === undefined
                    ? ''
                    : props.author.lastTransaction,
                sumPayment:
                  props.author === undefined ? 0 : props.author.sumPayment,
                questionCount:
                  props.author === undefined ? 0 : props.author.questionCount,
                id: props.author === undefined ? res : props.author.id,
              });
              props.setMode('list');
            }
          }}
          title={commonTranslate.confirm}
        />
      </View>
    </CommonWebBox>
  );
}

export default CreateAuthor;
