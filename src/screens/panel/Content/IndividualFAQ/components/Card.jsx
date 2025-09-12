import React, {useState} from 'react';
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {CommonButton, CommonWebBox, MyView, PhoneView} from '@/styles';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles';
import commonTranslator from '@/translator/common';
import Translator from '../../translate';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import {statusKeyVals} from '../../../question/components/keyVals';
import {remove, store, update} from './utility';
function Card(props) {
  const [show, setShow] = useState(false);
  const [question, setQuestion] = useState();
  const [answer, setAnswer] = useState();
  const [priority, setPriority] = useState();
  const [visibility, setVisibility] = useState();
  React.useEffect(() => {
    if (props.elem === undefined) {
      setShow(true);
      return;
    }
    setQuestion(props.elem.question);
    setAnswer(props.elem.answer);
    setPriority(props.elem.priority);
    setVisibility(props.elem.visibility);
  }, [props.elem]);
  return (
    <CommonWebBox
      header={question !== undefined ? question : ''}
      btn={
        <SimpleFontIcon
          onPress={() => setShow(!show)}
          kind="med"
          icon={show ? faAngleDown : faAngleUp}
        />
      }
      width={'calc(25% - 10px)'}>
      {show && (
        <MyView>
          <JustBottomBorderTextInput
            onChangeText={e => setQuestion(e)}
            placeholder={question}
            subText={Translator.question}
          />
          <JustBottomBorderTextInput
            onChangeText={e => setAnswer(e)}
            placeholder={answer}
            multiline={true}
            subText={Translator.answer}
          />
          <JustBottomBorderTextInput
            onChangeText={e => setPriority(e)}
            justNum={true}
            placeholder={priority}
            subText={commonTranslator.priority}
          />

          <JustBottomBorderSelect
            placeholder={commonTranslator.visibility}
            subText={commonTranslator.visibility}
            setter={setVisibility}
            values={statusKeyVals}
            value={statusKeyVals.find(elem => elem.id === visibility)}
          />
          {props.elem !== undefined && (
            <PhoneView
              style={{
                ...styles.gap10,
                ...styles.margin15,
              }}>
              <CommonButton
                onPress={async () => {
                  props.setLoading(true);
                  const res = await remove(
                    props.elem.id,
                    props.token,
                    props.id,
                  );
                  props.setLoading(false);
                  if (res !== null) {
                    setShow(false);
                    props.onDelete();
                  }
                }}
                title={commonTranslator.delete}
              />
              <CommonButton
                onPress={async () => {
                  props.setLoading(true);
                  const res = await update(
                    props.elem.id,
                    {
                      question: question,
                      answer: answer,
                      visibility: visibility,
                      priority: priority,
                    },
                    props.token,
                    props.id,
                  );
                  props.setLoading(false);
                  if (res !== null) {
                    props.onUpdate(res);
                  }
                }}
                theme={'dark'}
                title={commonTranslator.update}
              />
            </PhoneView>
          )}
          {props.elem === undefined && (
            <CommonButton
              onPress={async () => {
                props.setLoading(true);
                const res = await store(
                  {
                    question: question,
                    answer: answer,
                    visibility: visibility,
                    priority: priority,
                  },
                  props.token,
                  props.id,
                );
                props.setLoading(false);
                if (res !== null) {
                  props.onAdd(res);
                }
              }}
              title={commonTranslator.add}
            />
          )}
        </MyView>
      )}
    </CommonWebBox>
  );
}
export default Card;
