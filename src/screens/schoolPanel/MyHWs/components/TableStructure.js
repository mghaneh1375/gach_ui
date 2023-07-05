import {convertTimestamp} from '../../../../services/Utility';

const columns = [
  {
    name: 'نام آزمون',
    selector: row => row.title,
    grow: 3,
    minWidth: '120px',
  },
  {
    name: 'زمان اجرا',
    selector: row =>
      convertTimestamp(row.start) + ' تا ' + convertTimestamp(row.end),
    grow: 4,
    minWidth: '200px',
    sortable: true,
    sortFunction: (a, b) => {
      return a.start - b.start;
    },
  },
  {
    name: 'وضعیت نمایش',
    selector: row => (row.visibility ? 'نمایش' : 'مخفی'),
    grow: 1,
    center: true,
  },
  {
    name: 'وضعیت پرداخت',
    selector: row =>
      row.status === 'init'
        ? 'پرداخت نشده'
        : row.status === 'finish'
        ? 'پرداخت شده'
        : 'آماده پرداخت توسط دانش آموزان',
    grow: 1,
    center: true,
  },
  {
    name: 'وضعیت ساخت تراز',
    selector: row =>
      row.reportStatus !== undefined && row.reportStatus === 'ready'
        ? 'ساخته شده'
        : 'ساخته نشده',
    grow: 1,
    center: true,
  },
  {
    name: 'تعداد فایل های ضمیمه شده',
    selector: row => row.attachesCount,
    grow: 1,
    center: true,
  },
  {
    name: 'تعداد دانش آموزان',
    selector: row => row.studentsCount,
    grow: 1,
    center: true,
  },
];

export default columns;
