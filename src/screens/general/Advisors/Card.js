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
import {
  faArrowLeft,
  faBook,
  faCalendarAlt,
  faSchool,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {FontIcon} from '../../../styles/Common/FontIcon';

function Card(props) {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();
  const [pic, setPic] = useState();

  const isInApp =
    window.navigator.userAgent.toLowerCase().indexOf('android') !== -1;

  React.useEffect(() => {
    setPic(props.data.pic);
  }, [props.data.pic]);

  return (
    <CommonWebBox
      width={
        state.isInPhone || props.digest === undefined || !props.digest
          ? '100%'
          : 400
      }>
      <EqualTwoTextInputs
        style={{
          ...styles.justifyContentCenter,
          ...styles.paddingRight15,
          backgroundColor: vars.YELLOW_WHITE,
          borderRadius: 5,
          height: 40,
          marginRight: 0,
        }}>
        <SimpleText
          style={{
            ...styles.BlueBold,
            ...styles.fontSize15,
            ...styles.alignSelfCenter,
          }}
          text={props.data.name}
        />

        <PhoneView
          style={{
            ...styles.positionAbsolute,
            top: -5,
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
            color={vars.WHITE}
            backgroundColor={vars.ORANGE_RED}
          />
          {props.selected && (
            <PhoneView
              style={{
                marginTop: 10,
              }}>
              <FontIcon
                onPress={props.onBackClick}
                theme="rect"
                kind="normal"
                icon={faArrowLeft}
              />
            </PhoneView>
          )}
        </PhoneView>
      </EqualTwoTextInputs>

      <PhoneView
        style={state.isInPhone ? {...styles.gap15} : {...styles.gap100}}>
        <PhoneView
          style={{
            maxWidth: state.isInPhone ? '100%' : '520px',
            minWidth: state.isInPhone ? '100%' : '520px',
            flexDirection: state.isInPhone ? 'column' : 'row',
          }}>
          <MyView
            style={{
              border: state.isInPhone ? 'unset' : '4px solid',
              borderColor: vars.ORANGE,
              borderRadius: 7,
              width: state.isInPhone ? 100 : 148,
              height: state.isInPhone ? 100 : 148,
              marginTop: state.isInPhone ? 0 : 20,
            }}>
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
          </MyView>

          <MyView
            style={{
              paddingRight: 20,
              maxWidth: '350px',
              minWidth: '350px',
              ...styles.gap15,
              ...styles.marginTop20,
            }}>
            <MyView style={{marginTop: -10, ...styles.gap5}}>
              <QuizItemCard
                text={'تعداد دانش آموزان'}
                val={props.data.stdCount + ' نفر'}
                icon={faUser}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={true}
                isBoldValue={false}
                maxWidth={350}
              />

              {props.data.age !== undefined && (
                <QuizItemCard
                  text={'سن'}
                  val={props.data.age + ' سال'}
                  icon={faCalendarAlt}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                  maxWidth={350}
                />
              )}
              {props.data.form !== undefined && (
                <>
                  <QuizItemCard
                    text={'مدارس همکار'}
                    val={props.data.form.workSchools}
                    icon={faSchool}
                    background={false}
                    iconFontSize={'normal'}
                    color={vars.YELLOW}
                    textFontSize={14}
                    valFontSize={14}
                    isBold={true}
                    isBoldValue={false}
                    maxWidth={350}
                  />

                  <QuizItemCard
                    text={'دروس تخصصی'}
                    val={props.data.form.workLessons}
                    icon={faBook}
                    background={false}
                    iconFontSize={'normal'}
                    color={vars.YELLOW}
                    textFontSize={14}
                    valFontSize={14}
                    isBold={true}
                    isBoldValue={false}
                    maxWidth={350}
                  />
                </>
              )}
            </MyView>
          </MyView>
        </PhoneView>

        {(props.digest === undefined || !props.digest) && (
          <MyView
            style={{
              ...{
                minHeight: 100,
                maxHeight: 220,
                justifyContent: 'space-between',
                maxWidth: state.isInPhone
                  ? 'calc(100% - 30px)'
                  : 'calc(100% - 630px)',
              },
            }}>
            <MyView>
              <SimpleText
                style={{
                  ...styles.BlueBold,
                }}
                text={'درباره مشاور'}
              />
              {props.data.bio !== undefined && (
                <SimpleText
                  style={{
                    ...styles.colorDarkBlue,
                    ...styles.marginTop10,
                  }}
                  text={props.data.bio}
                />
              )}
            </MyView>
            {props.data.videoLink !== undefined && props.data.videoLink !== '' && (
              <MyView>
                <a
                  style={{fontFamily: 'IRANSans'}}
                  target="_blank"
                  href={props.data.videoLink}>
                  معرفی ویدیویی
                </a>
              </MyView>
            )}
          </MyView>
        )}
      </PhoneView>

      {props.data.tags && props.data.tags.length > 0 && (
        <>
          <SimpleText
            style={{...styles.dark_blue_color, ...styles.marginTop10}}
            text={'تگ\u200cها'}
          />
          <PhoneView style={{...styles.gap10, ...{marginTop: -10}}}>
            {props.data.tags.map((e, index) => {
              return (
                <SimpleText
                  key={index}
                  style={{...styles.colorDarkBlue}}
                  text={'#' + e}
                />
              );
            })}
          </PhoneView>
        </>
      )}
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
      {props.isMyAdvisor &&
        (props.showMyAdvisor === undefined || props.showMyAdvisor) && (
          <SimpleText
            style={{
              ...styles.marginLeft15,
              ...styles.alignSelfEnd,
              ...styles.BlueBold,
              ...styles.cursor_pointer,
              ...styles.fontSize15,
              ...styles.red,
            }}
            onPress={() =>
              isInApp ? props.navigate('/myAdvisor') : window.open('/myAdvisor')
            }
            text={'مشاور من - رفتن به پنل مشاوره'}
          />
        )}

      {props.shouldPay !== undefined && (
        <>
          <SimpleText
            style={{...styles.dark_blue_color}}
            text={'وضعیت: در انتظار پرداخت'}
          />

          <EqualTwoTextInputs>
            <SimpleText
              style={{...styles.dark_blue_color}}
              text={
                'مبلغ مشاوره برای یک ماه: ' +
                formatPrice(props.price) +
                ' تومان'
              }
            />
            {props.offAmount !== undefined && (
              <SimpleText
                style={{...styles.dark_blue_color}}
                text={
                  'تخفیف اعمال شده: ' + formatPrice(props.offAmount) + ' تومان'
                }
              />
            )}
            <SimpleText
              style={{...styles.dark_blue_color}}
              text={
                'مبلغ قابل کسر از حساب کاربری: ' +
                formatPrice(props.userMoney) +
                ' تومان'
              }
            />
            <SimpleText
              style={{...styles.BlueBold, ...styles.fontSize17}}
              text={
                'مبلغ قابل پرداخت: ' + formatPrice(props.shouldPay) + ' تومان'
              }
            />
          </EqualTwoTextInputs>

          <PhoneView style={{...styles.alignSelfEnd}}>
            <CommonButton
              theme={'orangeRed'}
              onPress={() => props.onCancel()}
              title={'انصراف از درخواست'}
            />

            <CommonButton
              onPress={() => props.onOffClick()}
              theme={'dark'}
              title="کد تخفیف"
            />
            <CommonButton
              onPress={() => props.onPay()}
              title={props.shouldPay > 100 ? 'پرداخت' : 'نهایی سازی'}
            />
          </PhoneView>
        </>
      )}

      {props.setRate !== undefined && (
        <MyView style={{marginTop: -50}}>
          <PhoneView
            style={{
              ...styles.alignSelfEnd,
              ...styles.alignItemsCenter,
              ...styles.gap10,
              ...styles.marginLeft15,
            }}>
            <SimpleText
              style={{...styles.dark_blue_color}}
              text={'امتیاز شما به مشاور'}
            />
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
          </PhoneView>

          <PhoneView style={{...styles.alignSelfEnd}}>
            {props.onRemove !== undefined && (
              <CommonButton
                theme={'orangeRed'}
                onPress={() => props.onRemove()}
                title={'حذف مشاور'}
              />
            )}
            {props.btn !== undefined && props.btn}
          </PhoneView>
        </MyView>
      )}

      {props.onCancel !== undefined && props.shouldPay === undefined && (
        <EqualTwoTextInputs>
          <SimpleText
            style={{...styles.dark_blue_color}}
            text={'وضعیت: در حال بررسی توسط مشاور'}
          />
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
