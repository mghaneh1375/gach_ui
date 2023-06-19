import translator from './Translator';

const columns = [
  {
    name: translator.title,
    selector: row => row.title,
    grow: 1,
  },
  {
    name: translator.price,
    selector: row => row.price,
    grow: 1,
  },
  {
    name: translator.maxVideoCalls,
    selector: row => row.videoCalls,
    grow: 1,
  },
  {
    name: translator.visibility,
    selector: row => (row.visibility ? 'نمایش' : 'عدم نمایش'),
    grow: 1,
  },
  {
    name: translator.maxKarbarg,
    selector: row => row.maxKarbarg,
    grow: 1,
  },
  {
    name: translator.maxExam,
    selector: row => row.maxExam,
    grow: 1,
  },
  {
    name: translator.maxChat,
    selector: row => row.maxChat,
    grow: 1,
  },
];

export default columns;
