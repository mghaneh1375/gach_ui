const columns = [
  {
    name: 'نام مصحح',
    selector: row => row.name,
  },
  {
    name: 'تعداد سوالات تخصیص یافته',
    selector: row => row.questions,
  },
  {
    name: 'تعداد دانش آموزان تخصیص یافته',
    selector: row => row.students,
  },
];

export default columns;
