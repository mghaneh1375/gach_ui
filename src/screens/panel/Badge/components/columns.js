import {translator} from '../translate';

const columns = [
  {
    name: 'عنوان',
    selector: row => row.name,
    grow: 2,
    fontSize: 10,
  },
  {
    name: translator.createdAt,
    selector: row => row.createdAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: translator.userCount,
    selector: row => row.userCount,
    grow: 2,
    fontSize: 10,
  },
  {
    name: translator.priority,
    selector: row => row.priority,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'شروط',
    selector: row =>
      row.actions.map(e => {
        return e.actionFa + ': ' + e.count + ' - ';
      }),
    grow: 2,
    fontSize: 10,
  },
];

export default columns;
