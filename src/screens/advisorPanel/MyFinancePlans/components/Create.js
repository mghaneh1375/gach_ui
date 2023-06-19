import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {styles} from '../../../../styles/Common/Styles';
import React, {useState} from 'react';
import translator from './Translator';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {statusKeyVals} from '../../../panel/question/components/KeyVals';
import {createNewOff} from './Utility';
import {dispatchFinanceContext, financeContext} from './Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(financeContext),
    React.useContext(dispatchFinanceContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [maxKarbarg, setMaxKarbarg] = useState();
  const [maxExam, setMaxExam] = useState();
  const [price, setPrice] = useState();
  const [title, setTitle] = useState();
  const [videoCalls, setVideoCalls] = useState();
  const [visibility, setVisibility] = useState();
  const [description, setDescription] = useState();
  const [maxChat, setMaxChat] = useState();

  const create = async () => {
    let data = {
      price: price,
      title: title,
      videoCalls: videoCalls,
      visibility: visibility,
    };

    if (maxExam !== undefined && maxExam.length > 0) data.maxExam = maxExam;
    if (maxChat !== undefined && maxChat.length > 0) data.maxChat = maxChat;
    if (maxKarbarg !== undefined && maxKarbarg.length > 0)
      data.maxKarbarg = maxKarbarg;

    if (description !== undefined && description.length > 0)
      data.description = description;
    props.setLoading(true);
    let res = !props.isInEditMode
      ? await createNewOff(props.token, data)
      : null;

    props.setLoading(false);

    if (res !== null) {
      state.data.push(res);
      dispatch({data: state.data});
      props.setMode('list');
    }
  };

  return (
    <CommonWebBox
      header={'افزودن مورد جدید'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView style={{...styles.gap15}}>
        <JustBottomBorderTextInput
          placeholder={translator.title}
          subText={translator.title}
          value={title}
          onChangeText={e => setTitle(e)}
        />

        <JustBottomBorderTextInput
          placeholder={translator.price}
          subText={translator.price}
          justNum={true}
          value={price}
          onChangeText={e => setPrice(e)}
        />

        <JustBottomBorderTextInput
          placeholder={translator.maxVideoCalls}
          subText={translator.maxVideoCalls}
          justNum={true}
          value={videoCalls}
          onChangeText={e => setVideoCalls(e)}
        />

        <JustBottomBorderTextInput
          placeholder={translator.maxChat}
          subText={translator.maxChat + '  -  ' + commonTranslator.optional}
          justNum={true}
          value={maxChat}
          onChangeText={e => setMaxChat(e)}
        />

        <JustBottomBorderTextInput
          placeholder={translator.maxExam}
          subText={translator.maxExam + '  -  ' + commonTranslator.optional}
          justNum={true}
          value={maxExam}
          onChangeText={e => setMaxExam(e)}
        />

        <JustBottomBorderTextInput
          placeholder={translator.maxKarbarg}
          subText={translator.maxKarbarg + '  -  ' + commonTranslator.optional}
          justNum={true}
          value={maxKarbarg}
          onChangeText={e => setMaxKarbarg(e)}
        />

        <JustBottomBorderSelect
          placeholder={commonTranslator.visibility}
          subText={commonTranslator.visibility}
          setter={setVisibility}
          values={statusKeyVals}
          value={statusKeyVals.find(elem => elem.id === visibility)}
        />
      </PhoneView>
      <EqualTwoTextInputs>
        <JustBottomBorderTextInput
          multiline={true}
          value={description}
          placeholder={commonTranslator.desc}
          subText={commonTranslator.desc + '  -  ' + commonTranslator.optional}
          onChangeText={e => setDescription(e)}
        />
        <CommonButton
          title={commonTranslator.confrim}
          theme={'dark'}
          onPress={() => create()}
        />
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}

export default Create;
