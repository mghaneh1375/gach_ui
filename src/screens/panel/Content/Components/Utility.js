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
