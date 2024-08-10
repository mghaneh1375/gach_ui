import Translator from '../Schedule/components/Translator';

const columns = [
  {
    name: 'عنوان جلسه',
    selector: row => row.title,
    grow: 2,
    fontSize: 10,
  },
  {
    name: Translator.start,
    selector: row => row.start,
    grow: 2,
    fontSize: 10,
  },
  {
    name: Translator.createdAt,
    selector: row => row.request.createdAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: Translator.answerAt,
    selector: row => row.request.answerAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: Translator.expireAt,
    selector: row => row.request.expireAt,
    grow: 2,
    fontSize: 10,
  },
  {
    name: Translator.status,
    selector: row =>
      row.request.status === 'pending'
        ? Translator.pending
        : row.request.status === 'reject'
        ? Translator.reject
        : row.request.status === 'paid'
        ? Translator.paid
        : row.request.status === 'cancel'
        ? Translator.cancel
        : row.request.status === 'accept'
        ? Translator.accept
        : row.request.status === 'waitForCap'
        ? Translator.waitForCap
        : row.request.status === 'waitForPaySemiPrivate'
        ? Translator.waitForPaySemiPrivate
        : Translator.unknown,
    grow: 2,
    fontSize: 10,
  },
  {
    name: 'کاربر درخواست دهنده',
    selector: row => row.request.student.name,
    grow: 2,
    fontSize: 10,
  },
  {
    name: Translator.stdTeachRate,
    selector: row => row.request.student.teachRate,
    grow: 2,
    fontSize: 10,
  },
  {
    name: Translator.teachMode,
    selector: row =>
      row.teachMode === 'private' ? Translator.private : Translator.semiPrivate,
    grow: 1,
    size: 10,
  },
  {
    name: Translator.requestsCount,
    selector: row => row.requestCounts,
    grow: 1,
    fontSize: 10,
  },
  {
    name: 'ظرفیت جلسه (حداقل - حداکثر)',
    selector: row => row.minCap + ' - ' + row.maxCap,
    grow: 1,
    fontSize: 10,
  },
];

export default columns;
