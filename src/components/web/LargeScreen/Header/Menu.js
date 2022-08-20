import React from 'react';
import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';
import Agent from './Menus/Agent';
import SchoolMenu from './Menus/SchoolMenu';
import Teacher from './Menus/Teacher';
import {globalStateContext} from '../../../../App';
import Filter from './Filter';
import {MyView} from 'react-native-multi-selectbox';

const Menu = props => {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <MyView>
      {state.isRightMenuVisible && props.accesses.indexOf('student') !== -1 && (
        <StudentMenu navigate={props.navigate} />
      )}
      {state.isRightMenuVisible && props.accesses.indexOf('teacher') !== -1 && (
        <Teacher navigate={props.navigate} />
      )}
      {state.isRightMenuVisible && props.accesses.indexOf('agent') !== -1 && (
        <Agent navigate={props.navigate} />
      )}
      {state.isRightMenuVisible && props.accesses.indexOf('school') !== -1 && (
        <SchoolMenu navigate={props.navigate} />
      )}
      {state.isRightMenuVisible &&
        (props.accesses.indexOf('admin') !== -1 ||
          props.accesses.indexOf('superadmin') !== -1) && (
          <AdminMenu navigate={props.navigate} />
        )}
      {state.isFilterMenuVisible && <Filter />}
    </MyView>
  );
};

export default Menu;
