import commonTranslator from '../../../../../../translator/Common';
import Translate from '../../../Translate';

export const typeGiftKeyVals = [
  {item: commonTranslator.coin, id: 'coin'},
  {item: commonTranslator.money, id: 'money'},
  {item: commonTranslator.offcode, id: 'offcode'},
  {item: 'آزاد', id: 'free'},
];
export const offCodeKeyVals = [
  {item: commonTranslator.all, id: 'all'},
  {item: Translate.gachQuiz, id: 'gach_exam'},
  {item: Translate.content, id: 'content'},
  {item: Translate.personalQuiz, id: 'bank_exam'},
  {item: Translate.library, id: 'book'},
  {item: Translate.class, id: 'classes'},
  {item: Translate.psychology, id: 'ravan_exam'},
  {item: Translate.counseling, id: 'counseling'},
];
export const typeOffCodeKeyVals = [
  {item: Translate.values, id: 'value'},
  {item: Translate.percent, id: 'percent'},
];
export const siteAppKeyVals = [
  {item: Translate.site, id: 'site'},
  {item: Translate.app, id: 'app'},
];
