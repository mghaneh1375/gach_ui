const columns = [
  {
    name: 'نام',
    center: true,
    selector: row => row.label,
    grow: 4,
  },
  {
    name: 'تعداد سوالات طراحی شده',
    selector: row => row.count,
    center: true,
    grow: 1,
    sortFunction: (a, b) => {
      return a.count - b.count;
    },
  },
  {
    name: 'میانگین درصد پاسخگویی دانش آموزان',
    center: true,
    selector: row => row.avg,
    grow: 1,
    sortFunction: (a, b) => {
      return a.avg - b.avg;
    },
  },
];

export default columns;
