import {CommonWebBox, MyView, PhoneView} from '@/styles/CommonComponents.jsx';
import {styles} from '@/styles/common/styles.js';
import Card from './Card.jsx';
function Team(props) {
  return (
    <MyView>
      <CommonWebBox
        style={{
          marginLeft: 25,
        }}
        header={'تیم\u200cها'}
      />
      <PhoneView
        style={{
          ...styles.gap15,
          ...styles.margin15,
        }}>
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
