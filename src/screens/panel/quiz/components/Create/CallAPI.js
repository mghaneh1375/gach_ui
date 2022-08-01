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

export async function CallAPI(data, url, token, setLoading, mode) {
  const mandatoryFields = mode === 'regular' ? IRYSCMandatoryFields : [];

  setLoading(true);
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
  } finally {
    setLoading(false);
  }
  return result;
}
