const columns = [
  {
    name: 'نام درس ',
    selector: row => row.name,
    grow: 4,
  },
  {
    name: 'میانگین درصد پاسخگویی',
    selector: row => row.avg,
    grow: 1,
  },
  {
    name: 'بیشترین درصد پاسخگویی',
    selector: row => row.max,
    grow: 1,
  },
  {
    name: 'کمترین درصد پاسخگویی',
    selector: row => row.min,
    grow: 1,
  },
];

export default columns;
