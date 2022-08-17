import React from 'react';
import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';
import Agent from './Menus/Agent';
import SchoolMenu from './Menus/SchoolMenu';
import Teacher from './Menus/Teacher';
import {globalStateContext} from '../../../../App';
import Filter from './Filter';

const Menu = props => {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  if (props.accesses === null) return <></>;
  if (props.accesses.indexOf('student') !== -1)
    return (
      state.isRightMenuVisible && <StudentMenu navigate={props.navigate} />
    );
  if (props.accesses.indexOf('teacher') !== -1)
    return state.isRightMenuVisible && <Teacher navigate={props.navigate} />;
  if (props.accesses.indexOf('agent') !== -1)
    return state.isRightMenuVisible && <Agent navigate={props.navigate} />;
  if (props.accesses.indexOf('school') !== -1)
    return state.isRightMenuVisible && <SchoolMenu navigate={props.navigate} />;
  if (props.accesses.indexOf('admin') !== -1)
    return state.isRightMenuVisible && <AdminMenu navigate={props.navigate} />;

  return state.isFilterMenuVisible && <Filter />;
};

export default Menu;
