import React, { useContext, useEffect, useState } from 'react';
import { AppstoreOutlined, DashboardOutlined, MailOutlined, LogoutOutlined, } from '@ant-design/icons';
import { MenuProps, Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useCookies } from 'react-cookie';
import { routeName } from '../../constant';
import { AuthContext } from '../../config/AuthContex';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { dbfire } from '../../config/firebase';

const FormSidebar: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [cookie, removeCookie] = useCookies();
  const [form, setForm] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'form');
  const q = query(colRef, where('userId', '==', userId));
  useEffect(() => {
    const display = onSnapshot(colRef, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setForm(items);
    });
    return () => {
      display();
    };
  }, []);
  const SignOut = () => {
    removeCookie('docRef', { path: '/application' });
    removeCookie('formKey', { path: '/' });
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const { Sider } = Layout;

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Dashboard', '1', <DashboardOutlined />),
    // getItem('', '2', <DesktopOutlined />),

    getItem('Application', 'sub1', <MailOutlined />, [getItem('Form', '5')]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),

      getItem('Submenu', 'sub3', null, [
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
      ]),
    ]),
    getItem('Sign out', '3', <LogoutOutlined />),
  ];

  // const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [cookies] = useCookies()
  const key =cookies['docRef']
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      style={{ paddingTop: 20, width: 256 }}
      className="h-screen"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        <h1 className="text-xl flex justify-center text-white mb-2 mx-4 border-2 border-white border-b-white-500 border-t-0 border-l-0 border-r-0">
          Forms
        </h1>
        {form.map((forms: any, index) =>
          <Menu.Item key={index}>
            <Link to={`${routeName.CREATECOMPONENTS}/${forms.formKey}`}>
              <span>{forms.formName}</span>
            </Link>
          </Menu.Item>
        )}
      </Menu>
      {/* <Menu>
        <Menu.Item key="3" onClick={SignOut}>
          <LogoutOutlined />
          <span>Sign Out</span>
        </Menu.Item>
      </Menu> */}
    </Sider>
  );
};

export default FormSidebar;
