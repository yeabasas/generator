import { Button, Card, Layout, theme } from 'antd'
import { Content } from 'antd/es/layout/layout';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { createElement, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import FormSidebar from '../../component/formSidebar'
import { dbfire } from '../../config/firebase';

const CreateComponents = () => {
  const [form, setForm] = useState<[]>([]);
  const params = useParams()
  const userIden = params['formId']
  const { token: { colorBgContainer }, } = theme.useToken();
  const colRef = collection(dbfire, 'form');
  const attColRef = collection(dbfire, 'customReceivedData');
  const [element, setElement] = useState([{}])

  const appDetails = { element }

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

  const handleInputChange = (e: { target: { name: any, value: any }; }) => {
    const { name, value } = e.target;
    const list = {...element}
    list[name] = value
    console.log(list)
    setElement(list)
  }
  const handleSubmit = async () => {
    try {
      await setDoc(doc(attColRef), appDetails)
        .then(() => console.log('sent'))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex'>
      <Layout>
        <FormSidebar />
        <div className="flex w-full">
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <Card className="w-fit" bordered={false}>
                {form.map((i: any, index) => (
                  <div className='grid grid-cols-1' key={index}>
                    {(() => {
                      if (i.id != userIden) return;
                      else {
                        return (
                          i.attribute.map((c: any, v: React.Key | null | undefined) => {
                            return (
                              <div key={v} className='flex justify-between gap-2 mb-4'>
                                {c.inputLabel}
                                {
                                  createElement(
                                    'input',
                                    {
                                      type: `${c.inputType}`,
                                      name: `${c.inputLabel}`,
                                      className: 'flex flex-col border',
                                      onChange: (e: { target: { name: string, value: string; }; }) => handleInputChange(e)
                                    }
                                  )
                                }
                              </div>
                            )
                          })
                        )
                      }
                    })()}
                  </div>
                ))}
              </Card>
            </div>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <Button type='primary' className='bg-cyan-500' onClick={handleSubmit}>Submit</Button>
            </div>
          </Content>
        </div>
      </Layout>
    </div>
  )
}

export default CreateComponents