import translator from './translator';

const columns = [
  {
    name: translator.neededCoin,
    selector: row => row.neededCoin,
    grow: 2,
  },
  {
    name: translator.section,
    selector: row => row.section,
    grow: 2,
  },
  {
    name: translator.rewardAmount,
    selector: row => row.rewardAmount,
    grow: 2,
  },
  {
    name: translator.isPercent,
    selector: row =>
      row.section !== 'money' ? (row.isPercent ? 'درصدی' : 'مقداری') : '',
    grow: 2,
  },
];

export default columns;
