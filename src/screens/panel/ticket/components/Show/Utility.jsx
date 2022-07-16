import {routes} from '../../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../../API/Utility';

export const fetchDetail = async (ticketId, token) => {
  const res = await generalRequest(
    routes.fetchTicket + ticketId,
    'get',
    undefined,
    'data',
    token,
  );

  return res;
};

export const changeMode = (setMode, newMode) => {
  setMode(newMode);
};

export const addMsg = async (ticketId, token, msg) => {
  let res = await generalRequest(
    routes.setAnswerTicket + ticketId,
    'put',
    {answer: msg},
    'ticket',
    token,
  );

  return res;
};

export const addFile = async (token, fileContent, ticketId) => {
  return await fetch(fileContent.content)
    .then(res => res.blob())
    .then(async blob => {
      let formData = new FormData();
      formData.append('file', blob, fileContent.name);

      let res = await fileRequest(
        routes.addFileToTicket + ticketId,
        'put',
        formData,
        'filename',
        token,
      );
      return res;
    });
};

export const sendMsg = (props, ticketId) => {
  Promise.all([
    generalRequest(
      routes.sendTicket + ticketId,
      'post',
      undefined,
      undefined,
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) {
    }
  });
};

export const submit = async (data, token) => {
  let res = await generalRequest(
    routes.submitTicket,
    'post',
    data,
    'ticket',
    token,
  );
  return res;
};

export const finalize = async (ticketId, token) => {
  let res = await generalRequest(
    routes.sendTicket + ticketId,
    'post',
    undefined,
    'ticket',
    token,
  );
  return res;
};
