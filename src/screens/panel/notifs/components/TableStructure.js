const columns = [
  {
    name: 'نام',
    selector: row => row.student.name,
    grow: 3,
    center: true,
  },
  {
    name: 'کدملی',
    selector: row => row.student.NID,
    grow: 2,
    center: true,
  },
  {
    name: 'ایمیل',
    selector: row => row.student.mail,
    grow: 2,
    center: true,
  },
  {
    name: 'شماره همراه',
    selector: row => row.student.phone,
    grow: 2,
    center: true,
  },
  {
    name: 'شهر',
    selector: row => row.student.city,
    grow: 2,
    center: true,
  },
  {
    name: 'مدرسه',
    selector: row => row.student.school,
    grow: 2,
    center: true,
  },
  {
    name: 'مقطع',
    selector: row => row.student.grade,
    grow: 2,
    center: true,
  },
];

export default columns;
