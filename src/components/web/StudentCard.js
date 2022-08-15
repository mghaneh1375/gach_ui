import MiniCard from '../../screens/panel/quiz/components/CV/MiniCard';

function StudentCard(props) {
  return (
    <MiniCard
      text={'رتبه: ' + props.std.rank.countryRank}
      subTexts={[
        {label: 'تعداد آزمون های شرکت کرده: ', value: props.std.totalQuizzes},
        {
          label: 'پاسخ های صحیح در این آزمون: ',
          value: props.std.totalCorrects,
        },
        {label: 'نام مدرسه: ', value: props.std.student.school},
        {label: 'نام شهر: ', value: props.std.student.city},
        {label: 'رتبه کل در آیریسک: ', value: props.std.student.rank},
      ]}
      header={props.std.student.name}
      ops={false}
      src={props.std.student.pic}
    />
  );
}

export default StudentCard;
