import {formatPrice, showError} from '../../../../services/Utility';
import {
  BigBoldBlueText,
  CommonButton,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import Translate from '../Translate';
import {styles} from '../../../../styles/Common/Styles';
import {goToPay} from './Utility';
import {setCacheItem} from '../../../../API/User';
import commonTranslator from '../../../../translator/Common';
import React, {useState, useRef} from 'react';

function BuyBasket(props) {
  const [refId, setRefId] = useState();

  const goToPayLocal = async () => {
    if (
      props.token === null ||
      props.token === undefined ||
      props.token === ''
    ) {
      showError(commonTranslator.shouldLogin);
      return;
    }

    let data = {
      ids: props.wantedQuizzes,
    };
    if (props.userOff !== undefined && props.userOff.code !== undefined)
      data.code = props.userOff.code;
    if (props.packageId !== undefined) data.packageId = props.packageId;

    props.setLoading(true);
    let res = await goToPay(props.token, data);

    props.setLoading(false);
    if (res !== null) {
      if (res.action === 'success') {
        let user = props.user;
        user.user.money = res.refId;
        await setCacheItem('user', JSON.stringify(user));
        if (props.setShowInfo !== undefined) props.setShowInfo(false);
        props.setShowSuccessTransaction(true);
      } else if (res.action === 'pay') {
        setRefId(res.refId);
      }
    }
  };

  const ref = useRef();

  React.useEffect(() => {
    if (refId === undefined) return;
    console.log('Salam');
    setTimeout(() => {
      ref.current.submit();
    }, 1000);
  }, [refId]);

  return (
    <PhoneView
      style={{
        ...{alignSelf: 'flex-end', gap: 5},
        ...styles.alignItemsCenter,
      }}>
      {props.price > 0 && (
        <MyView>
          <PhoneView>
            <BigBoldBlueText style={{marginTop: 5}} text={Translate.amount} />

            {(props.off > 0 || props.usedFromWallet > 0) && (
              <MyView>
                {props.off > 0 && (
                  <PhoneView style={styles.alignItemsCenter}>
                    <SimpleText
                      text={formatPrice(props.off)}
                      style={{
                        ...{marginRight: 10},
                        ...styles.yellow_color,
                        ...styles.fontSize13,
                      }}
                    />
                    <SimpleText
                      style={{
                        ...{marginRight: 5},
                        ...styles.dark_blue_color,
                        ...styles.fontSize13,
                      }}
                      text={Translate.off}
                    />
                  </PhoneView>
                )}
                {props.usedFromWallet > 0 && (
                  <PhoneView style={styles.alignItemsCenter}>
                    <SimpleText
                      text={formatPrice(props.usedFromWallet)}
                      style={{
                        ...{marginRight: 10},
                        ...styles.yellow_color,
                        ...styles.fontSize13,
                      }}
                    />
                    <SimpleText
                      style={{
                        ...{marginRight: 5},
                        ...styles.dark_blue_color,
                        ...styles.fontSize13,
                      }}
                      text={Translate.wallet}
                    />
                  </PhoneView>
                )}
              </MyView>
            )}
          </PhoneView>
          <PhoneView>
            <SimpleText
              style={
                props.shouldPay !== props.price
                  ? {
                      ...styles.dark_blue_color,
                      ...styles.textDecorRed,
                    }
                  : {...styles.dark_blue_color}
              }
              text={formatPrice(props.price) + ' تومان '}
            />
            {props.shouldPay !== props.price && (
              <SimpleText
                style={{...{marginRight: 15}, ...styles.red}}
                text={formatPrice(props.shouldPay) + ' تومان '}
              />
            )}
          </PhoneView>
        </MyView>
      )}

      {props.price > 0 && (
        <MyView style={{...{marginRight: 40}, ...styles.alignItemsCenter}}>
          <CommonButton
            theme={'dark'}
            title={props.shouldPay > 0 ? Translate.goToPay : Translate.buy}
            onPress={() => goToPayLocal()}
          />
          {props.shouldPay > 0 && (
            <SimpleText
              style={{
                ...styles.yellow_color,
                ...styles.fontSize13,
                ...styles.cursor_pointer,
              }}
              text={Translate.enterOff}
              onPress={() => props.toggleShowOffCodePane()}
            />
          )}
        </MyView>
      )}

      {refId !== undefined && (
        <form
          ref={ref}
          action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
          method="post"
          target="_blank">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
    </PhoneView>
  );
}

export default BuyBasket;
