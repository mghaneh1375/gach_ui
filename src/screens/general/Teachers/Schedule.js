import {
  faCalendar,
  faClock,
  faInfo,
  faListNumeric,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {faNums, formatPrice} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import Translator from '../../advisorPanel/Teach/Schedule/components/Translator';

function Schedule(props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <CommonWebBox title={props.plan.title} width={350}>
      <MyView style={{minHeight: '400px', gap: '5px'}}>
        <PhoneView style={{position: 'relative', justifyContent: 'center'}}>
          <SimpleFontIcon
            style={{color: vars.ORANGE}}
            parentStyle={{position: 'absolute', left: 0}}
            kind="midSize"
            icon={props.plan.teachMode === 'private' ? faUser : faUsers}
          />
          <SimpleText
            style={{
              ...styles.fontSize17,
              ...styles.BlueBold,
              ...styles.textCenter,
              ...{marginBottom: '5px'},
            }}
            text={
              props.plan.title.length > 30
                ? props.plan.title.substr(0, 30) + '...'
                : props.plan.title
            }
          />
        </PhoneView>

        {!showMore && (
          <>
            <PhoneView style={{gap: '10px'}}>
              {props.plan.startAt && (
                <QuizItemCard
                  text={Translator.start}
                  val={props.plan.startAt}
                  icon={faCalendar}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                />
              )}
              {props.plan.endRegistration && (
                <QuizItemCard
                  text={Translator.endRegistration}
                  val={props.plan.endRegistration}
                  icon={faCalendar}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                />
              )}
              <QuizItemCard
                text={Translator.duration}
                val={props.plan.length}
                icon={faClock}
                background={false}
                iconFontSize={'normal'}
                color={vars.YELLOW}
                textFontSize={14}
                valFontSize={14}
                isBold={true}
                isBoldValue={false}
              />
            </PhoneView>
            {props.plan.endRegistration && (
              <PhoneView style={{gap: '10px'}}>
                <QuizItemCard
                  text={Translator.startDate}
                  val={props.plan.startDate}
                  icon={faCalendar}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                />
                <QuizItemCard
                  text={Translator.endDate}
                  val={props.plan.endDate}
                  icon={faCalendar}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                />
              </PhoneView>
            )}
            {props.plan.endRegistration && (
              <PhoneView style={{gap: '10px'}}>
                <QuizItemCard
                  text={Translator.sessionsCount}
                  val={props.plan.sessionsCount}
                  icon={faListNumeric}
                  background={false}
                  iconFontSize={'normal'}
                  color={vars.YELLOW}
                  textFontSize={14}
                  valFontSize={14}
                  isBold={true}
                  isBoldValue={false}
                />
              </PhoneView>
            )}
            {props.plan.teachMode === 'semi_private' && (
              <>
                <PhoneView style={{justifyContent: 'space-between'}}>
                  <QuizItemCard
                    text={Translator.minCap}
                    val={props.plan.minCap}
                    icon={faInfo}
                    background={false}
                    iconFontSize={'normal'}
                    color={vars.YELLOW}
                    textFontSize={14}
                    valFontSize={14}
                    isBold={true}
                    isBoldValue={false}
                  />
                  <QuizItemCard
                    text={Translator.maxCap}
                    val={props.plan.maxCap}
                    icon={faInfo}
                    background={false}
                    iconFontSize={'normal'}
                    color={vars.YELLOW}
                    textFontSize={14}
                    valFontSize={14}
                    isBold={true}
                    isBoldValue={false}
                    minWidth={'155px'}
                  />
                </PhoneView>
                <PhoneView style={{justifyContent: 'space-between'}}>
                  <QuizItemCard
                    text={Translator.requestsCountForStudents}
                    val={props.plan.requestsCount}
                    icon={faInfo}
                    background={false}
                    iconFontSize={'normal'}
                    color={vars.YELLOW}
                    textFontSize={14}
                    valFontSize={14}
                    isBold={true}
                    isBoldValue={false}
                    minWidth={'112px'}
                  />
                </PhoneView>
              </>
            )}
          </>
        )}
        {props.plan.description && props.plan.description !== '' && (
          <MyView
            style={{
              minHeight: showMore ? 260 : 70,
              maxHeight: showMore ? 'unset' : 70,
            }}>
            <SimpleText
              style={{
                ...styles.dark_blue_color,
                ...{
                  maxHeight: showMore ? 'unset' : 46,
                  overflow: showMore ? 'unset' : 'hidden',
                },
              }}
              text={'توضیحات: ' + props.plan.description}
            />
            {showMore && (
              <SimpleText
                style={{
                  ...styles.yellow_color,
                  ...styles.alignSelfEnd,
                  ...styles.cursor_pointer,
                }}
                text={'نمایش کمتر'}
                onPress={() => setShowMore(false)}
              />
            )}

            {!showMore && (
              <SimpleText
                style={{
                  ...styles.yellow_color,
                  ...styles.alignSelfEnd,
                  ...styles.cursor_pointer,
                }}
                text={'نمایش بیشتر'}
                onPress={() => setShowMore(true)}
              />
            )}
          </MyView>
        )}
        {!props.plan.description && (
          <MyView style={{minHeight: showMore ? 260 : 70}}></MyView>
        )}
        {!showMore && (
          <MyView style={{position: 'absolute', bottom: '5px', width: '100%'}}>
            {props.plan.needRegistryConfirmation && (
              <SimpleText
                style={{
                  color: 'red',
                  fontSize: '11px',
                  fontWeight: 'bold',
                }}
                text={Translator.needRegistryConfirmationForStudents}
              />
            )}
            {props.plan.teachMode === 'semi_private' &&
              props.plan.shouldPrePay && (
                <>
                  <SimpleText
                    style={{
                      color: 'red',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}
                    text={Translator.prePayWarning}
                  />
                  <SimpleText
                    style={{
                      color: 'red',
                      fontSize: '11px',
                      fontWeight: 'bold',
                    }}
                    text={
                      'مبلغ پیش‌ثبت‌نام: ' +
                      formatPrice(props.plan.prePayAmount) +
                      ' تومان'
                    }
                  />
                </>
              )}
            <EqualTwoTextInputs style={{marginTop: '10px'}}>
              <MyView style={{justifyContent: 'center'}}>
                <SimpleText
                  style={{...styles.BlueBold, ...styles.fontSize15}}
                  text={formatPrice(props.plan.price)}
                />
                <SimpleText
                  style={{...styles.BlueBold, ...styles.fontSize15}}
                  text={' تومان'}
                />
              </MyView>
              {props.onSelect !== undefined && (
                <CommonButton
                  onPress={() => props.onSelect()}
                  theme={
                    (props.plan.teachMode === 'semi_private' &&
                      props.plan.shouldPrePay) ||
                    !props.plan.needRegistryConfirmation
                      ? 'orangeRed'
                      : 'dark'
                  }
                  title={
                    props.plan.teachMode === 'semi_private' &&
                    props.plan.shouldPrePay
                      ? 'پرداخت هزینۀ پیش ثبت‌نام'
                      : props.plan.teachMode === 'semi_private' ||
                        !props.plan.needRegistryConfirmation
                      ? 'پرداخت و ثبت‌نام در کلاس'
                      : 'درخواست پیش‌ثبت‌نام'
                  }
                />
              )}
            </EqualTwoTextInputs>
          </MyView>
        )}
      </MyView>
    </CommonWebBox>
  );
}

export default Schedule;
