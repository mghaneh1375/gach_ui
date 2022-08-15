const commonCols = [
  {
    name: 'رتبه در مدرسه',
    selector: row => row.schoolRank,
    maxWidth: '75px',
    minWidth: '75px',
    center: true,
  },
  {
    name: 'رتبه در شهر',
    selector: row => row.cityRank,
    maxWidth: '75px',
    minWidth: '75px',
    center: true,
  },
  {
    name: 'رتبه در استان',
    selector: row => row.stateRank,
    maxWidth: '75px',
    minWidth: '75px',
    center: true,
  },
  {
    name: 'رتبه در کشور',
    selector: row => row.countryRank,
    maxWidth: '75px',
    minWidth: '75px',
    center: true,
  },
];

export const lessonRankingCols = [
  {
    name: 'نام درس',
    selector: row => row.name,
    maxWidth: '80px',
    minWidth: '80px',
  },
  ...commonCols,
];

export const subjectRankingCols = [
  {
    name: 'نام مبحث',
    selector: row => row.name,
    maxWidth: '80px',
    minWidth: '80px',
  },
  ...commonCols,
];

export const totalRankCols = [
  {
    name: 'تراز کل',
    selector: row => row.taraz,
    maxWidth: '60px',
    minWidth: '60px',
    center: true,
  },
  ...commonCols,
];
