const columns = [
  {
    name: 'شماره سوال',
    selector: row => row.index,
    grow: 1,
    center: true,
  },
  {
    name: 'مبحث',
    selector: row => row.subject,
    grow: 3,
    center: true,
  },
  {
    name: 'تعداد گزینه',
    selector: row => row.choicesCount,
    grow: 1,
    center: true,
  },
];
export default columns;
