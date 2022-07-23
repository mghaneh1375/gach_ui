import translator from '../../Translator';
const columns = [
  {
    name: translator.qNo,
    selector: row => row.qNo,
    grow: 1,
  },
  {
    name: translator.subject,
    selector: row => row.subject.name,
    grow: 1,
  },
  {
    name: translator.lesson,
    selector: row => row.lesson.name,
    grow: 1,
  },
  {
    name: translator.grade,
    selector: row => row.grade.name,
    grow: 1,
  },
];

export default columns;
