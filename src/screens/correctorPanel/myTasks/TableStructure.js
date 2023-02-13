const columns = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    minWidth: '120px',
  },
  {
    name: 'زمان اجرا',
    selector: row => row.start + ' تا ' + row.end,
    grow: 4,
    minWidth: '200px',
  },
  {
    name: 'تعداد سوال قابل تصحیح',
    selector: row => row.allCorrectorQuestions,
    grow: 1,
    center: true,
  },
  {
    name: 'تعداد سوالات تصحیح شده',
    selector: row => row.allMarkedQuestions,
    grow: 1,
    center: true,
  },
];

export default columns;
