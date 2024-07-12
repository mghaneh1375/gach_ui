import {useState} from 'react';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import {formatPrice} from '../../../services/Utility';
import vars from '../../../styles/root';
import Translator from '../../advisorPanel/Teach/Schedule/components/Translator';
import {faCalendar, faClock, faInfo} from '@fortawesome/free-solid-svg-icons';

function Schedule(props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <CommonWebBox title={props.plan.title}>
      {props.plan.description !== undefined && props.plan.description !== '' && (
        <MyView
          style={{
            minHeight: showMore ? 260 : 70,
            maxHeight: showMore ? 'unset' : 70,
          }}>
          <SimpleText
            style={{
              ...styles.dark_blue_color,
              ...{
                maxHeight: showMore ? 'unset' : 50,
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

      {!showMore && (
        <>
          <PhoneView style={{...styles.gap15}}>
            <QuizItemCard
              text={Translator.start}
              val={props.plan.startAt}
              icon={faCalendar}
              background={false}
              iconFontSize={'normal'}
              color={vars.YELLOW}
              textFontSize={14}
              valFontSize={14}
              isBold={false}
            />
            <QuizItemCard
              text={Translator.teachMode}
              val={props.plan.teachMode === 'private' ? 'خصوصی' : 'نیمه خصوصی'}
              icon={faInfo}
              background={false}
              iconFontSize={'normal'}
              color={vars.YELLOW}
              textFontSize={14}
              valFontSize={14}
              isBold={false}
            />
          </PhoneView>
          <PhoneView>
            <QuizItemCard
              text={Translator.duration}
              val={props.plan.length}
              icon={faClock}
              background={false}
              iconFontSize={'normal'}
              color={vars.YELLOW}
              textFontSize={14}
              valFontSize={14}
              isBold={false}
            />
          </PhoneView>

          <EqualTwoTextInputs>
            <MyView>
              <SimpleText
                style={{...styles.BlueBold, ...styles.fontSize17}}
                text={formatPrice(props.plan.price) + ' تومان'}
              />
            </MyView>
            {props.onSelect !== undefined && (
              <CommonButton
                onPress={() => props.onSelect()}
                theme={'yellow'}
                title={'انتخاب برنامه'}
              />
            )}
          </EqualTwoTextInputs>
        </>
      )}
    </CommonWebBox>
  );
}

export default Schedule;
