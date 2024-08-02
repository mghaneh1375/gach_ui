import {convertTimestamp} from '../../../../services/Utility';

const columns = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    minWidth: '120px',
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
    minWidth: '200px',
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
    minWidth: '200px',
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

export const columnsForOnlineStanding = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    minWidth: '120px',
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
    minWidth: '200px',
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
    minWidth: '200px',
  },
  {
    name: 'تعداد سوال',
    selector: row => row.questionsCount,
    grow: 1,
    center: true,
  },
  {
    name: 'تعداد تیم\u200cها',
    selector: row => row.teamsCount,
    grow: 1,
    center: true,
  },
];

export const columnsForOpenQuiz = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    minWidth: '120px',
  },
  {
    name: 'قیمت',
    selector: row => row.price,
    grow: 1,
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

export const columnsForContentQuiz = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    minWidth: '120px',
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
