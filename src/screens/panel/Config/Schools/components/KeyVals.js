import commonTranslator from '../../../../../translator/Common';

export const kindSchools = [
  {item: commonTranslator.sampad, id: 'sampad'},
  {item: commonTranslator.gheyr, id: 'gheyr'},
  {item: commonTranslator.nemone, id: 'nemone'},
  {item: commonTranslator.dolati, id: 'dolati'},
  {item: commonTranslator.sayer, id: 'sayer'},
];

export const kindSchoolsForFilter = [
  ...kindSchools,
  {item: commonTranslator.all, id: 'all'},
];

export const grades = [
  {item: commonTranslator.aval, id: 'motevaseteaval'},
  {item: commonTranslator.dovom, id: 'motevasetedovom'},
  {item: commonTranslator.dabestan, id: 'dabestan'},
];

export const gradesForFilter = [
  ...grades,
  {item: commonTranslator.all, id: 'all'},
];
