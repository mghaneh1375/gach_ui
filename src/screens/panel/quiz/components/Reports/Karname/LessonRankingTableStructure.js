import {getWidthHeight} from '../../../../../../services/Utility';

let width = getWidthHeight()[0];
let colWidth;
let numColsWidth = '90px';

if (width < 768) colWidth = 100;
else {
  width -= 200;
  colWidth = width > 1200 || width < 768 ? '25%' : width * 0.5 - 30 - 3 * 90;

  if ((width > 1200 || width < 768) && colWidth > 200) {
    colWidth = width * 0.5 - 30 - 3 * 110;
    numColsWidth = '110px';
  } else if ((width > 1200 || width < 768) && colWidth < 90) {
    colWidth = width * 0.5 - 30 - 3 * 70;
    numColsWidth = '70px';
  }
}

const commonCols = [
  {
    name: 'رتبه در مدرسه',
    selector: row => row.schoolRank,
    maxWidth: numColsWidth,
    minWidth: numColsWidth,
    center: true,
  },
  {
    name: 'رتبه در شهر',
    selector: row => row.cityRank,
    maxWidth: numColsWidth,
    minWidth: numColsWidth,
    center: true,
  },
  {
    name: 'رتبه در استان',
    selector: row => row.stateRank,
    maxWidth: numColsWidth,
    minWidth: numColsWidth,
    center: true,
  },
  {
    name: 'رتبه در کشور',
    selector: row => row.countryRank,
    maxWidth: numColsWidth,
    minWidth: numColsWidth,
    center: true,
  },
];

export const lessonRankingCols = [
  {
    name: 'نام درس',
    selector: row => row.name,
    maxWidth: colWidth,
    minWidth: colWidth,
    style: {wordBreak: 'normal'},
  },
  ...commonCols,
];
export const subjectRankingCols = [
  {
    name: 'نام مبحث',
    selector: row => row.name,
    maxWidth: colWidth,
    minWidth: colWidth,
    style: {wordBreak: 'normal'},
  },
  ...commonCols,
];

export const totalRankCols = [
  {
    name: 'تراز کل',
    selector: row => row.taraz,
    maxWidth: colWidth,
    minWidth: colWidth,
    style: {wordBreak: 'normal'},
    center: true,
  },
  ...commonCols,
];
