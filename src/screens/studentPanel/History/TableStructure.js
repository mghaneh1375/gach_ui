import Translate from './Translate';

const columns = [
  {
    name: Translate.for,
    selector: row => row.for,
    grow: 3,
    center: true,
  },
  {
    name: Translate.date,
    selector: row => row.createdAt,
    grow: 2,
    center: true,
  },
  {
    name: Translate.price,
    selector: row => row.paid,
    grow: 1,
    center: true,
  },
  {
    name: Translate.account,
    selector: row => row.account,
    grow: 1,
    center: true,
  },
  {
    name: Translate.offAmount,
    selector: row => row.offAmount,
    grow: 1,
    center: true,
  },
  {
    name: Translate.refId,
    selector: row => row.refId,
    grow: 1,
    center: true,
  },
];
export default columns;
