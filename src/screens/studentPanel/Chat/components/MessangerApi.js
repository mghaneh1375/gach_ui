import {generalRequest} from '../../../../API/Utility';

export const GetMessengerTokenApi = async token => {
  let res = await generalRequest(
    `${process.env.REACT_APP_SOCKET}/api/getToken`,
    'get',
    undefined,
    ['token', 'reminder', 'heartBeatInterval', 'validityDuration'],
    token,
  );

  return res;
};

export const GetChatsApi = async socketToken => {
  return await generalRequest(
    `${process.env.REACT_APP_SOCKET}/api/chats`,
    'get',
    undefined,
    'chats',
    socketToken,
  );
};

export const GetStudentsMessengerApi = async socketToken => {
  return generalRequest(
    `${process.env.REACT_APP_SOCKET}/api/getStudents`,
    'get',
    undefined,
    'data',
    socketToken,
  );
};

export const GetMessagesOfChatApi = async (id, socketToken, createdAt = -1) => {
  return await generalRequest(
    `${process.env.REACT_APP_SOCKET}/api/chat/${id}/${createdAt}`,
    'get',
    undefined,
    'data',
    socketToken,
  );
};

export const SendFileToMessenger = (file, userId, socketToken) => {
  //   return new Promise((resolve, reject) => {
  //     openLoading();
  //     var formData = new FormData();
  //     formData.append('file', file);
  //     Api({
  //       method: 'post',
  //       url: `/uploadFile/${userId}`,
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         Authorization: `Bearer ${socketToken}`,
  //       },
  //       data: formData,
  //     })
  //       .then(res => {
  //         closeLoading();
  //         let response = res.data;
  //         if (response.status === 'ok') {
  //           resolve(response.data);
  //         } else if (response.hasOwnProperty('msg')) {
  //           createNotification([{text: response.msg, type: 'error'}]);
  //           reject(response);
  //         } else {
  //           createNotification([{text: 'خطا در ارسال اطلاعات', type: 'error'}]);
  //           reject();
  //         }
  //       })
  //       .catch(err => {
  //         closeLoading();
  //         createNotification([{text: 'خطا در ارسال اطلاعات', type: 'error'}]);
  //         reject(err);
  //       });
  //   });
};

export const GetFilesOfChatApi = (chatId, socketToken) => {
  //   return new Promise((resolve, reject) => {
  //     openLoading();
  //     Api({
  //       method: 'get',
  //       headers: {
  //         Authorization: `Bearer ${socketToken}`,
  //       },
  //       url: `${process.env.REACT_APP_SOCKET}/api/getFiles/${chatId}`,
  //     })
  //       .then(res => {
  //         closeLoading();
  //         try {
  //           let response = res.data;
  //           if (response.status === 'ok') {
  //             resolve(response.chats);
  //           } else if (response.hasOwnProperty('msg')) {
  //             createNotification([{text: response.msg, type: 'error'}]);
  //             reject(response);
  //           } else {
  //             createNotification([
  //               {text: 'خطا در دریافت اطلاعات', type: 'error'},
  //             ]);
  //             reject();
  //           }
  //         } catch (err) {
  //           throw err;
  //         }
  //       })
  //       .catch(err => {
  //         closeLoading();
  //         createNotification([{text: 'خطا در دریافت اطلاعات', type: 'error'}]);
  //         reject(err);
  //       });
  //   });
};
