import React, {useRef, useState} from 'react';
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
import {generalRequest} from '../../../API/Utility';

function AccountCharge(props) {
  const [refId, setRefId] = useState();

  const charge = async () => {
    let res = await chargeAccout();
    console.log(res);
    if (res !== null) {
      console.log(res);
      setRefId(res);
      // if (1 == 1) return;

      // let res = await generalRequest(
      //   'https://bpm.shaparak.ir/pgwchannel/startpay.mellat',
      //   'post',
      //   {
      //     RefId: refId,
      //   },
      //   undefined,
      //   undefined,
      // );
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

  //آقای عادلی گفتن این پاپ آپ هم میتونه باشه
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
        text={Translate.accountBalance + ' ' + props.accountBalance}
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
          method="post"
          target="_blank">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
    </CommonWebBox>
  );
}

export default AccountCharge;
