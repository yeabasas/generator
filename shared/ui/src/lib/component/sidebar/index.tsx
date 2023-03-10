import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import Button from '../../component/button';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { routeName } from '../../constant';
import { useCookies } from 'react-cookie'
const CustomForm = styled.form({
  width: '100%',
});

// const Sidebar = () => {
  const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [cookie,removeCookie] =useCookies()

  const {
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [btnDetails, setBtnDetails] = useState({
    loader: false,
    message: '',
  });
// const handleRemoveCookies=()=>{
  
// }
  const SignOut = () => {
    removeCookie('user',{path:'/'})
    signOut(auth)
      .then(() => {
        if (auth) {
          setBtnDetails({
            loader: false,
            message: 'LOGGED OUT',
          });
          setTimeout(() => {
            navigate(routeName.LOGIN);
          }, 1000);
        }
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
    }
  const { Header, Content, Sider } = Layout;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['4']}
          items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
            (icon, index) => ({
              key: String(index + 1),
              icon: React.createElement(icon),
              label: `nav ${index + 1}`,
            }),
          )}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>content</div>
        </Content>
      </Layout>
    </Layout>
  );
};
//   };
//   return (
//     <div className="h-screen flex flex-col justify-between border border-blue-100 p-6 w-1/5 shadow-2xl h-screen rounded m-1">
//       <div className="flex flex-col">
//       <h1 className="text-xl mb-4 border-2 border-gray border-b-white-500 border-t-0 border-l-0 border-r-0">
//         Design
//       </h1>
//         <Link className="hover:text-blue-600  my-2" to="/application">
//           Application
//         </Link>
//         <Link className="hover:text-blue-600 my-2 " to="/applicationForm">
//           form
//         </Link>
//       </div>
//       <div className='w-full'>
//         <CustomForm onSubmit={handleSubmit(SignOut)}>
//           <Button
//             onClick={SignOut}
//             name="Signout"
//             type="submit"
//             isLoading={btnDetails.loader}
//             message={btnDetails.message}
//           />
//         </CustomForm>
//       </div>
//     </div>
//   );
// };

export default Sidebar;
