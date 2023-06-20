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
import {createNewOffer, updateOffer} from './Utility';
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

    if (maxExam) data.maxExam = maxExam;
    if (maxChat) data.maxChat = maxChat;
    if (maxKarbarg) data.maxKarbarg = maxKarbarg;

    if (description !== undefined && description.length > 0)
      data.description = description;

    props.setLoading(true);

    let res = !props.isInEditMode
      ? await createNewOffer(props.token, data)
      : await updateOffer(props.token, state.selectedRow.id, data);

    props.setLoading(false);

    if (res !== null) {
      if (!props.isInEditMode) state.data.unshift(res);
      else {
        state.data = state.data.map(e => {
          if (e.id === state.selectedRow.id) return res;
          return e;
        });
      }
      dispatch({data: state.data});
      props.setMode('list');
    }
  };

  React.useEffect(() => {
    if (
      price !== undefined ||
      state.selectedRow === undefined ||
      !props.isInEditMode
    )
      return;

    setMaxKarbarg(
      state.selectedRow.maxKarbarg === -1
        ? undefined
        : state.selectedRow.maxKarbarg,
    );

    setMaxExam(
      state.selectedRow.maxExam === -1 ? undefined : state.selectedRow.maxExam,
    );
    setPrice(state.selectedRow.price);
    setTitle(state.selectedRow.title);
    setVideoCalls(state.selectedRow.videoCalls);
    setVisibility(state.selectedRow.visibility);
    setDescription(state.selectedRow.description);
    setMaxChat(
      state.selectedRow.maxChat === -1 ? undefined : state.selectedRow.maxChat,
    );
  }, [props.isInEditMode, state.selectedRow, price]);

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
