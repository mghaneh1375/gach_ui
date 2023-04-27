import React from 'react';
import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';
import Agent from './Menus/Agent';
import SchoolMenu from './Menus/SchoolMenu';
import Teacher from './Menus/Teacher';
import {globalStateContext} from '../../../../App';
import Filter from './Filter';
import {MyView} from '../../../../styles/Common';
import {style} from './style';
import {isUserAdmin} from '../../../../services/Utility';
import AdvisorMenu from './Menus/AdvisorMenu';

const Menu = props => {
  const useGlobalState = () => [React.useContext(globalStateContext)];
  const [state] = useGlobalState();

  return (
    <MyView style={{...style.width100}}>
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('student') !== -1 && (
          <StudentMenu selected={props.selected} navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('teacher') !== -1 && (
          <Teacher selected={props.selected} navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('agent') !== -1 && (
          <Agent selected={props.selected} navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('school') !== -1 && (
          <SchoolMenu selected={props.selected} navigate={props.navigate} />
        )}
      {state.isRightMenuVisible &&
        props.accesses !== null &&
        props.accesses.indexOf('advisor') !== -1 && (
          <AdvisorMenu selected={props.selected} navigate={props.navigate} />
        )}
      {state.isRightMenuVisible && isUserAdmin(state.user) && (
        <AdminMenu selected={props.selected} navigate={props.navigate} />
      )}
      {props.isFilterAvailable &&
        !state.isRightMenuVisible &&
        state.isFilterMenuVisible && <Filter />}
    </MyView>
  );
};

export default Menu;
