const commonColumns = [
  {
    name: 'عنوان',
    selector: row => row.title,
    grow: 2,
  },
  {
    name: 'واحد',
    selector: row => row.sectionFa,
    grow: 2,
  },
  {
    name: 'ضرورت',
    selector: row => row.priorityFa,
    grow: 1,
    center: true,
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
    sortable: true,
    sortFunction: (a, b) => {
      return a.expireAt - b.expireAt;
    },
  },
  {
    name: 'تاریخ ایجاد آخرین وضعیت',
    selector: row => row.sendDate,
    grow: 4,
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
];

export const StudentTableStructure = [...commonColumns];
