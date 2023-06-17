import {getWidthHeight} from '../../../services/Utility';
import {
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import vars from '../../../styles/root';
import Card from '../../panel/quiz/components/Card/Card';

function OnlineStanding(props) {
  let totalWidth = getWidthHeight()[0];
  let w = totalWidth - vars.RIGHT_MENU_WIDTH - 390 - 40;

  return (
    <MyView>
      <PhoneView>
        <MyView style={{...styles.paddingRight15, ...styles.paddingTop10}}>
          {props.quiz !== undefined && <Card quiz={props.quiz} />}
        </MyView>

        <CommonWebBox
          width={w}
          header={'توضیحات'}
          backBtn={true}
          onBackClick={() =>
            props.onBackClick !== undefined ? props.onBackClick() : undefined
          }>
          {props.desc !== undefined && (
            <SimpleText
              text={props.desc}
              style={{
                ...styles.padding30,
                ...styles.fontSize17,
                ...{height: props.height},
              }}
            />
          )}
        </CommonWebBox>
      </PhoneView>
    </MyView>
  );
}

export default OnlineStanding;
