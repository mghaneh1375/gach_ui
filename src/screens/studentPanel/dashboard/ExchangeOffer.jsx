import {useMemo} from 'react';
import {formatPrice} from '../../../services/Utility';
import {CommonWebBox, SimpleText} from '../../../styles/Common';
import vars from '../../../styles/root';

function ExchangeOffer(props) {
  const isOff = useMemo(() => {
    return props.offer.section !== 'تبدیل به پول';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CommonWebBox>
      <SimpleText
        style={{color: vars.DARK_BLUE, fontWeight: 'bold', fontSize: '16px'}}
        text={
          isOff ? 'تخفیف در قسمت ' + props.offer.section : props.offer.section
        }
      />
      <SimpleText
        text={'مقدار ایکس پول مورد نیاز: ' + props.offer.neededCoin}
      />

      {!isOff && (
        <SimpleText
          text={
            'مقدار جایزه: ' + formatPrice(props.offer.rewardAmount) + ' تومان'
          }
        />
      )}
      {isOff && !props.offer.isPercent && (
        <SimpleText
          text={
            'مقدار تخفیف: ' + formatPrice(props.offer.rewardAmount) + ' تومان'
          }
        />
      )}
      {isOff && props.offer.isPercent && (
        <SimpleText
          text={'مقدار تخفیف: ' + props.offer.rewardAmount + ' درصد'}
        />
      )}
      <SimpleText
        style={{
          color: vars.ORANGE_RED,
          fontWeight: 'bold',
          textAlign: 'left',
          cursor: 'pointer',
        }}
        text={'دریافت'}
        onPress={props.onPress}
      />
    </CommonWebBox>
  );
}

export default ExchangeOffer;
