import React, {useState} from 'react';
import commonTranslator from '../../../../../translator/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import {
  offCodeKeyVals,
  typeGiftKeyVals,
  typeOffCodeKeyVals,
} from '../../../spinGift/components/SelectGift/create/keyVals';
import JustBottomBorderDatePicker from '../../../../../styles/Common/JustBottomBorderDatePicker';
import {changeText} from '../../../../../services/Utility';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import {dispatchQuizContext, quizContext} from '../Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [giftType, setGiftType] = useState();
  const [amount, setAmount] = useState();
  const [useFor, setUseFor] = useState();
  const [typeOffCode, setTypeOffCode] = useState();
  const [dateExpire, setDateExpire] = useState('');
  const [description, setDescription] = useState();

  return (
    <CommonWebBox
      header={'انتخاب جایزه نفر ' + state.selectedRank}
      backBtn={true}
      onBackClick={() => props.setMode('gifts')}>
      <MyView>
        <PhoneView style={{gap: 9}}>
          <JustBottomBorderSelect
            placeholder={'نوع جایزه'}
            subText={'نوع جایزه'}
            setter={setGiftType}
            value={typeGiftKeyVals.find(elem => {
              return elem.id === giftType;
            })}
            values={typeGiftKeyVals}
          />
          {giftType !== 'free' && (
            <JustBottomBorderTextInput
              justNum={true}
              placeholder={'مقدار'}
              subText={'مقدار'}
              onChangeText={text => changeText(text, setAmount)}
              value={amount}
              float={giftType === 'coin' ? true : undefined}
            />
          )}

          {giftType === 'offcode' && (
            <JustBottomBorderSelect
              placeholder={'مورد استفاده'}
              subText={'مورد استفاده'}
              setter={setUseFor}
              value={offCodeKeyVals.find(elem => {
                return elem.id === useFor;
              })}
              values={offCodeKeyVals}
            />
          )}
          {giftType === 'offcode' && (
            <JustBottomBorderSelect
              placeholder={'نوع کد تخفیف'}
              subText={'نوع کد تخفیف'}
              setter={setTypeOffCode}
              value={typeOffCodeKeyVals.find(elem => {
                return elem.id === typeOffCode;
              })}
              values={typeOffCodeKeyVals}
            />
          )}
          {giftType === 'offcode' && (
            <JustBottomBorderDatePicker
              placeholder={commonTranslator.dateExpire}
              subText={commonTranslator.dateExpire}
              setter={setDateExpire}
              value={dateExpire}
            />
          )}
        </PhoneView>

        {giftType === 'free' && (
          <JustBottomBorderTextInput
            placeholder={'جایزه موردنظر'}
            subText={'جایزه موردنظر'}
            multiline={true}
            value={description}
            onChangeText={e => setDescription(e)}
          />
        )}
      </MyView>
      <MyView>
        <CommonButton
          onPress={async () => {
            props.setLoading(true);
            let data = {
              type: giftType,
              rank: state.selectedRank,
            };
            if (giftType === 'offcode') {
              data.useFor = useFor;
              data.offCodeType = typeOffCode;
              data.expireAt = dateExpire;
            }
            if (giftType === 'free') data.description = description;
            else data.amount = amount;

            let res = await generalRequest(
              routes.addEscapeQuizGift + state.selectedQuiz.id,
              'post',
              data,
              'data',
              props.token,
            );

            props.setLoading(false);
            if (res !== null) {
              state.selectedQuiz.gifts = state.selectedQuiz.gifts.map(e => {
                if (e.rank === state.selectedRank) return res;
                return e;
              });
              dispatch({selectedQuiz: state.selectedQuiz});
              props.setMode('gifts');
            }
          }}
          title={commonTranslator.confrim}
        />
      </MyView>
    </CommonWebBox>
  );
}

export default Create;
