import AppForm from '../../component/appForm'
import { Layout, theme } from 'antd'
import Sidebar from '../../component/sidebar'
const ApplicationForm = () => {
  const { Content } = Layout;
  const { token: { colorBgContainer }, } = theme.useToken();
  
  return (
    <div className='flex'>
      <Layout>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
                  <AppForm />
            </div>
          </Content>
        </div>
      </Layout>
    </div>
  )
}

export default ApplicationForm