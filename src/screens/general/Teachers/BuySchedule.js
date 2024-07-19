import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {formatPrice, getDevice} from '../../../services/Utility';
import {
  BigBoldBlueText,
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import {faQuestion} from '@fortawesome/free-solid-svg-icons';
import vars from '../../../styles/root';
import React, {useRef, useState} from 'react';
import {fetchUser, setCacheItem} from '../../../API/User';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import Translate from '../buy/Translate';

function BuySchedule(props) {
  const [refId, setRefId] = useState();
  const ref = useRef();
  const [isShown, setIsShown] = useState(false);

  React.useEffect(() => {
    if (refId === undefined) return;

    setTimeout(() => {
      ref.current.submit();
    }, 1000);
  }, [refId]);

  const isInPhone = getDevice().indexOf('WebPort') !== -1;

  const goToPayLocal = async () => {
    let data = {};

    if (props.userOff !== undefined && props.userOff.code !== undefined)
      data.code = props.userOff.code;

    props.setLoading(true);
    const res = await goToPay(props.token, data, props.id);
    props.setLoading(false);

    if (res !== null) {
      if (res.action === 'success') {
        await setCacheItem('user', undefined);
        await fetchUser(props.token, user => {});
        props.setShowSuccessTransaction(true);
      } else if (res.action === 'pay') {
        setRefId(res.refId);
      }
    }
  };

  const goToPay = async (token, data, scheduleId) => {
    return await generalRequest(
      routes.payForTeachSchedule + scheduleId,
      'post',
      data,
      ['action', 'refId'],
      token,
    );
  };

  return (
    <PhoneView
      style={{
        ...{alignSelf: 'flex-end', gap: 5},
        ...styles.alignItemsCenter,
      }}>
      {props.price > 0 && (
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
            {props.shouldPay !== props.price && (
              <SimpleText
                style={{...{marginRight: 15}, ...styles.red}}
                text={formatPrice(props.shouldPay) + ' تومان '}
              />
            )}
          </PhoneView>
        </MyView>
      )}

      {props.price > 0 && !isInPhone && (
        <MyView style={{...{marginRight: 40}, ...styles.alignItemsCenter}}>
          <CommonButton
            theme={'dark'}
            title={props.shouldPay > 0 ? Translate.goToPay : 'ثبت نام در جلسه'}
            onPress={() => goToPayLocal()}
          />
          {(props.shouldPay > 0 || props.userOff === undefined) && (
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
            title={props.shouldPay > 0 ? Translate.goToPay : 'ثبت نام در جلسه'}
            onPress={() => goToPayLocal()}
          />
          {(props.shouldPay > 0 || props.userOff === undefined) && (
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
          method="post">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
    </PhoneView>
  );
}

export default BuySchedule;
