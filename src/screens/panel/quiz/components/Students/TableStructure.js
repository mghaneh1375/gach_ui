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

export const columnsForTashtihi = [
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
    grow: 4,
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
    name: 'وضعیت تصحیح',
    selector: row => (row.allMarked ? 'تصحیح شده' : 'تصحیح نشده'),
  },
  {
    name: 'نمره کل',
    selector: row =>
      row.allMarked && row.totalMark !== undefined ? row.totalMark : '-',
  },
  {
    name: 'مصحح',
    selector: row =>
      row.corrector !== undefined ? row.corrector : 'تعیین نشده',
  },
  {
    name: 'مبلغ پرداختی',
    selector: row => row.paid,
  },
];

export const columnsForOnlineStanding = [
  {
    name: 'نام دانش آموز',
    selector: row => row.student.name,
  },
  {
    name: 'نام تیم',
    selector: row => row.teamName,
  },
  {
    name: 'تعداد افراد تیم',
    selector: row => row.teamCount,
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

export const columnsForQRTashtihi = [
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
    grow: 4,
    style: {
      minWidth: '200px !important',
    },
  },
  {
    name: 'وضعیت پاسخبرگ',
    selector: row => (row.hasAcceptedAnswerSheet ? 'ارسال شده' : 'ارسال نشده'),
  },
  {
    name: 'وضعیت تصحیح',
    selector: row => (row.allMarked ? 'تصحیح شده' : 'تصحیح نشده'),
  },
  {
    name: 'نمره کل',
    selector: row =>
      row.allMarked && row.totalMark !== undefined ? row.totalMark : '-',
  },
  {
    name: 'مصحح',
    selector: row =>
      row.corrector !== undefined ? row.corrector : 'تعیین نشده',
  },
  {
    name: 'مبلغ پرداختی',
    selector: row => row.paid,
  },
];

export default columns;
