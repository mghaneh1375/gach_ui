import BoxRanking from '../../../../general/BoxRanking/BoxRanking';

function StudentCard(props) {
  return (
    <BoxRanking
      school={props.elem.student.school}
      grade={props.elem.student.grade}
      name={props.elem.student.name}
      city={props.elem.student.city}
      field={props.elem.student.branches}
      rank={props.elem.student.rank}
      pic={props.elem.student.pic}
    />
  );
}

export default StudentCard;
