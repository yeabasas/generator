import AppForm from '../../component/appForm'
import CreateComponents from '../createComponents'
import Attributes from '../../component/attributes'
import { Layout, Card, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
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