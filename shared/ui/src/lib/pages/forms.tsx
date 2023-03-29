import { Button, Card, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import React, { useState } from 'react'
import Footer from '../component/footer'
import FormTable from '../component/table/formTable'

const Forms = () => {
  const { token: { colorBgContainer } } = theme.useToken();

  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };
  return (
    <div className='flex h-screen'>
      <Layout>
        <div className='flex flex-col w-full'>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className='flex flex-col' style={{ padding: 24, background: colorBgContainer }}>
            <Button type="default" className='mb-2 ' onClick={showModal}>
                Add
              </Button>
              <Card title='forms'>
                <FormTable/>
              </Card>
            </div>
          </Content>
          <Footer />
        </div>
      </Layout>
    </div>
  )
}

export default Forms