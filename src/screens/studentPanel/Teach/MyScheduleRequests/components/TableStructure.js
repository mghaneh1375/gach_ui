import Translator from '../../../../advisorPanel/Teach/Schedule/components/Translator';

const columns = [
  {
    name: Translator.teacher,
    selector: row => row.teacher,
    grow: 2,
    center: true,
  },
  {
    name: Translator.start,
    selector: row => row.startAt,
    grow: 2,
    center: true,
  },
  {
    name: Translator.duration,
    selector: row => row.length,
    grow: 2,
    center: true,
  },
  {
    name: Translator.teachMode,
    selector: row =>
      row.teachMode === 'private' ? Translator.private : Translator.semiPrivate,
    grow: 2,
    center: true,
  },
  {
    name: Translator.createdAt,
    selector: row => row.createdAt,
    grow: 2,
    center: true,
  },
  {
    name: Translator.answerAt,
    selector: row => row.answerAt,
    grow: 2,
    center: true,
  },
  {
    name: Translator.expireAt,
    selector: row => row.expireAt,
    grow: 2,
    center: true,
  },
  {
    name: Translator.status,
    selector: row =>
      row.status === 'pending'
        ? Translator.pending
        : row.status === 'reject'
        ? Translator.reject
        : row.status === 'paid'
        ? Translator.paid
        : row.status === 'cancel'
        ? Translator.cancel
        : row.status === 'accept'
        ? Translator.accept
        : Translator.unknown,
    grow: 2,
    center: true,
  },
];

export default columns;
