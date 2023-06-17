import {
  faHourglassEnd,
  faHourglassStart,
  faInfo,
  faRankingStar,
  faTrophy,
  faUser,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import QuizItemCard from '../../../components/web/QuizItemCard';
import {
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import {
  styleCard,
  styleItemsParent,
  styleTitle,
  styleYellowBox,
} from '../../panel/package/card/Style';
import {
  convertSecToMin,
  faNums,
  getWidthHeight,
} from '../../../services/Utility';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';
import vars from '../../../styles/root';

function TeamDetail(props) {
  const colors = ['#FFAA00', '#c5c5c5', '#D27F66'];

  let totalWidth = getWidthHeight()[0];
  let w = totalWidth - vars.RIGHT_MENU_WIDTH - 390 - 40;

  return (
    <PhoneView>
      <MyView style={{...styles.paddingRight15, ...styles.paddingTop10}}>
        <CommonWebBox style={{...styleCard, ...styles.BlueBold}}>
          <MyView>
            <MyView
              style={{
                ...styleYellowBox,
                ...styles.BlueBold,
              }}>
              {props.rank !== undefined && (
                <MyView
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: '50%',
                    borderColor: colors[props.rank - 1],
                    border: '1px solid',
                    position: 'absolute',
                    backgroundColor: 'white',
                    left: 26,
                    top: -20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <SimpleFontIcon
                    kind={'large'}
                    icon={faTrophy}
                    style={{color: colors[props.rank - 1]}}
                  />
                  <SimpleText style={{fontSize: 17}} text={'#' + props.rank} />
                </MyView>
              )}
              <SimpleText
                style={{
                  ...styleTitle,
                  ...styles.BlueBold,
                }}
                text={props.team.teamName}
              />
            </MyView>
            <MyView style={{...styles.gap15, ...styles.padding10}}>
              <PhoneView style={{...styles.gap15}}>
                <QuizItemCard
                  text={'عضو ارشد'}
                  val={props.team.student.name}
                  icon={faUser}
                  textFontSize={14}
                  valFontSize={14}
                />
                <QuizItemCard
                  text={'تعداد سوالات حل شده'}
                  val={props.team.solved}
                  icon={faInfo}
                  textFontSize={14}
                  valFontSize={14}
                />
                <QuizItemCard
                  text={'امتیاز'}
                  val={props.team.point}
                  icon={faRankingStar}
                  textFontSize={14}
                  valFontSize={14}
                />
              </PhoneView>

              {props.team.startAt !== undefined && (
                <PhoneView style={{...styles.gap15}}>
                  <QuizItemCard
                    text={'زمان شروع آزمون'}
                    val={props.team.startAt}
                    icon={faHourglassStart}
                    textFontSize={14}
                    valFontSize={14}
                  />
                  <QuizItemCard
                    text={'زمان پایان آزمون'}
                    val={props.team.finishAt}
                    icon={faHourglassEnd}
                    textFontSize={14}
                    valFontSize={14}
                  />
                </PhoneView>
              )}

              <PhoneView
                style={{
                  ...styleItemsParent,
                  ...styles.gap15,
                  ...{minHeight: 100},
                }}>
                {props.team.team !== undefined &&
                  props.team.team.length > 0 &&
                  props.team.team.map((e, index) => {
                    return (
                      <QuizItemCard
                        text={'عضو ' + faNums[index]}
                        val={e.student.name}
                        icon={faUsers}
                        textFontSize={12}
                        valFontSize={12}
                        key={index}
                      />
                    );
                  })}
              </PhoneView>
            </MyView>
          </MyView>
        </CommonWebBox>
      </MyView>

      <CommonWebBox
        width={w}
        header={'سوالات حل شده'}
        backBtn={true}
        onBackClick={() => props.back()}>
        <MyView style={{minHeight: 175}}>
          <MyView>
            {props.team.marks.map((e, index) => {
              if (props.team.answers[index].mark === undefined) return;
              return (
                <PhoneView style={{...styles.gap50}}>
                  <SimpleText text={'سوال ' + (index + 1)} />
                  <SimpleText text={'نمره سوال: ' + e} />
                  <SimpleText
                    text={'نمره کسب شده: ' + props.team.answers[index].mark}
                  />
                  <SimpleText
                    text={
                      'زمان حل: ' +
                      convertSecToMin(props.team.answers[index].time) +
                      ' بعد از شروع آزمون '
                    }
                  />
                  <SimpleText
                    text={'امتیاز کسب شده: ' + props.team.answers[index].point}
                  />
                </PhoneView>
              );
            })}
          </MyView>

          {props.team.allAnswers !== undefined && (
            <>
              <SimpleText
                text={'پاسخ های ثبت شده'}
                style={{...styles.fontSize17, ...styles.BlueBold}}
              />

              <MyView>
                {props.team.allAnswers.map((e, index) => {
                  return (
                    <PhoneView style={{...styles.gap50}}>
                      <SimpleText text={'سوال ' + (index + 1)} />
                      <SimpleText text={'پاسخ تیم: ' + e} />
                    </PhoneView>
                  );
                })}
              </MyView>
            </>
          )}
        </MyView>
      </CommonWebBox>
    </PhoneView>
  );
}

export default TeamDetail;
