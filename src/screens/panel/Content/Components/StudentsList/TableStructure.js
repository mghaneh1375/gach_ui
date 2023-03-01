const columns = [
  {
    name: 'نام دانش آموز',
    selector: row => row.student.name,
  },
  {
    name: 'کد ملی',
    selector: row => row.student.NID,
  },
  {
    name: 'تلفن همراه',
    selector: row => row.student.phone,
  },
  {
    name: 'ایمیل',
    selector: row => row.student.mail,
  },
  {
    name: 'تاریخ ثبت نام',
    selector: row => row.registerAt,
    grow: 2,
    style: {
      minWidth: '200px !important',
    },
  },
  {
    name: 'امتیاز',
    selector: row => (row.rate === undefined ? 'امتیاز داده نشده' : row.rate),
  },
  {
    name: 'تاریخ امتیاز',
    selector: row => (row.rate === undefined ? 'امتیاز داده نشده' : row.rateAt),
    grow: 2,
    style: {
      minWidth: '200px !important',
    },
  },
  {
    name: 'مبلغ پرداختی',
    selector: row => row.paid,
  },
];

export default columns;
