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
