import React from 'react';
import MiniCard from '../../screens/panel/quiz/components/CV/MiniCard';

function StudentCard(props) {
  return (
    <MiniCard
      styleCard100Percent={props.std.rank !== undefined}
      infoWidth={props.infoWidth}
      text={
        props.std.rank !== undefined
          ? 'رتبه: ' + props.std.rank.countryRank
          : ''
      }
      subTexts={[
        {label: 'تعداد آزمون‌های شرکت کرده: ', value: props.std.totalQuizzes},
        props.std.totalCorrects !== undefined
          ? {
              label: 'پاسخ های صحیح در این آزمون: ',
              value: props.std.totalCorrects,
            }
          : undefined,
        props.std.cumSum !== undefined
          ? {
              label: 'جمع امتیاز: ',
              value: props.std.cumSum,
            }
          : undefined,
        {label: 'نام مدرسه: ', value: props.std.student.school},
        {label: 'نام شهر: ', value: props.std.student.city},
        props.std.student.grade !== undefined
          ? {label: 'پایه تحصیلی: ', value: props.std.student.grade}
          : undefined,
        props.std.student.branches !== undefined
          ? {label: 'رشته: ', value: props.std.student.branches}
          : undefined,
        props.std.student.rank === -1
          ? undefined
          : {label: 'رتبه کل در آیریسک: ', value: props.std.student.rank},
      ]}
      header={props.std.student.name}
      ops={false}
      src={props.std.student.pic}
    />
  );
}

export default StudentCard;
