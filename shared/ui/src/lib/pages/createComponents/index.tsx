import { Button, Card, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import React, { createElement, useContext, useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import FormSidebar from '../../component/formSidebar'
import { AuthContext } from '../../config/AuthContex';
import { dbfire } from '../../config/firebase';
import { data } from '../../data/json-form';

const CreateComponents = () => {
  const [form, setForm] = useState<[]>([]);
  const { currentUser } = useContext(AuthContext);
  const params = useParams()
  const userIden = params['formId']
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const colRef = collection(dbfire, 'form');
  const colRefApp = collection(dbfire, 'application');
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
        <div className="flex w-full">
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <Card className="w-2/3" bordered={false}>
                {form.map((i: any, index) => (
                  <div key={index}>
                    {(() => {
                      if (i.formKey != userIden) {
                        return
                      } else {
                        return (
                          i.attribute.map((c: any, v: React.Key | null | undefined) => {
                            if (c.inputLabel) {
                              return (
                                <div className='flex gap-2 mb-4'>
                                  {c.inputLabel}
                                  {
                                    createElement('input', { className: 'flex flex-col border' })
                                  }
                                </div>
                              )
                            }
                          })
                        )
                      }
                    })()}
                  </div>))}
              </Card>
            </div>
          </Content>
        </div>
      </Layout>
    </div>
  )
}

export default CreateComponents