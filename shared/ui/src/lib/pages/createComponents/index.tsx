import { Card, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import FormSidebar from '../../component/formSidebar'
import { AuthContext } from '../../config/AuthContex';
import { dbfire } from '../../config/firebase';

const CreateComponents = () => {
  const [form, setForm] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const [cookie, setCookie] = useCookies()
  const key = cookie['docRef']
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const userId = currentUser?.uid;
  const colRef = collection(dbfire, 'form');
  const q = query(colRef, where('appRef', '==', key));
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
  return (
    <div className='flex'>
      <Layout>
        <FormSidebar />
        <div className="flex flex-col w-full">
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
                {form.map((i: any, index) => (
              <Card title={i.formName} className="w-2/3" bordered={false}>
                  <div key={index}>
                    <p>{i.formName}</p>
                    {i.attribute.map((c: any, v: React.Key | null | undefined) => (
                      <div key={v} className='mb-6'>
                        <p className='bg-blue-400'>input label = {c['inputLabel']}</p>
                        <p className='bg-blue-500'>input key = {c.inputKey}</p>
                        <p className='bg-blue-600'>input type = {c.inputType}</p>
                      </div>
                    ))}
                  </div>
              </Card>
                )
                )}
            </div>
          </Content>
        </div>
      </Layout>
    </div>
  )
}

export default CreateComponents