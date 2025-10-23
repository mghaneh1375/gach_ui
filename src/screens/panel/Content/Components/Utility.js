import {routes} from '@/api/apiRoutes';
import {
  generalRequest,
  videoFileRequest,
  videoGeneralRequest,
} from '@/api/utility';
import {showError, showSuccess} from '@/services/utility';
import commonTranslator from '@/translator/common';
export const fetchContents = async (token, filter) => {
  const params = new URLSearchParams();
  filter.teacher &&
    filter.teacher !== 'all' &&
    params.append('teacher', filter.teacher);
  filter.tag && filter.tag !== 'all' && params.append('tag', filter.tag);
  filter.name && filter.name !== 'all' && params.append('title', filter.name);
  filter.visibility &&
    filter.visibility !== 'all' &&
    params.append('visibility', filter.visibility === 'true');
  filter.level &&
    filter.level !== 'all' &&
    params.append('level', filter.level);
  return await generalRequest(
    routes.fetchContents + '?' + params.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};
export const fetchSessions = async (token, id) => {
  return await videoGeneralRequest(
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
const mandatoryFields = [
  'title',
  'description',
  'teacher',
  'price',
  'sessionsCount',
  'visibility',
  'duration',
  'slug',
  'priority',
];
const mandatoryFieldsSession = ['title', 'priority', 'duration', 'visibility'];
export const store = async (token, data) => {
  try {
    const res = await videoGeneralRequest(
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
    const res = await videoGeneralRequest(
      routes.addSessionToContent + contentId,
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
export const copySession = async (
  token,
  contentId,
  copyContentId,
  copySessionId,
) => {
  const res = await videoGeneralRequest(
    routes.copySessionInContent + contentId,
    'put',
    {
      contentId: copyContentId,
      sessionId: copySessionId,
    },
    'data',
    token,
  );
  if (res !== null) showSuccess();
  return res;
};
export const update = async (token, data, id) => {
  try {
    const res = await videoGeneralRequest(
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
    const res = await videoGeneralRequest(
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
  const res = await videoGeneralRequest(
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
      const formData = new FormData();
      formData.append('file', blob, fileContent.name);
      const res = await videoFileRequest(
        routes.setImgContent + contentId,
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
  title,
  contentId,
  sessionId,
) => {
  return await fetch(fileContent.content)
    .then(res => res.blob())
    .then(async blob => {
      const formData = new FormData();
      formData.append('file', blob, fileContent.name);
      formData.append('title', title);
      const res = await videoFileRequest(
        routes.addٰAttachToSession + contentId + '/' + sessionId,
        formData,
        'link',
        token,
      );
      return res;
    });
};
export const removeSessionFile = async (
  token,
  contentId,
  sessionId,
  mode,
  filename = undefined,
) => {
  const base =
    mode === 'img'
      ? routes.removeSessionImgContent
      : mode === 'attach'
      ? routes.removeAttachFromSession
      : routes.removeVideoFromSession;
  const res = await videoGeneralRequest(
    filename == undefined
      ? base + contentId + '/' + sessionId
      : base + contentId + '/' + sessionId + '/' + filename,
    'delete',
    undefined,
    undefined,
    token,
  );
  if (res !== null) showSuccess(commonTranslator.removeSuccessfully);
  return res;
};
