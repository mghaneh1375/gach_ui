const TableStructure = [
  {
    name: ' نام و نام خانوادگی',
    selector: row => row.student.name,
    grow: 1,
  },
  {
    name: 'واحد',
    selector: row => row.student.unit,
    grow: 1,
  },
  {
    name: 'ضرورت',
    selector: row => row.statusFa,
    grow: 1,
  },
  {
    name: 'زمان ایجاد',
    selector: row => row.answeredDate,
    grow: 4,
    wrap: true,
    style: {
      minWidth: '200px !important',
    },
    sortable: true,
    sortFunction: (a, b) => {
      return a.expireAt - b.expireAt;
    },
  },
  {
    name: 'تاریخ ایجاد آخرین وضعیت',
    selector: row => row.sendDate,
    grow: 4,
    wrap: true,
    style: {
      minWidth: '200px !important',
    },
    sortable: true,
    sortFunction: (a, b) => {
      return a.expireAt - b.expireAt;
    },
  },
  {
    name: 'وضعیت',
    selector: row => row.status,
    grow: 1,
  },
  {
    name: 'بررسی کننده',
    selector: row => row.status,
    grow: 1,
  },
];

export default TableStructure;
