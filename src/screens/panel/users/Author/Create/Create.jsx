import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView, MyView} from '@/styles';
import JustBottomBorderTextInput from '../../../../../styles/common/JustBottomBorderTextInput.jsx';
import Translate from '../translator';
import commonTranslate from '../../../../../translator/common';
import {createAuthor, editAuthor} from '../list/utility';
import {changeText} from '../../../../../services/utility';
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
      <MyView>
        <PhoneView
          style={{
            gap: 15,
          }}>
          <JustBottomBorderTextInput
            placeholder={Translate.authorName}
            subText={Translate.authorName}
            value={name}
            onChangeText={text => changeText(text, setName)}
          />

          <JustBottomBorderTextInput
            placeholder={Translate.tag}
            subText={Translate.tag}
            value={tag}
            onChangeText={text => changeText(text, setTag)}
          />
        </PhoneView>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            const res =
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
      </MyView>
    </CommonWebBox>
  );
}
export default CreateAuthor;
