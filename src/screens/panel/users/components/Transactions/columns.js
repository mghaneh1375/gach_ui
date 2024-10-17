import {formatPrice} from '../../../../../services/Utility';

const adviceColumns = [
  {
    name: 'عنوان',
    selector: row => row.title,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'تاریخ پرداخت',
    selector: row => row.paidAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'تاریخ تسویه',
    selector: row => row.settledAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'مقدار تسویه',
    selector: row =>
      row.settledAmount === undefined ? '' : formatPrice(row.settledAmount),
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'هزینه مشاوره',
    selector: row => formatPrice(row.price),
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'مقدار پرداخت',
    selector: row => formatPrice(row.paid),
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'درصد آیریسک',
    selector: row => row.iryscPercent,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'نام دانش آموز',
    selector: row => row.student,
    grow: 2,
    fontSize: 10,
  },
];

export default adviceColumns;

export const teachColumns = [
  {
    name: 'عنوان',
    selector: row => row.title,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'تاریخ برگزاری کلاس',
    selector: row => row.startAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'تاریخ تسویه',
    selector: row => row.settledAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'مقدار تسویه',
    selector: row =>
      row.settledAmount === undefined ? '' : formatPrice(row.settledAmount),
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'هزینه تدریس',
    selector: row => formatPrice(row.price),
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'تعداد دانش آموز',
    selector: row => row.studentsCount,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'درصد آیریسک',
    selector: row => row.iryscPercent,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'مدت تدریس',
    selector: row => row.length,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'نحوه تدریس',
    selector: row => (row.teachMode === 'private' ? 'خصوصی' : 'نیمه خصوصی'),
    grow: 2,
    fontSize: 10,
  },
];
