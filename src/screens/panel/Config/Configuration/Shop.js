import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from './Translator';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import commonTranslator from '../../../../translator/Common';
import {showSuccess, trueFalseValues} from '../../../../services/Utility';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';

function Shop(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [minBuyAmountForShop, setMinBuyAmountForShop] = useState();
  const [percentOfShopBuy, setPercentOfShopBuy] = useState();
  const [createShopOffVisibility, setCreateShopOffVisibility] = useState();

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.getShopConfiguration,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] == null) {
        navigate('/');
        return;
      }

      const data = res[0];

      setMinBuyAmountForShop(data.minBuyAmountForShop);
      setPercentOfShopBuy(data.percentOfShopBuy);
      setCreateShopOffVisibility(data.createShopOffVisibility);
    });
  }, [navigate, state.token, dispatch]);

  const update = () => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.updateConfiguration,
        'put',
        {
          minBuyAmountForShop: minBuyAmountForShop,
          percentOfShopBuy: percentOfShopBuy,
          createShopOffVisibility: createShopOffVisibility,
        },
        undefined,
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] !== null) {
        showSuccess(commonTranslator.success);
      }
    });
  };

  return (
    <MyView>
      <CommonWebBox>
        <PhoneView style={{gap: 15}}>
          <JustBottomBorderSelect
            placeholder={translator.createShopOffVisibility}
            subText={translator.createShopOffVisibility}
            setter={setCreateShopOffVisibility}
            values={trueFalseValues}
            value={trueFalseValues.find(
              elem => elem.id === createShopOffVisibility,
            )}
          />

          {createShopOffVisibility !== undefined && createShopOffVisibility && (
            <>
              <JustBottomBorderTextInput
                placeholder={translator.minBuyAmountForShop}
                subText={translator.minBuyAmountForShop}
                value={minBuyAmountForShop}
                onChangeText={e => setMinBuyAmountForShop(e)}
                justNum={true}
                float={true}
              />
              <JustBottomBorderTextInput
                placeholder={translator.percentOfShopBuy}
                subText={translator.percentOfShopBuy}
                value={percentOfShopBuy}
                onChangeText={e => setPercentOfShopBuy(e)}
                justNum={true}
              />
            </>
          )}
        </PhoneView>

        <CommonButton
          onPress={() => update()}
          title={commonTranslator.update}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default Shop;
