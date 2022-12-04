import {routes} from '../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../API/Utility';
import {showError, showSuccess} from '../../../../services/Utility';
import commonTranslator from '../../../../translator/Common';

export const fetchContents = async token => {
  return await generalRequest(
    routes.fetchContents,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchSessions = async (token, id) => {
  return await generalRequest(
    routes.fetchSessionInContent + id,
    'get',
    undefined,
    'data',
    token,
  );
};

export const fetchContent = async (id, token = undefined) => {
  return await generalRequest(
    routes.fetchContent + id,
    'get',
    undefined,
    'data',
    token,
  );
};

let mandatoryFields = [
  'title',
  'description',
  'teacher',
  'price',
  'sessionsCount',
  'visibility',
];

let mandatoryFieldsSession = [
  'title',
  'description',
  'priority',
  'duration',
  'visibility',
];

export const store = async (token, data) => {
  try {
    let res = await generalRequest(
      routes.storeContent,
      'post',
      data,
      'data',
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess();

    return res;
  } catch (e) {
    showError(commonTranslator.pleaseFillAllFields);
    return null;
  }
};

export const addSession = async (token, data, contentId) => {
  try {
    let res = await generalRequest(
      routes.addSessionToContent + contentId,
      'post',
      data,
      'data',
      token,
      mandatoryFieldsSession,
    );
    if (res !== null) showSuccess();

    return res;
  } catch (e) {
    showError(commonTranslator.pleaseFillAllFields);
    return null;
  }
};

export const update = async (token, data, id) => {
  try {
    let res = await generalRequest(
      routes.updateContent + id,
      'put',
      data,
      'data',
      token,
      mandatoryFields,
    );
    if (res !== null) showSuccess();

    return res;
  } catch (e) {
    showError(commonTranslator.pleaseFillAllFields);
    return null;
  }
};

export const updateSession = async (token, data, contentId, sessionId) => {
  try {
    let res = await generalRequest(
      routes.updateSessionContent + contentId + '/' + sessionId,
      'put',
      data,
      'data',
      token,
      mandatoryFieldsSession,
    );
    if (res !== null) showSuccess();

    return res;
  } catch (e) {
    showError(commonTranslator.pleaseFillAllFields);
    return null;
  }
};

export const removeFile = async (token, contentId) => {
  let res = await generalRequest(
    routes.removeImgContent + contentId,
    'delete',
    undefined,
    undefined,
    token,
  );

  if (res !== null) showSuccess(commonTranslator.removeSuccessfully);
  return res;
};

export const addFile = async (token, fileContent, contentId) => {
  return await fetch(fileContent.content)
    .then(res => res.blob())
    .then(async blob => {
      let formData = new FormData();
      formData.append('file', blob, fileContent.name);

      let res = await fileRequest(
        routes.setImgContent + contentId,
        'put',
        formData,
        'url',
        token,
      );
      return res;
    });
};

export const setSessionFile = async (
  token,
  fileContent,
  contentId,
  sessionId,
  mode,
) => {
  return await fetch(fileContent.content)
    .then(res => res.blob())
    .then(async blob => {
      let formData = new FormData();
      formData.append('file', blob, fileContent.name);
      let base =
        mode === 'attach' ? routes.addٰAttachToSession : routes.setSessionVideo;

      let res = await fileRequest(
        base + contentId + '/' + sessionId,
        'put',
        formData,
        'url',
        token,
      );
      return res;
    });
};

export const removeSessionFile = async (token, contentId, sessionId, mode) => {
  let base =
    mode === 'img'
      ? routes.removeSessionImgContent
      : mode === 'attach'
      ? routes.removeAttachFromSession
      : routes.removeVideoFromSession;

  let res = await generalRequest(
    base + contentId + '/' + sessionId,
    'delete',
    undefined,
    undefined,
    token,
  );

  if (res !== null) showSuccess(commonTranslator.removeSuccessfully);
  return res;
};
