import StudentMenu from './Menus/Student';
import AdminMenu from './Menus/Admin';
import Agent from './Menus/Agent';
import SchoolMenu from './Menus/SchoolMenu';
import Teacher from './Menus/Teacher';

const Menu = props => {
  if (props.accesses === null) return <></>;
  if (props.accesses.indexOf('student') !== -1)
    return <StudentMenu navigate={props.navigate} />;
  if (props.accesses.indexOf('teacher') !== -1)
    return <Teacher navigate={props.navigate} />;
  if (props.accesses.indexOf('agent') !== -1)
    return <Agent navigate={props.navigate} />;
  if (props.accesses.indexOf('school') !== -1)
    return <SchoolMenu navigate={props.navigate} />;
  if (props.accesses.indexOf('admin') !== -1)
    return <AdminMenu navigate={props.navigate} />;
};

export default Menu;
