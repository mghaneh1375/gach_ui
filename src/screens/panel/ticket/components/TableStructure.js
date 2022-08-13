const commonColumns = [
  {
    name: 'واحد',
    selector: row => row.sectionFa,
    grow: 2,
  },
  {
    name: 'ضرورت',
    selector: row => row.priorityFa,
    grow: 1,
  },
  {
    name: 'وضعیت',
    selector: row => row.statusFa,
    grow: 5,
  },
  {
    name: 'زمان ایجاد',
    selector: row => row.sendDate,
    grow: 4,
    wrap: true,
    // style: {
    //   minWidth: '200px !important',
    // },
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
    // style: {
    //   minWidth: '200px !important',
    // },
    sortable: true,
    sortFunction: (a, b) => {
      return a.expireAt - b.expireAt;
    },
  },
];

export const TableStructure = [
  {
    name: ' نام و نام خانوادگی',
    selector: row => row.student.name,
    grow: 4,
    style: {
      justifyContent: 'flex-start',
    },
  },

  ...commonColumns,
  // {
  //   name: 'بررسی کننده',
  //   selector: row => row.status,
  //   grow: 1,
  // },
];

export const StudentTableStructure = [...commonColumns];
