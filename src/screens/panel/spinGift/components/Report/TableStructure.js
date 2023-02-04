const columns = [
  {
    name: 'نام کاربر',
    selector: row => row.student.name,
    grow: 3,
  },
  {
    name: 'مدرسه',
    selector: row => row.student.school,
    grow: 2,
  },
  {
    name: 'کدملی',
    selector: row => row.student.NID,
    grow: 2,
  },
  {
    name: 'شماره همراه',
    selector: row => row.student.phone,
    grow: 2,
  },
  {
    name: 'مقطع',
    selector: row => row.student.grade,
    grow: 2,
  },
  {
    name: 'تاریخ',
    selector: row => row.createdAt,
    grow: 2,
  },
  {
    name: 'جایزه',
    selector: row => row.gift,
    grow: 2,
  },
  {
    name: 'مرتبه',
    selector: row => row.repeat,
    grow: 2,
  },
];

export default columns;
