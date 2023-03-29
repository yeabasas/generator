import { Card, Layout, theme } from 'antd'
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
  const colRefAtt = collection(dbfire, 'customReceivedData');
  const [element, setElement] = useState<any[]>([])
  const appDetails = { customData:[...element] };

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

  const handleInputChange = ( e: { target: { value: string } },
    index: string | number)=>{
    const { value } = e.target;
    const lists = [...element];
    lists[index] = value;
    setElement(lists);
  };

  const handleSubmit = async ()=>{
    try {
      await setDoc(doc(colRefAtt),appDetails)
      .then(()=>console.log('sent'))
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
                                      name: `${c.inputLabel}`,
                                      className: 'flex flex-col border',
                                      onChange: (e) => handleInputChange(e,index)
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
                <button onClick={handleSubmit}>submit</button>
              </Card>
            </div>
          </Content>
        </div>
      </Layout>
    </div>
  )
}

export default CreateComponents