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

export const lessonCols = [
  {
    name: 'نام درس',
    selector: row => row.name,
    grow: 1,
    maxWidth: '80px',
    minWidth: '80px',
  },
  ...commonCols,
];

export const subjectCols = [
  {
    name: 'نام مبحث',
    selector: row => row.name,
    grow: 1,
    maxWidth: '80px',
    minWidth: '80px',
  },
  ...commonCols,
];
