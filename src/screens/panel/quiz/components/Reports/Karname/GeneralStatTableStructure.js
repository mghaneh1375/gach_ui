const commonCols = [
  {
    name: 'میانگین درصد پاسخگویی',
    selector: row => row.avg,
    minWidth: '70px',
    maxWidth: '70px',
    center: true,
    style: {
      direction: 'ltr',
    },
  },
  {
    name: 'بیشترین درصد پاسخگویی',
    selector: row => row.max,
    minWidth: '70px',
    maxWidth: '70px',
    center: true,
    style: {
      direction: 'ltr',
    },
  },
  {
    name: 'کمترین درصد پاسخگویی',
    selector: row => row.min,
    minWidth: '70px',
    maxWidth: '70px',
    center: true,
    style: {
      direction: 'ltr',
    },
  },
];

const columns = [
  {
    name: 'نام درس ',
    selector: row => row.name,
    minWidth: '80px',
    maxWidth: '80px',
  },
  ...commonCols,
];

export default columns;
