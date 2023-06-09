import {
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
import {faNums} from '../../../services/Utility';
import {SimpleFontIcon} from '../../../styles/Common/FontIcon';

function Card(props) {
  const colors = ['#FFAA00', '#c5c5c5', '#D27F66'];

  return (
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
          {props.team.point === undefined && (
            <QuizItemCard
              text={'عضو ارشد'}
              val={props.team.student.name}
              icon={faUser}
              textFontSize={14}
              valFontSize={14}
            />
          )}
          {props.team.point !== undefined && (
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
          )}
          <PhoneView
            style={{...styleItemsParent, ...styles.gap15, ...{minHeight: 100}}}>
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

          {props.rank !== undefined && (
            <CommonButton
              onPress={() => props.onPress()}
              theme={'orangeRed'}
              title={'مشاهده جزئیات'}
            />
          )}
        </MyView>
      </MyView>
    </CommonWebBox>
  );
}

export default Card;
