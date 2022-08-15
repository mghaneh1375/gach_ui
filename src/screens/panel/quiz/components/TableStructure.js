import {convertTimestamp} from '../../../../services/Utility';

const columns = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    wrap: true,
  },
  {
    name: 'قیمت',
    selector: row => row.price,
    grow: 1,
  },
  {
    name: 'زمان اجرا',
    selector: row =>
      convertTimestamp(row.start) + ' تا ' + convertTimestamp(row.end),
    grow: 4,
    wrap: true,
    style: {
      minWidth: '200px !important',
    },
    sortable: true,
    sortFunction: (a, b) => {
      return a.start - b.start;
    },
  },
  {
    name: 'بازه ثبت نام',
    selector: row =>
      convertTimestamp(row.startRegistry) +
      ' تا ' +
      convertTimestamp(row.endRegistry),
    grow: 4,
    wrap: true,
    style: {
      minWidth: '200px !important',
    },
  },
  {
    name: 'تعداد سوال',
    selector: row => row.questionsCount,
    grow: 1,
  },
  {
    name: 'تعداد دانش آموزان',
    selector: row => row.studentsCount,
    grow: 5,
  },
];

export default columns;
