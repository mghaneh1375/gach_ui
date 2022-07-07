import {routes} from '../../../../../API/APIRoutes';
import {fileRequest, generalRequest} from '../../../../../API/Utility';

export const fetchDetail = async props => {
  props.setLoading(true);
  const res = await generalRequest(
    routes.fetchTicket + props.ticket.id,
    'get',
    undefined,
    'data',
    props.token,
  );

  props.setLoading(false);
  if (res !== null) props.updateTicket(res);
};

export const changeMode = (setMode, newMode) => {
  setMode(newMode);
};

export const addMsg = (ticketId, props, msg, files) => {
  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.setAnswerTicket + ticketId,
      'put',
      {answer: msg},
      undefined,
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) {
    }
  });
};

export const addFile = async (token, dataUrl, ticketId) => {
  return await fetch(dataUrl)
    .then(res => res.blob())
    .then(async blob => {
      let formData = new FormData();
      formData.append('file', blob);
      let res = await fileRequest(
        routes.addFileToTicket + ticketId,
        'put',
        formData,
        undefined,
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
