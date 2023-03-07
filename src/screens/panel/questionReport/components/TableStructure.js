const columns = [
  {
    name: 'عنوان',
    selector: row => row.label,
    grow: 2,
    center: true,
  },
  {
    name: 'اولویت',
    selector: row => row.priority,
    grow: 2,
    center: true,
  },
];

export default columns;
