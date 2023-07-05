// import moment from 'jalali-moment';
// import React, {useEffect, useRef, useState} from 'react';

// import SockJsClient from 'react-stomp';

// import {
//   GetStudentsMessengerApi,
//   GetFilesOfChatApi,
//   GetMessagesOfChatApi,
//   GetMessengerTokenApi,
//   SendFileToMessenger,
//   GetMyAdvisorsMessengerApi,
// } from './components/MessangerApi';
// import MassengerContent from './components/MassengerContent';
// import SideBar from './components/SideBar';
// import {isUserAdvisor} from '../../../services/Utility';
// import {
//   CommonWebBox,
//   MyView,
//   PhoneView,
//   SimpleText,
// } from '../../../styles/Common';
// import {useEffectOnce} from 'usehooks-ts';
// import {chatContext, dispatchChatContext} from './components/Context';
// import {FontIcon} from '../../../styles/Common/FontIcon';
// import {faChevronLeft, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
// import vars from '../../../styles/root';
// import FooterInputWithFileUpload from './components/FooterInputWithFileUpload';

// function Chat(props) {
//   const useGlobalState = () => [
//     React.useContext(chatContext),
//     React.useContext(dispatchChatContext),
//   ];

//   const [state, dispatch] = useGlobalState();

//   const chatBox = useRef(null);

//   const [openSidePopUp, setOpenSidePopUp] = useState(null);
//   const [socketToken, setSocketToken] = useState(null);

//   const [scrollFromBottom, setScrollFromBottom] = useState(null);
//   const [heartTimer, setHeartTimer] = useState(1000);
//   const [sendHeart, setSendHeart] = useState(null);
//   const [updateScroll, setUpdateScroll] = useState(0);
//   const [removeText, setRemoveText] = useState(0);

//   const [allChats, setAllChats] = useState({});
//   const [showChats, setShowChats] = useState(null);
//   const [groups, setGroups] = useState([]);
//   const [chatIdSeleceted, setChatIdSeleceted] = useState(null);
//   const [groupSelected, setGroupSelected] = useState(null);
//   const [socketState, setSocketState] = useState(null);
//   const [socketChatState, setSocketChatState] = useState(null);

//   const [myTargets, setMyTargets] = useState();

//   const sendMessage = message => {
//     if (showChats && socketChatState && message.trim().length > 0) {
//       var chatMessage = {
//         chatId: showChats.chatId,
//         token: socketToken,
//         content: message,
//         type: 'send',
//       };
//       socketChatState.sendMessage('/app/chat', JSON.stringify(chatMessage));

//       setRemoveText(prev => prev + 1);
//     }
//   };

//   const sendFile = file => {
//     if (file && groupSelected.id) {
//       SendFileToMessenger(file.file, groupSelected.id, socketToken)
//         .then(res => {})
//         .catch(err => {});
//     }
//   };

//   const handleSendVoice = file => {
//     if (file && groupSelected.id) {
//       SendFileToMessenger(file, groupSelected.id, socketToken)
//         .then(res => {})
//         .catch(err => {});
//     }
//   };

//   const handleRecieveMessage = message => {
//     console.log(message);

//     let checkHasGet = allChats[message.chatId];

//     dispatch({sideBarRowIds: message.senderId});

//     if (message?.type === 'NOTIF') {
//       dispatch({
//         notReadMessageInfo: {
//           sideBarRowUpdateNotif: message.senderId,
//           notifCount: message.count,
//         },
//       });
//     }

//     if (checkHasGet) {
//       let newChat = {};
//       if (message?.chatMessage) {
//         newChat = message.chatMessage;
//       } else {
//         newChat = message;
//       }

//       let mom = moment(newChat.timestamp);

//       let file = {};
//       let isFile = newChat.file;

//       if (isFile) {
//         file = {
//           url: newChat.content,
//           name: newChat.originalFilename,
//         };
//       }

//       let newArrChat = {
//         amISender: newChat.senderId === props.user.user.id,
//         content: newChat.content,
//         createdAt: newChat.timestamp,
//         id: newChat.senderId,
//         sender: newChat.sender,
//         date: mom.format('jYYYY/jMM/jDD'),
//         time: mom.format('HH:mm'),
//         file,
//         isFile,
//       };

//       if (!checkHasGet) {
//         checkHasGet = {
//           chatId: newChat.chatId,
//           hasGet: false,
//           chats: [],
//         };
//       }

//       checkHasGet.chats.push(newArrChat);
//       setAllChats(prev => {
//         return {
//           ...prev,
//           [newChat.chatId]: {
//             ...checkHasGet,
//           },
//         };
//       });
//     }
//   };

//   const getMessages = async chat => {
//     let checkHasGet = allChats[chat.chatId];
//     if (!checkHasGet || checkHasGet?.hasGet === false) {
//       props.setLoading(true);
//       let res = await GetMessagesOfChatApi(chat.id, socketToken);
//       props.setLoading(false);

//       res.chats = reFormatChats(res.chats);
//       res = {
//         ...chat,
//         ...checkHasGet,
//         ...res,
//       };

//       console.log(res);
//       setShowChats(res);
//       setAllChats(prev => ({
//         ...prev,
//         [res.chatId]: {
//           ...res,
//           hasGet: true,
//           getFiles: false,
//           files: [],
//           students: [],
//         },
//       }));

//       setGroups(prev => {
//         return prev.map(item => {
//           if (item.id === chat.id) {
//             item.chatId = res.chatId;
//           }
//           return item;
//         });
//       });

//       setChatIdSeleceted(res.chatId);
//     } else {
//       setChatIdSeleceted(checkHasGet.chatId);
//       setShowChats(checkHasGet);
//     }
//   };

//   const reFormatChats = chats => {
//     return chats.map(item => {
//       let mom = moment(item.createdAt);

//       let file = {};
//       let isFile = item.file;
//       if (isFile) {
//         file = {
//           url: item.content,
//           name: item.originalFilename,
//         };
//       }

//       return {
//         ...item,
//         isFile,
//         file,
//         date: mom.format('jYYYY/jMM/jDD'),
//         time: mom.format('HH:mm'),
//       };
//     });
//   };

//   // const onScroll = () => {
//   //   let scrollTop = chatBox.current.scrollTop;

//   //   if (scrollTop <= 100 && groupSelected?.id) {
//   //     let chat = groups.find(group => group.id === groupSelected?.id);
//   //     let allChatsOne = allChats[chat.chatId];

//   //     if (!(allChatsOne.chats.length < allChatsOne.totalMsgs)) {
//   //       return;
//   //     }

//   //     let createdAt = allChatsOne.chats[0].createdAt;

//   //     // scroll position from bottom chatBox
//   //     let scrollHeight = chatBox.current.scrollHeight;
//   //     let clientHeight = chatBox.current.clientHeight;
//   //     let scrollPosition = scrollHeight - clientHeight - scrollTop;
//   //     setScrollFromBottom(scrollPosition);

//   //     GetMessagesOfChatApi(chat.mode, chat.id, socketToken, createdAt)
//   //       .then(res => {
//   //         res.chats = reFormatChats(res.chats);

//   //         setAllChats(prev => {
//   //           let newChats = [...res.chats, ...prev[res.chatId].chats];

//   //           setShowChats({
//   //             ...chat,
//   //             ...res,
//   //             chats: newChats,
//   //           });

//   //           return {
//   //             ...prev,
//   //             [res.chatId]: {
//   //               ...prev[res.chatId],
//   //               chats: [...newChats],
//   //             },
//   //           };
//   //         });
//   //       })
//   //       .catch(err => {});
//   //   }
//   // };

//   const handleUnselectGroup = () => {
//     setGroupSelected(null);
//     setChatIdSeleceted(null);
//     setShowChats(null);
//   };

//   const handleClickMenu = event => {
//     setOpenSidePopUp('menu');
//   };

//   const getMyTargets = async () => {
//     if (myTargets !== undefined) {
//       setMyTargets(allChats[chatIdSeleceted].targets);
//       return;
//     }
//     let res;
//     if (isUserAdvisor(props.user)) {
//       res = await GetStudentsMessengerApi(socketToken);
//     } else {
//       res = await GetMyAdvisorsMessengerApi(socketToken);
//     }

//     let targets = res.map((item, index) => {
//       return {
//         id: item.id,
//         mode: 'PEER',
//         name: item.name,
//         newMsgs: 0,
//         notReadMessage: 0,
//         order: index - res.length,
//         pic: item.targetPic,
//         receiverId: item.id,
//         receiverName: item.name,
//       };
//     });
//     setMyTargets(targets);
//     setAllChats(prev => {
//       return {
//         ...prev,
//         [chatIdSeleceted]: {
//           ...prev[chatIdSeleceted],
//           targets: targets,
//         },
//       };
//     });
//   };

//   const getNewToken = async () => {
//     let lastToken = localStorage.getItem('socketToken');
//     let lastExpireToken = localStorage.getItem('socketToken_expire');

//     if (
//       !lastToken ||
//       !lastExpireToken ||
//       (lastExpireToken && lastExpireToken < new Date().getTime())
//     ) {
//       props.setLoading(true);
//       let res = await GetMessengerTokenApi(props.token);
//       props.setLoading(false);

//       let time = new Date().getTime() + res.reminder - 20000;
//       localStorage.setItem('socketToken', res.token);
//       localStorage.setItem('socketToken_expire', time);
//       localStorage.setItem('socketToken_heartBeatTime', res.heartBeatInterval);

//       setHeartTimer(res.heartBeatInterval);
//       setSocketToken(res.token);
//     } else {
//       let heartBeatInterval = localStorage.getItem('socketToken_heartBeatTime');

//       setHeartTimer(heartBeatInterval);
//       setSocketToken(lastToken);
//     }
//   };

//   useEffectOnce(() => {
//     const destroyListener = createScrollStopListener(chatBox.current, () =>
//       setUpdateScroll(prev => prev + 1),
//     );
//     setInterval(getNewToken, 2000);

//     return () => destroyListener(); // when App component is unmounted
//   });

//   // React.useEffect(onScroll, [updateScroll]);

//   React.useEffect(() => {
//     if (sendHeart && socketState) {
//       var msg = {
//         token: socketToken,
//         type: 'heart',
//       };
//       if (showChats) {
//         msg.chatId = showChats.chatId;
//       }

//       socketState.sendMessage('/app/chat', JSON.stringify(msg));

//       setTimeout(() => {
//         setSendHeart(prev => prev + 1);
//       }, heartTimer);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [sendHeart]);

//   useEffect(() => {
//     setScrollFromBottom(0);
//     let chat = groups.find(group => group.id === groupSelected?.id);
//     if (chat) {
//       getMessages(chat);
//     } else if (groupSelected === null) {
//       handleUnselectGroup();
//     } else {
//       setMyTargets(prev => {
//         let student = myTargets.find(item => item.id === groupSelected);
//         let exist = prev.find(item => item.id === groupSelected);
//         if (exist) {
//           getMessages({
//             chatId: null,
//             id: student.id,
//             mode: 'PEER',
//             name: student.name,
//             newMsgs: 0,
//             notReadMessage: 0,
//             order: prev.length + 1,
//             pic: student.targetPic,
//             receiverId: student.id,
//             receiverName: student.name,
//           });
//         }
//         return [];
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [groupSelected]);

//   useEffect(() => {
//     if (chatBox) {
//       let scrollHeight = chatBox.current.scrollHeight;
//       let clientHeight = chatBox.current.clientHeight;
//       let scrollPosition = scrollHeight - clientHeight - scrollFromBottom;

//       chatBox.current.scrollTo(0, scrollPosition);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [showChats]);

//   useEffect(() => {
//     if (socketToken) {
//       getMyTargets();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [socketToken]);

//   return (
//     <MyView>
//       {socketToken && (
//         <SideBar
//           sideBarList={myTargets}
//           socketToken={socketToken}
//           selectedGroup={groupSelected}
//           changePerson={setGroupSelected}
//           updateGroups={setGroups}
//           setLoading={props.setLoading}
//         />
//       )}
//       <CommonWebBox width={'calc(100% - 300px)'} style={{marginRight: 280}}>
//         {socketToken && (
//           <>
//             <SockJsClient
//               url={`http://192.168.0.106:8088/ws`}
//               topics={[`/chat/${props.user.user.id}`]}
//               subscribeHeaders={{'self-subscribe': true, token: socketToken}}
//               debug={false}
//               autoReconnect={false}
//               // heartbeat={61000}
//               // heartbeatIncoming={61000}
//               // heartbeatOutgoing={61000}
//               onConnect={() => setSendHeart(1)}
//               onMessage={handleRecieveMessage}
//               ref={setSocketState}
//               onError={() => {
//                 console.log('onError');
//               }}
//               onDisconnect={() => {
//                 console.log('heyyyy disconnect');
//                 setSocketState(null);
//               }}
//             />
//             {showChats?.chatId && (
//               <SockJsClient
//                 url={`http://192.168.0.106:8088/ws`}
//                 topics={[`/chat/${showChats?.chatId}`]}
//                 subscribeHeaders={{'group-subscribe': true, token: socketToken}}
//                 debug={false}
//                 autoReconnect={false}
//                 onMessage={handleRecieveMessage}
//                 ref={setSocketChatState}
//                 onError={() => {
//                   console.log('onError');
//                 }}
//                 onDisconnect={err => {
//                   console.log(err, 'disconnect');
//                   setSocketChatState(null);
//                 }}
//               />
//             )}
//           </>
//         )}

//         {groupSelected && (
//           <div className="whiteBox headerMessSelect">
//             <SimpleText text={groupSelected.name} />

//             <PhoneView>
//               <FontIcon
//                 kind={'normal'}
//                 icon={faEllipsisV}
//                 onPress={handleClickMenu}
//               />

//               <FontIcon
//                 style={{borderRadius: '50%', height: '30px', width: '30px'}}
//                 kind={'normal'}
//                 icon={faChevronLeft}
//                 onPress={handleUnselectGroup}
//               />
//             </PhoneView>
//           </div>
//         )}

//         <div className="whiteBox mesMainMes pb-5" ref={chatBox}>
//           {showChats?.chats?.map((item, index) => {
//             // console.log(item);
//             return (
//               <MassengerContent
//                 key={`${item.id}__${index}`}
//                 msg={{
//                   name: !item.amISender && (item?.sender ?? ''),
//                   myMsg: item.amISender,
//                   msg: item.content,
//                   date: item.date,
//                   time: item.time,
//                   isFile: item.isFile,
//                   file: item.file,
//                   files: [],
//                 }}
//                 needPic={false}
//               />
//             );
//           })}
//         </div>

//         {showChats && (
//           <div className="whiteBox messengerFooter studentFooterMsgSection inMessenger">
//             <FooterInputWithFileUpload
//               text={''}
//               removeFileAfterOnChage={true}
//               showUploadFileText={false}
//               submitWithEnter={true}
//               inputLabel="بارگذاری فایل"
//               getFile={true}
//               userPic={props.user.user.pic}
//               removeText={removeText}
//               onSubmit={sendMessage}
//               onFileChange={sendFile}
//               showVoiceRecorder={true}
//               getVoice={handleSendVoice}
//             />
//           </div>
//         )}
//       </CommonWebBox>

//       {/* {openSidePopUp === 'menu' && (
//         <SidePopUp close={handleCloseMenu}>
//           <BasicSide>
//             <div className="actionButtons">
//               <Link to="#" onClick={showFileList}>
//                 فایل ها
//               </Link>
//             </div>
//           </BasicSide>
//         </SidePopUp>
//       )} */}
//       {/* {openSidePopUp === 'studentList' && (
//         <SidePopUp close={() => setOpenSidePopUp('menu')}>
//           <BasicSide>
//             <div>
//               {studentOfClass.map(item => (
//                 <div className="d-flex align-items-center justify-content-between p-3 color-white border-bottom">
//                   <div>{item.name}</div>
//                   <div className="font-12">
//                     <button
//                       className="redButton"
//                       onClick={() => {
//                         setOpenSidePopUp(null);
//                         startToChat(item.id);
//                       }}>
//                       ارسال پیام
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </BasicSide>
//         </SidePopUp>
//       )} */}
//       {/* {openSidePopUp === 'fileList' && (
//         <SidePopUp close={() => setOpenSidePopUp('menu')}>
//           <BasicSide whiteTitle={`فایل های ${groupSelected.name}`}>
//             <div className="fileListSide">
//               {allChats[chatIdSeleceted].files.map(item => (
//                 <a
//                   className="file"
//                   href={item.content}
//                   target="_blank"
//                   rel="noreferrer"
//                   download={item.originalFilename}>
//                   {getFileType(item.content) === 'img' ? (
//                     <img src={item.content} alt="img" />
//                   ) : (
//                     <div className="notImgFile">{item.originalFilename}</div>
//                   )}
//                 </a>
//               ))}
//             </div>
//           </BasicSide>
//         </SidePopUp>
//       )} */}
//     </MyView>
//   );
// }

// const createScrollStopListener = (element, callback, timeout) => {
//   let removed = false;
//   let handle = null;
//   const onScroll = () => {
//     if (handle) {
//       clearTimeout(handle);
//     }
//     handle = setTimeout(callback, timeout || 200); // default 200 ms
//   };
//   element.addEventListener('scroll', onScroll);
//   return () => {
//     if (removed) {
//       return;
//     }
//     removed = true;
//     if (handle) {
//       clearTimeout(handle);
//     }
//     element.removeEventListener('scroll', onScroll);
//   };
// };

// export default Chat;
