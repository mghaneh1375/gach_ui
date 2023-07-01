import Translator from './Translator';

const columns = [
  {
    name: Translator.weakStartAt,
    selector: row => row.weakStartAt,
    grow: 1,
  },
  {
    name: Translator.schedulesSum,
    selector: row => row.schedulesSum,
    grow: 1,
  },
  {
    name: Translator.doneSum,
    selector: row => row.doneSum,
    grow: 1,
  },
  {
    name: Translator.advisors,
    selector: row => row.advisors,
    grow: 1,
  },
];

export default columns;
