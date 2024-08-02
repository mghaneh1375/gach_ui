import commonTranslator from '../../../translator/Common';

const columns = [
  {name: 'کاربر', selector: row => row.student.name},
  {
    name: 'بخش',
    selector: row =>
      row.section === 'teach'
        ? commonTranslator.teach
        : row.section === 'advice'
        ? commonTranslator.advisor
        : row.section === 'content'
        ? commonTranslator.contents
        : commonTranslator.unknow,
    grow: 1,
  },
  {
    name: 'تاریخ ایجاد',
    selector: row => row.createdAt,
    grow: 2,
  },
  {
    name: 'ارجاع به',
    selector: row => row.createdAt,
    grow: 1,
  },
  {
    name: 'وضعیت',
    selector: row =>
      row.status === 'pending'
        ? commonTranslator.pending
        : row.status === 'accept'
        ? commonTranslator.accepted
        : row.status === 'reject'
        ? commonTranslator.rejected
        : commonTranslator.unknow,
    grow: 1,
  },
  {
    name: 'بهترین ها',
    selector: row => (row.isTop ? commonTranslator.yes : commonTranslator.no),
    grow: 1,
  },
  {
    name: 'تاریخ تایید/رد',
    selector: row => row.considerAt,
    grow: 2,
  },
  {
    name: 'نظر',
    selector: row =>
      row.comment.length > 100 ? row.comment.substr(0, 100) : row.comment,
    grow: 3,
  },
];

export default columns;
