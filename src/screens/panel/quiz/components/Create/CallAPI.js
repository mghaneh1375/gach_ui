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

const OnlineStandingMandatoryFields = [
  'title',
  'startRegistry',
  'start',
  'price',
  'end',
  'endRegistry',
  'maxTeams',
  'perTeam',
  'priority',
];

const EscapeQuizMandatoryFields = [
  'title',
  'startRegistry',
  'start',
  'price',
  'end',
  'endRegistry',
  'capacity',
  'priority',
  'topStudentsCount',
  'maxTry',
  'shouldComplete',
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
      : mode === 'onlineStanding'
      ? OnlineStandingMandatoryFields
      : mode === 'school'
      ? SchoolMandatoryFields
      : mode === 'escape'
      ? EscapeQuizMandatoryFields
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
