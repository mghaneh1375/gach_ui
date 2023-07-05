import {CommonWebBox, MyView, PhoneView} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Card from './Card';

function Team(props) {
  return (
    <MyView>
      <CommonWebBox style={{marginLeft: 25}} header={'تیم ها'}></CommonWebBox>
      <PhoneView style={{...styles.gap15, ...styles.margin15}}>
        {props.quiz.teams.map((e, index) => {
          return (
            <Card
              rank={props.isRankingNeed !== undefined ? index + 1 : undefined}
              team={e}
              key={index}
              onPress={() => {
                props.setSelectedItem(e, index + 1);
              }}
            />
          );
        })}
      </PhoneView>
    </MyView>
  );
}

export default Team;
