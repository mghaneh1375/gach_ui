import {generalRequest} from '../../../../../API/Utility';

const IRYSCMandatoryFields = [
  'title',
  'startRegistry',
  'start',
  'price',
  'end',
  'launchMode',
  'showResultsAfterCorrection',
  'priority',
];

const SchoolMandatoryFields = [
  'title',
  'start',
  'end',
  'launchMode',
  'showResultsAfterCorrection',
  'database',
];

const HWMandatoryFields = [
  'title',
  'start',
  'end',
  'showResultsAfterCorrection',
  'answerType',
  'maxUploadSize',
];

const OpenMandatoryFields = ['title', 'price'];
const TashrihiMandatoryFields = [
  'title',
  'showResultsAfterCorrection',
  'priority',
];
const ContentMandatoryFields = ['title'];

export async function CallAPI(data, url, token, mode, kind = 'regular') {
  const mandatoryFields =
    kind === 'tashrihi'
      ? TashrihiMandatoryFields
      : mode === 'irysc'
      ? IRYSCMandatoryFields
      : mode === 'school'
      ? SchoolMandatoryFields
      : mode === 'hw'
      ? HWMandatoryFields
      : 'content'
      ? ContentMandatoryFields
      : OpenMandatoryFields;

  let result;
  try {
    result = await generalRequest(
      url,
      'post',
      data,
      'quiz',
      token,
      mandatoryFields,
    );
  } catch (err) {
    result = null;
  }
  return result;
}
