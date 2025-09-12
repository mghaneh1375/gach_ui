import {routes} from '@/api/apiRoutes';
import {fileRequest, generalRequest} from '@/api/utility';
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
  const res = await generalRequest(
    routes.setAnswerTicket + ticketId,
    'put',
    {
      answer: msg,
    },
    'ticket',
    token,
  );
  return res;
};
export const addFile = async (token, fileContent, ticketId) => {
  return await fetch(fileContent.content)
    .then(res => res.blob())
    .then(async blob => {
      const formData = new FormData();
      formData.append('file', blob, fileContent.name);
      const res = await fileRequest(
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
  const res = await generalRequest(
    routes.submitTicket,
    'post',
    data,
    'ticket',
    token,
  );
  return res;
};
export const finalize = async (ticketId, token) => {
  const res = await generalRequest(
    routes.sendTicket + ticketId,
    'post',
    undefined,
    'ticket',
    token,
  );
  return res;
};
