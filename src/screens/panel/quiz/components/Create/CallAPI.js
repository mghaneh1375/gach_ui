import {generalRequest, showError} from '../../../../../API/Utility';

import commonTranslator from '../../../../../tranlates/Common';

const IRYSCMandatoryFields = [
  'startRegistry',
  'start',
  'price',
  'end',
  'isOnline',
  'showResultsAfterCorrection',
];

export async function CallAPI(data, url, token, setLoading, mode) {
  console.log('sa');
  const mandatoryFields = mode === 'regular' ? IRYSCMandatoryFields : [];
  console.log(data);
  for (let i = 0; i < mandatoryFields.length; i++) {
    const element = mandatoryFields[i];
    if (data[element] === undefined || data[element].length === 0) {
      console.log(element);
      console.log(data[element]);
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }
  }

  let newData = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value.length === 0) continue;
    newData[key] = value;
  }

  console.log(newData);
  setLoading(true);
  let result = await generalRequest(url, 'post', newData, 'id', token);
  setLoading(true);
  return result;
}
