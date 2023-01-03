const columns = [
  {
    name: 'عنوان',
    selector: row => row.title,
    grow: 3,
    center: true,
  },
  {
    name: 'تاریخ ایجاد',
    selector: row => row.createdAt,
    grow: 2,
    center: true,
  },
];
export default columns;
