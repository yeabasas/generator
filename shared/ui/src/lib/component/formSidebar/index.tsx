import React, { createElement, useContext, useEffect, useState } from 'react';
import {
  AppstoreOutlined,
  DashboardOutlined,
  MailOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { MenuProps, Layout, Menu } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useCookies } from 'react-cookie';
import { routeName } from '../../constant';
import { AuthContext } from '../../config/AuthContex';
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getFirestore,
} from 'firebase/firestore';
import { dbfire } from '../../config/firebase';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
const FormSidebar: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [formApp, setFormApp] = useState<[]>([]);
  const params = useParams();
  const appId = params['appId'];
  const colRef = collection(dbfire, 'form');
  const { currentUser } = useContext(AuthContext);
  const q = query(colRef, where('appId', '==', appId));

  const [imgUrl, setImgUrl] = useState('');
  const storage = getStorage();
getDownloadURL(ref(storage,`images/${currentUser?.uid}/${appId}/logo`))
.then((url)=>setImgUrl(url))

  useEffect(() => {
    const display = onSnapshot(q, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFormApp(items);
    });
    return () => {
      display();
    };
  }, []);

  const SignOut = () => {
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

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      style={{ paddingTop: 20, width: 256 }}
      className="h-screen"
      breakpoint="lg"
      collapsedWidth="0"
      onCollapse={toggleCollapsed}
    >
      <Menu mode="inline" theme="dark" inlineCollapsed={collapsed}>
        <img className='h-8 w-full' src={imgUrl}></img>
        <h1 className="text-xl flex justify-left text-gray mb-2 pb-2 mx-4 border border-blue-700 border-b-blue-900 border-t-0 border-l-0 border-r-0">
        Forms
        </h1>
        
        {formApp.map((i: any, index) => (
          <Menu.Item key={index}>
          <Link
            to={`/application/${currentUser?.uid}/forms/${i.appId}/attribute/${i.id}`}
          >
              <span>{i.formName}</span>
          </Link>
            </Menu.Item>
        ))}
      </Menu>
      <Menu theme='dark'>
        {/* <Menu.Item key="3" onClick={SignOut}>
          <LogoutOutlined />
          <span>Sign Out</span>
        </Menu.Item> */}
        <Link className=' fixed bottom-0' to={'/landing'}>
          <Menu.Item key="3">
            <span className='font-bold '>Back to home</span>
          </Menu.Item>
        </Link>
      </Menu>
    </Sider>
  );
};

export default FormSidebar;
