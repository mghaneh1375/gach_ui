const columns = [
  {
    name: 'نام آزمون',
    selector: row => row.name,
    grow: 3,
    minWidth: '120px',
  },

  {
    name: 'زمان اجرا',
    selector: row => row.date,
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
  {
    name: 'رتبه در شهر',
    selector: row => row.cityRank,
    grow: 1,
    center: true,
  },
  {
    name: 'رتبه در استان',
    selector: row => row.stateRank,
    grow: 1,
    center: true,
  },
  {
    name: 'رتبه در کشور',
    selector: row => row.rank,
    grow: 1,
    center: true,
  },
  {
    name: 'تراز',
    selector: row => row.taraz,
    grow: 1,
    center: true,
  },
];

export default columns;
