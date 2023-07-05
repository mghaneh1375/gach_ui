import {convertSecToMinWithOutSec} from '../../../../services/Utility';
import Translator from './Translator';

const columns = [
  {
    name: Translator.weekStartAt,
    selector: row => row.weekStartAt,
    grow: 1,
  },
  {
    name: Translator.schedulesSum,
    selector: row => convertSecToMinWithOutSec(row.schedulesSum * 60),
    grow: 1,
  },
  {
    name: Translator.doneSum,
    selector: row => convertSecToMinWithOutSec(row.doneSum * 60),
    grow: 1,
  },
  {
    name: Translator.advisors,
    selector: row => row.advisors,
    grow: 1,
  },
];

export default columns;
