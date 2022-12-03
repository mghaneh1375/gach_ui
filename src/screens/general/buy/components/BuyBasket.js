import {formatPrice, getDevice, showError} from '../../../../services/Utility';
import {
  BigBoldBlueText,
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import Translate from '../Translate';
import {styles} from '../../../../styles/Common/Styles';
import {goToPay, goToPayGroup} from './Utility';
import {setCacheItem} from '../../../../API/User';
import commonTranslator from '../../../../translator/Common';
import React, {useState, useRef} from 'react';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import vars from '../../../../styles/root';

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

    if (props.students !== undefined) data.studentIds = props.students;

    if (props.userOff !== undefined && props.userOff.code !== undefined)
      data.code = props.userOff.code;
    if (props.packageId !== undefined) data.packageId = props.packageId;

    props.setLoading(true);

    let res =
      props.students === undefined
        ? await goToPay(props.token, data)
        : await goToPayGroup(props.token, data);

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
  const [isShown, setIsShown] = useState(false);

  React.useEffect(() => {
    if (refId === undefined) return;

    setTimeout(() => {
      ref.current.submit();
    }, 1000);
  }, [refId]);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  return (
    <PhoneView
      style={{
        ...{alignSelf: 'flex-end', gap: 5},
        ...styles.alignItemsCenter,
      }}>
      {props.price > 10 && (
        <MyView>
          <PhoneView style={isInPhone ? {flexDirection: 'column'} : {}}>
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
                    {props.offs !== undefined && (
                      <button
                        style={{
                          backgroundColor: vars.DARK_BLUE,
                          borderColor: vars.DARK_BLUE,
                          rotateY: 'transform: rotateY(181deg)',
                          borderRadius: 3,
                          cursor: 'pointer',
                          margin: 5,
                        }}
                        onClick={() =>
                          isShown ? setIsShown(false) : setIsShown(true)
                        }>
                        <FontAwesomeIcon
                          style={{color: 'white', padding: 3}}
                          icon={faQuestion}
                        />
                      </button>
                    )}

                    {props.offs !== undefined &&
                      props.offs.length > 0 &&
                      isShown && (
                        <SimpleText
                          style={{
                            position: 'absolute',
                            zIndex: 3,
                            backgroundColor: vars.DARK_BLUE,
                            padding: 8,
                            borderRadius: 10,
                            left: 'calc(50% * -1)',
                            top:
                              props.offs.length === 1
                                ? -45
                                : props.offs.length === 2
                                ? -65
                                : -85,
                            width: 200,
                            color: 'white',
                          }}
                          text={props.offs.map(elem => {
                            return (elem += '\n');
                          })}
                        />
                      )}
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
            {props.shouldPay !== props.price && props.shouldPay > 10 && (
              <SimpleText
                style={{...{marginRight: 15}, ...styles.red}}
                text={formatPrice(props.shouldPay) + ' تومان '}
              />
            )}
            {props.shouldPay !== props.price && props.shouldPay <= 10 && (
              <SimpleText
                style={{...{marginRight: 15}, ...styles.red}}
                text={0 + ' تومان '}
              />
            )}
          </PhoneView>
        </MyView>
      )}

      {props.price > 0 && !isInPhone && (
        <MyView style={{...{marginRight: 40}, ...styles.alignItemsCenter}}>
          <CommonButton
            theme={'dark'}
            title={
              props.user === null || props.user === undefined
                ? 'برای خرید باید ورود کنید'
                : props.shouldPay > 10
                ? Translate.goToPay
                : Translate.buy
            }
            onPress={() =>
              props.user === null || props.user === undefined
                ? (window.location.href = '/login')
                : goToPayLocal()
            }
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

      {props.price > 0 && isInPhone && (
        <EqualTwoTextInputs>
          <CommonButton
            theme={'dark'}
            title={
              props.user === null || props.user === undefined
                ? 'برای خرید باید ورود کنید'
                : props.shouldPay > 10
                ? Translate.goToPay
                : Translate.buy
            }
            onPress={() =>
              props.user === null || props.user === undefined
                ? (window.location.href = '/login')
                : goToPayLocal()
            }
          />
          {props.shouldPay > 0 && (
            <SimpleText
              style={{
                ...styles.yellow_color,
                ...styles.fontSize13,
                ...styles.cursor_pointer,
                ...styles.alignSelfCenter,
              }}
              text={Translate.enterOff}
              onPress={() => props.toggleShowOffCodePane()}
            />
          )}
        </EqualTwoTextInputs>
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
