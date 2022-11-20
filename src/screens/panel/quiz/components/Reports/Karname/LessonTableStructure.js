import {getWidthHeight} from '../../../../../../services/Utility';

let width = getWidthHeight()[0];
let colWidth;

if (width < 768) colWidth = 100;
else {
  width -= 200;
  colWidth = width > 1200 || width < 768 ? '25%' : width * 0.5 - 30 - 3 * 90;

  let numColsWidth = '90px';

  if ((width > 1200 || width < 768) && colWidth > 200) {
    colWidth = width * 0.5 - 30 - 3 * 110;
    numColsWidth = '110px';
  } else if ((width > 1200 || width < 768) && colWidth < 90) {
    colWidth = width * 0.5 - 30 - 3 * 70;
    numColsWidth = '70px';
  }
}

const commonCols = [
  {
    name: 'تعداد سوال',
    selector: row => row.total,
    maxWidth: '80px',
    minWidth: '80px',
    center: true,
  },
  {
    name: 'درست',
    selector: row => row.corrects,
    maxWidth: '55px',
    minWidth: '55px',
    center: true,
  },
  {
    name: 'نادرست',
    selector: row => row.incorrects,
    maxWidth: '55px',
    minWidth: '55px',
    center: true,
  },
  {
    name: 'نزده',
    selector: row => row.whites,
    maxWidth: '55px',
    minWidth: '55px',
    center: true,
  },
  {
    name: 'درصد',
    selector: row => row.percent,
    maxWidth: '55px',
    minWidth: '55px',
    center: true,
    style: {
      direction: 'ltr',
    },
  },
  {
    name: 'نمره تراز',
    selector: row => row.taraz,
    maxWidth: '60px',
    minWidth: '60px',
    center: true,
  },
];

const commonColsCustomQuiz = [
  {
    name: 'تعداد سوال',
    selector: row => row.total,
    maxWidth: '80px',
    minWidth: '80px',
    center: true,
  },
  {
    name: 'درست',
    selector: row => row.corrects,
    maxWidth: '55px',
    minWidth: '55px',
    center: true,
  },
  {
    name: 'نادرست',
    selector: row => row.incorrects,
    maxWidth: '55px',
    minWidth: '55px',
    center: true,
  },
  {
    name: 'نزده',
    selector: row => row.whites,
    maxWidth: '55px',
    minWidth: '55px',
    center: true,
  },
];

export const lessonCols = [
  {
    name: 'نام درس',
    selector: row => row.name,
    grow: 1,
    maxWidth: colWidth,
    minWidth: colWidth,
    style: {wordBreak: 'normal'},
  },
  ...commonCols,
];

export const lessonColsCustomQuiz = [
  {
    name: 'نام درس',
    selector: row => row.name,
    grow: 1,
    maxWidth: colWidth,
    minWidth: colWidth,
    style: {wordBreak: 'normal'},
  },
  ...commonColsCustomQuiz,
];

export const subjectCols = [
  {
    name: 'نام مبحث',
    selector: row => row.name,
    grow: 1,
    maxWidth: colWidth,
    minWidth: colWidth,
    style: {wordBreak: 'normal'},
  },
  ...commonCols,
];

export const subjectColsCustomQuiz = [
  {
    name: 'نام مبحث',
    selector: row => row.name,
    grow: 1,
    maxWidth: colWidth,
    minWidth: colWidth,
    style: {wordBreak: 'normal'},
  },
  ...commonColsCustomQuiz,
];
