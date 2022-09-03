import {getWidthHeight} from '../../../../../../services/Utility';

let width = getWidthHeight()[0];
width -= 200;
let colWidth = width > 1200 || width < 768 ? '25%' : width * 0.5 - 30 - 3 * 90;

let numColsWidth = '90px';

if ((width > 1200 || width < 768) && colWidth > 200) {
  colWidth = width * 0.5 - 30 - 3 * 110;
  numColsWidth = '110px';
} else if ((width > 1200 || width < 768) && colWidth < 90) {
  colWidth = width * 0.5 - 30 - 3 * 70;
  numColsWidth = '70px';
}

const commonCols = [
  {
    name: 'میانگین درصد پاسخگویی',
    selector: row => row.avg,
    minWidth: numColsWidth,
    maxWidth: numColsWidth,
    center: true,
    style: {
      direction: 'ltr',
    },
  },
  {
    name: 'بیشترین درصد پاسخگویی',
    selector: row => row.max,
    minWidth: numColsWidth,
    maxWidth: numColsWidth,
    center: true,
    style: {
      direction: 'ltr',
    },
  },
  {
    name: 'کمترین درصد پاسخگویی',
    selector: row => row.min,
    minWidth: numColsWidth,
    maxWidth: numColsWidth,
    center: true,
    style: {
      direction: 'ltr',
      wordBreak: 'normal',
    },
  },
];

const columns = [
  {
    name: 'نام درس ',
    selector: row => row.name,
    minWidth: colWidth + 'px',
    maxWidth: colWidth + 'px',
    style: {wordBreak: 'normal'},
  },
  ...commonCols,
];

export default columns;
