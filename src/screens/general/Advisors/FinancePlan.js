import {formatPrice} from '../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import translator from '../../advisorPanel/MyFinancePlans/components/Translator';

function FinancePlan(props) {
  return (
    <CommonWebBox width={props.isInPhone ? 320 : 390}>
      <MyView
        style={{paddingRight: 10, ...styles.gap15, ...styles.marginTop20}}>
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
            text={props.plan.title}
          />
        </MyView>
        <MyView style={{marginTop: -10, ...styles.gap5}}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={
              props.plan.maxKarbarg === -1
                ? translator.maxKarbarg + ' : نامحدود'
                : translator.maxKarbarg + ' : ' + props.plan.maxKarbarg
            }
          />

          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={translator.maxVideoCalls + ' : ' + props.plan.videoCalls}
          />

          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={
              props.plan.maxChat === -1
                ? translator.maxChat + ' : نامحدود'
                : translator.maxChat + ' : ' + props.plan.maxChat
            }
          />

          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15}}
            text={
              props.plan.maxExam === -1
                ? translator.maxExam + ' : نامحدود'
                : translator.maxExam + ' : ' + props.plan.maxExam
            }
          />

          <SimpleText
            style={{...styles.BlueBold, ...styles.fontSize15, ...styles.red}}
            text={
              translator.price +
              ' : ' +
              formatPrice(props.plan.price) +
              ' تومان'
            }
          />

          <CommonButton
            onPress={() => props.onSelect()}
            theme={'dark'}
            title={'انتخاب گزینه'}
          />
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default FinancePlan;
