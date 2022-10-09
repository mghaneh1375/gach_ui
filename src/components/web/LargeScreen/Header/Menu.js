import React from 'react';
import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';
import Agent from './Menus/Agent';
import SchoolMenu from './Menus/SchoolMenu';
import Teacher from './Menus/Teacher';
import {globalStateContext} from '../../../../App';
import Filter from './Filter';
import {MyView} from '../../../../styles/Common';
import AdviserMenu from './Menus/AdviserMenu';
import {style} from './style';
import {isUserAdmin} from '../../../../services/Utility';

const Menu = props => {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <MyView style={{...style.width100}}>
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('student') !== -1 && (
          <StudentMenu navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('teacher') !== -1 && (
          <Teacher navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('agent') !== -1 && (
          <Agent navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('school') !== -1 && (
          <SchoolMenu navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('advisor') !== -1 && (
          <AdviserMenu navigate={props.navigate} />
        )}
      {state.isRightMenuVisible && isUserAdmin(state.user) && (
        <AdminMenu navigate={props.navigate} />
      )}
      {props.isFilterAvailable &&
        !state.isRightMenuVisible &&
        state.isFilterMenuVisible && <Filter />}
    </MyView>
  );
};

export default Menu;
