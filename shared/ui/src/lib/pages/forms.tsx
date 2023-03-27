import { Button, Card, Layout, Menu, theme } from 'antd'
import { Content } from 'antd/es/layout/layout'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Footer from '../component/footer'
import FormSidebar from '../component/formSidebar'
import FormTable from '../component/table/formTable'
import { AuthContext } from '../config/AuthContex'
import { dbfire } from '../config/firebase'

const Forms = () => {
  const { currentUser } = useContext(AuthContext);
  const { token: { colorBgContainer } } = theme.useToken();
  const [formApp, setFormApp] = useState<[]>([]);
  const params = useParams()
  const pathId = params['appId']
  const colRef = collection(dbfire, 'form');

  useEffect(() => {
    const display = onSnapshot(colRef, (querySnapshot) => {
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