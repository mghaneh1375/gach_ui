import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateSideBarChatRows_Redux,
  updateSideBarChatRowsNOTIFY_Redux,
} from './../Action';
import {GetChatsApi} from './MessangerApi';

function SideBar(props) {
  const {sideBarRowIds, notReadMessageInfo} = useSelector(
    state => state.CommonReducer,
  );
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [showUser, setShowUser] = useState(null);

  const [userListToShow, setUserListToShow] = useState([]);

  const getUsers = async props => {
    props.setLoading(true);
    let res = await GetChatsApi(props.socketToken);
    props.setLoading(false);
    res
      .sort((a, b) => b.newMsgs - a.newMsgs)
      .map((item, index) => {
        let name = item.receiverName;

        return {
          ...item,
          id: item.receiverId,
          name,
          notReadMessage: item.newMsgs,
          order: -(res.length - index),
        };
      });

    props.updateGroups(res);
    setUserListToShow(res);
    setUsers(res);
  };

  const changePerson = id => {
    setShowUser(id);
    setUserSearch('');
    setUsers(prev => {
      let updated = prev.map(item => {
        if (item.id === id) {
          item.notReadMessage = 0;
          props.changePerson(item);
        }
        return {...item};
      });

      setUserListToShow([...updated]);
      return [...updated];
    });
  };

  const backToMainList = () => {
    props.changePerson(null);
  };

  useEffect(() => {
    if (sideBarRowIds) {
      let minOrder = 0;
      users.forEach(item => {
        minOrder = Math.min(minOrder, item.order);
      });
      minOrder -= 2;

      let newUsers = users.map(item => {
        if (item.id === sideBarRowIds) {
          item.order = minOrder;
        }

        if (showUser === item.id) {
          item.notReadMessage = 0;
        }

        return {...item};
      });

      setUserListToShow(newUsers);
      setUsers(newUsers);
      dispatch(updateSideBarChatRows_Redux(null));
    }
  }, [sideBarRowIds]);

  useEffect(() => {
    changePerson(props.selectedGroup);
  }, [props.selectedGroup]);

  useEffect(getUsers, []);

  useEffect(() => {
    if (notReadMessageInfo?.sideBarRowUpdateNotif) {
      let newUsers = users.map(item => {
        if (item.id === notReadMessageInfo?.sideBarRowUpdateNotif) {
          item.notReadMessage = notReadMessageInfo?.notifCount;
        }

        return {...item};
      });

      setUserListToShow(newUsers);
      setUsers(newUsers);

      dispatch(updateSideBarChatRowsNOTIFY_Redux(null, 0));
    }
  }, [notReadMessageInfo]);

  useEffect(() => {
    if (props.sideBarList.length > 0) {
      setUserListToShow(props.sideBarList);
    } else {
      setUserListToShow(users);
    }
  }, [props.sideBarList]);

  return (
    <div
      className={`mesenger_userList ${
        props.selectedGroup !== null && 'notOpen'
      }`}>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        {props.sideBarList.length > 0 && (
          <div
            className="mesUserSide font-weight-bold d-flex justify-content-center cursorPointer"
            style={{order: -99998}}
            onClick={backToMainList}>
            بازگشت به لیست کاربران
          </div>
        )}
        {userListToShow.map(item => (
          <div
            key={item.id}
            className={`mesUserSide ${
              props.selectedGroup?.id === item.id ? 'selected' : ''
            }`}
            onClick={() => changePerson(item.id)}
            style={{order: item.order}}>
            <div className="img">
              <img src={item.pic} />
            </div>
            <div className="nameBox">
              <div className="name singleRow">{item.name}</div>
              <div className="mesLastMes singleRow">{item.lastMessage}</div>
            </div>
            {item.notReadMessage > 0 && (
              <div className="mesNotRead">{item.notReadMessage}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

SideBar.defaultProps = {
  sideBarList: [],
  socketToken: null,
  selectedGroup: null,
  changePerson: id => {},
  updateGroups: groups => {},
};

export default SideBar;
