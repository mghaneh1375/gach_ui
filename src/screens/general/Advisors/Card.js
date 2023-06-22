import React, {useState} from 'react';
import {Image} from 'react-native';
import {Rating} from 'react-native-ratings';
import {globalStateContext} from '../../../App';
import Circle from '../../../components/web/Circle';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import {formatPrice} from '../../../services/Utility';

function Card(props) {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  const [pic, setPic] = useState();

  React.useEffect(() => {
    setPic(props.data.pic);
  }, [props.data.pic]);

  return (
    <CommonWebBox width={state.isInPhone ? 320 : 390}>
      <Circle
        style={{
          ...styles.positionAbsolute,
          marginRight: state.isInPhone ? -45 : -75,
          ...styles.marginTop20,
        }}
        child={
          pic !== undefined && (
            <Image
              style={{
                width: state.isInPhone ? 90 : 140,
                height: state.isInPhone ? 90 : 140,
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              source={pic}
            />
          )
        }
        diameter={state.isInPhone ? 100 : 150}
        backgroundColor={vars.YELLOW_WHITE}></Circle>
      <PhoneView
        style={{
          ...styles.positionAbsolute,
          top: -25,
          left: 15,
          ...styles.gap15,
        }}>
        <SimpleText
          style={{...styles.colorDarkBlue, ...styles.alignSelfCenter}}
          text={'امتیاز'}
        />
        <Circle
          diameter={50}
          text={props.data.rate === 0 ? '-' : props.data.rate}
          color={vars.DARK_BLUE}
          backgroundColor={vars.YELLOW_WHITE}
        />
      </PhoneView>
      <MyView
        style={{paddingRight: 80, ...styles.gap15, ...styles.marginTop20}}>
        <MyView
          style={{
            ...styles.justifyContentCenter,
            ...styles.paddingRight15,
            backgroundColor: vars.YELLOW_WHITE,
            borderRadius: 5,
            height: 40,
            marginRight: 0,
          }}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={'نام و نام خانوادگی :' + ' ' + props.data.name}
          />
        </MyView>
        <MyView style={{marginTop: -10, ...styles.gap5}}>
          {props.isMyAdvisor && (
            <SimpleText
              style={{...styles.BlueBold, ...styles.fontSize15, ...styles.red}}
              text={'مشاور من'}
            />
          )}
          <SimpleText
            style={{...styles.colorDarkBlue}}
            text={'تعداد دانش آموزان : ' + ' ' + props.data.stdCount}
          />

          <SimpleText
            style={{
              ...styles.colorDarkBlue,
              ...{minHeight: 100, maxHeight: 100},
            }}
            text={
              props.data.bio !== undefined
                ? 'درباره مشاور : ' + ' ' + props.data.bio
                : 'درباره مشاور : '
            }
          />
        </MyView>
      </MyView>

      {!props.isMyAdvisor &&
        props.data.acceptStd &&
        !props.hasOpenRequest &&
        state.token !== undefined &&
        state.token !== null && (
          <CommonButton
            onPress={() => props.onSelect()}
            title={'درخواست مشاوره'}
          />
        )}

      {props.shouldPay !== undefined && (
        <>
          <EqualTwoTextInputs>
            <SimpleText text={'وضعیت: در انتظار پرداخت'} />
            <SimpleText
              style={{...styles.red, ...styles.cursor_pointer}}
              onPress={() => props.onCancel()}
              text={'انصراف از درخواست'}
            />
          </EqualTwoTextInputs>

          <SimpleText
            text={
              'مبلغ مشاوره برای یک ماه: ' + formatPrice(props.price) + ' تومان'
            }
          />
          <SimpleText
            text={
              'مبلغ قابل پرداخت: ' + formatPrice(props.shouldPay) + ' تومان'
            }
          />
          <EqualTwoTextInputs>
            <CommonButton theme={'dark'} title="کد تخفیف" />
            <CommonButton onPress={() => props.onPay()} title={'پرداخت'} />
          </EqualTwoTextInputs>
        </>
      )}

      {props.setRate !== undefined && (
        <EqualTwoTextInputs
          style={{width: '100%', direction: 'ltr', alignItems: 'center'}}>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            fractions={0}
            onFinishRating={rating => props.setRate(rating)}
            style={{
              direction: 'ltr',
              cursor: 'pointer',
            }}
            startingValue={props.rate}
          />
          <SimpleText text={'امتیاز شما به مشاور'} />
        </EqualTwoTextInputs>
      )}

      {props.onRemove !== undefined && (
        <CommonButton onPress={() => props.onRemove()} title={'حذف مشاور'} />
      )}

      {props.onCancel !== undefined && props.shouldPay === undefined && (
        <EqualTwoTextInputs>
          <SimpleText text={'وضعیت: در حال بررسی توسط مشاور'} />
          <SimpleText
            style={{...styles.red, ...styles.cursor_pointer}}
            onPress={() => props.onCancel()}
            text={'انصراف از درخواست'}
          />
        </EqualTwoTextInputs>
      )}

      {}
    </CommonWebBox>
  );
}

export default Card;
