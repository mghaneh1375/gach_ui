import {convertTimestamp} from '../../../../services/Utility';

const columns = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    minWidth: '120px',
  },
  {
    name: 'زمان اجرا',
    selector: row =>
      convertTimestamp(row.start) + ' تا ' + convertTimestamp(row.end),
    grow: 4,
    minWidth: '200px',
    sortable: true,
    sortFunction: (a, b) => {
      return a.start - b.start;
    },
  },
  {
    name: 'تعداد سوال',
    selector: row => row.questionsCount,
    grow: 1,
    center: true,
  },
  {
    name: 'تعداد دانش آموزان',
    selector: row => row.studentsCount,
    grow: 1,
    center: true,
  },
];

export default columns;