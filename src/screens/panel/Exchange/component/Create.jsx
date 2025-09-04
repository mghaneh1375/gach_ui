import React, {useMemo, useState} from 'react';
import {dispatchExchangeContext, exchangeContext} from './Context';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from './translator';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {sectionKeyVals} from '../../offcode/components/Utility';
import {routes} from '../../../../API/APIRoutes';
import {showError, showSuccess} from '../../../../services/Utility';
import {styles} from '../../../../styles/Common/Styles';
import commonTranslator from '../../../../translator/Common';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(exchangeContext),
    React.useContext(dispatchExchangeContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [neededCoin, setNeededCoin] = useState();
  const [section, setSection] = useState();
  const [rewardAmount, setRewardAmount] = useState();
  const [isPercent, setIsPercent] = useState(false);

  const [sectionValues, offCodeTypeValues] = useMemo(() => {
    return [
      [
        {item: 'تبدیل به پول', id: 'money'},
        ...sectionKeyVals.map(e => {
          return {
            item: 'کد تخفیف - ' + e.item,
            id: e.id,
          };
        }),
      ],
      [
        {item: 'مقداری', id: 'value'},
        {item: 'درصدی', id: 'percent'},
      ],
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CommonWebBox
      header={'ایجاد تبدیل جدید'}
      onBackClick={() => props.setMode('list')}
      backBtn={true}>
      <PhoneView style={{...styles.gap10}}>
        <JustBottomBorderTextInput
          placeholder={translator.neededCoin}
          subText={translator.neededCoin}
          value={neededCoin}
          onChangeText={e => setNeededCoin(e)}
          justNum={true}
          float={true}
        />
      </PhoneView>

      <PhoneView style={{...styles.gap10}}>
        <JustBottomBorderSelect
          placeholder={translator.section}
          subText={translator.section}
          setter={setSection}
          values={sectionValues}
          value={
            section === undefined
              ? undefined
              : sectionValues.find(elem => elem.id === section)
          }
        />
        <JustBottomBorderTextInput
          placeholder={translator.rewardAmount}
          subText={translator.rewardAmount}
          value={rewardAmount}
          onChangeText={e => setRewardAmount(e)}
          justNum={true}
        />
        {section && section !== 'money' && (
          <JustBottomBorderSelect
            placeholder={translator.isPercent}
            subText={translator.isPercent}
            setter={setIsPercent}
            values={offCodeTypeValues}
            value={
              offCodeTypeValues === undefined
                ? undefined
                : offCodeTypeValues.find(elem => elem.id === isPercent)
            }
          />
        )}
      </PhoneView>

      <CommonButton
        onPress={async () => {
          if (
            neededCoin === undefined ||
            section === undefined ||
            rewardAmount === undefined
          ) {
            showError(commonTranslator.pleaseFillAllFields);
            return;
          }

          props.setLoading(true);
          const data = {
            neededCoin: neededCoin,
          };
          if (section !== 'money') {
            data.isPercent = isPercent === 'percent';
            data.section = section;
            data.offCodeAmount = rewardAmount;
          } else {
            data.money = rewardAmount;
          }

          const response = await generalRequest(
            routes.createNewExchange,
            'post',
            data,
            'data',
            props.token,
          );
          props.setLoading(false);
          if (response != null) {
            dispatch({exchanges: [...state.exchanges, response]});
            props.setMode('list');
            showSuccess();
          }
        }}
        theme={'dark'}
        title={'ذخیره'}
      />
    </CommonWebBox>
  );
}

export default Create;
