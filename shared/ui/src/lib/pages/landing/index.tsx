import Sidebar from '../../component/sidebar'
import styled from '@emotion/styled';
import { Layout, Table, theme } from 'antd';
import Footer from '../../component/footer';
import { useState } from 'react';

const Landing = () => {
  const items: any[] | (() => any[]) = []
  const [data,setData]=useState<any[]>(items)
    const { Content } = Layout;
    const {
      token: { colorBgContainer },
    } = theme.useToken();
    const dataSource = [
      {data['items'].map((item,index)=>{
        return(
          [
            key:{}
          ]
        )
      })}
    ]

    const columns = [
      {
        title: 'AppName',
        dataIndex: 'AppName',
        key: 'appName',
      },
      {
        title: 'Description',
        dataIndex: 'Description',
        key: 'description',
      }
    ]
  return (
    <div className='flex'>
      <Layout>
        <Sidebar/>
        <div className='flex flex-col w-full'>
          <Content style={{ margin: '24px 16px 0' }}>
            <div className='flex' style={{ padding: 24, background: colorBgContainer }}>
              <h1 className='mx-auto font-bold text-2xl'>Created Apps</h1>
            </div>
            <div style={{ padding: 24,paddingTop: 0, minHeight: 360, background: colorBgContainer }}>
              <Table columns={columns} dataSource={dataSource}/>
            </div>
          </Content>
          <Footer/>
        </div>
        </Layout>
    </div>
  )
}

export default Landing