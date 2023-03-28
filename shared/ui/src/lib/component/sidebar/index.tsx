import React, { useContext, useState } from 'react';
import { AppstoreOutlined, DashboardOutlined, MailOutlined, LogoutOutlined } from '@ant-design/icons';
import { MenuProps, Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useCookies } from 'react-cookie'
import { routeName } from '../../constant';
import { AuthContext } from '../../config/AuthContex';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [cookie, removeCookie] = useCookies()

  const SignOut = () => {
    removeCookie('docRef', { path: '/application' })
    removeCookie('formKey', { path: '/' })
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const { Sider } = Layout;


  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
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

    getItem('Application', 'sub1', <AppstoreOutlined />, [
      getItem('Form', '5')
    ]),

    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),

      getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
    getItem('Sign out', '3', <LogoutOutlined />),
  ];

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const {currentUser} = useContext(AuthContext)
  const key = currentUser?.uid
  return (
    <Sider 
      style={{ paddingTop: 20, width: 256}}
      className='h-screen'
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      onCollapse={toggleCollapsed}
      collapsedWidth="0">
      <Menu
        mode="inline"
        theme="dark"
        // items={items}
      >
        <Menu.Item key='1'>
          <DashboardOutlined />
          <span>Dashboard</span>
          <Link to={routeName.LANDING} />
        </Menu.Item>
        <Menu.Item key='2'>
          <AppstoreOutlined />
          <span>Application</span>
          <Link to={`${routeName.APPLICATION}/${useContext(AuthContext).currentUser?.uid}`} />
        </Menu.Item>
        {/* <Menu.Item key='3'>
          <AppstoreOutlined />
          <span>Form att</span>
          <Link to={`${routeName.CREATECOMPONENTS}/${key}`}></Link>
        </Menu.Item>
        <Menu.Item key='4'>
          <AppstoreOutlined />
          <span>Application Form</span>
          <Link to={`${routeName.APPLICATIONFORM}/${key}`} />
        </Menu.Item>
        <Menu.Item key='7'>
          <AppstoreOutlined />
          <span>appList</span>
          <Link to={`${routeName.APPLIST}/${key}`} />
        </Menu.Item> */}
      </Menu>
      <Menu className='mt-auto'>
        <Menu.Item key='5' onClick={SignOut}>
          <LogoutOutlined />
          <span>Sign Out</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;