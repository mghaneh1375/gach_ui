import React, {useRef, useState} from 'react';
import {changeText, formatPrice, showError} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  SimpleText,
} from '../../../styles/Common';
import {CommonTextInput} from '../../../styles/Common/CommonTextInput';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';
import {chargeAccout} from './Utility';

function AccountCharge(props) {
  const [refId, setRefId] = useState();
  const [amount, setAmount] = useState();

  const charge = async () => {
    if (amount === undefined) {
      showError('لطفا مبلغ موردنظر خود را وارد نمایید.');
      return;
    }

    props.setLoading(true);
    let res = await chargeAccout(amount, props.token);
    props.setLoading(false);

    if (res !== null && res.action === 'pay') setRefId(res.refId);
  };

  const ref = useRef();

  React.useEffect(() => {
    if (refId === undefined) return;
    ref.current.submit();
  }, [refId]);
  return (
    <CommonWebBox
      width={390}
      header={Translate.accountIncrease}
      childStyle={{paddingLeft: 25}}>
      <SimpleText
        style={{
          ...styles.colorOrange,
          ...styles.fontSize15,
          ...styles.FontWeight600,
        }}
        text={
          Translate.accountBalance +
          ' ' +
          formatPrice(props.user.user.money) +
          ' ' +
          Translate.toman
        }
      />
      <MyView style={{...styles.marginRight25}}>
        <SimpleText
          style={{...styles.BlueBold, ...styles.fontSize17}}
          text={Translate.money}
        />
        <CommonTextInput
          placeHolder={Translate.moneyEnter}
          subText={Translate.moneyUnit}
          subTextTwo={Translate.moneyStr}
          justNum={true}
          value={amount}
          onChangeText={e => changeText(e, setAmount)}
        />
      </MyView>
      <CommonButton
        title={Translate.moneyPort}
        theme={'dark'}
        onPress={() => charge()}
      />
      {refId !== undefined && (
        <form
          ref={ref}
          action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
          method="post">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
    </CommonWebBox>
  );
}

export default AccountCharge;
