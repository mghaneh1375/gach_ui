import commonTranslator from '../../../translator/Common';

const columns = [
  {
    name: 'بخش',
    selector: row =>
      row.section === 'teach'
        ? commonTranslator.teach
        : row.section === 'advisor'
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
    name: 'در مورد',
    selector: row => row.ref,
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
    name: 'تاریخ تایید/رد',
    selector: row => row.considerAt,
    grow: 2,
  },
  {
    name: 'نظر',
    selector: row =>
      row.comment.length > 30 ? row.comment.substr(0, 30) + '...' : row.comment,
    grow: 3,
  },
];

export default columns;
