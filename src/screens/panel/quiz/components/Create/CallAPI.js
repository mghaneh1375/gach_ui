import {generalRequest} from '../../../../../API/Utility';

const IRYSCMandatoryFields = [
  'title',
  'startRegistry',
  'start',
  'price',
  'end',
  'launchMode',
  'showResultsAfterCorrection',
];

const OpenMandatoryFields = ['title', 'price'];

export async function CallAPI(data, url, token, mode) {
  const mandatoryFields =
    mode === 'irysc' ? IRYSCMandatoryFields : OpenMandatoryFields;

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
