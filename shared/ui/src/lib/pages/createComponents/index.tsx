import { Button, Card, Layout, Modal, Space, message, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import React, { createElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSidebar from '../../component/formSidebar';
import { dbfire } from '../../config/firebase';
import AttributeTable from '../../component/table/attributeTable';

const CreateComponents = () => {
  const [form, setForm] = useState<[]>([]);
  const params = useParams();
  const formId = params['formId'];
  const appId = params['appId'];
  const userId = params['id'];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const colRef = collection(dbfire, 'form');
  const attColRef = collection(dbfire, 'customReceivedData');
  const [element, setElement] = useState({});

  const appDetails = element;

  useEffect(() => {
    const display = onSnapshot(colRef, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), attId: doc.id });
      });
      setForm(items);
    });
    return () => {
      display();
    };
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    const list = { ...element };
    list[name] = value;
    console.log(list);
    setElement(list);
  };
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleSubmit = async () => {
    try {
      await setDoc(doc(attColRef), {
        ...appDetails,
        appId: appId,
        formId: formId,
        userId: userId,
      })
        .then(() => setOpen(false))
        .then(() => message.success('submit successfully'));
    } catch (error) {
      console.log(error);
    }
  };
  // const showLabel=()=>{
    const Labels = form.map((i: any) => {
      if(i.id != formId){
        return
      }else return i.formName
    }
    )
    

  //   return Labels

  // }
  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="flex">
      <Layout>
        <FormSidebar />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: colorBgContainer }}>
            <Card title={Labels} className="w-full border" bordered={false}>
              <Button type="default" className="w-fit" onClick={showModal}>
                Add Info
              </Button>
              <Space wrap>
                <Modal
                  title="Custom Data"
                  open={open}
                  onOk={handleSubmit}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  okButtonProps={{ type: 'default' }}
                >
                  <Card className="w-full border" bordered={false}>
                    {form.map((i: any, index) => (
                      <div className="grid grid-cols-1" key={index}>
                        {(() => {
                          if (i.id != formId) return;
                          else {
                            return i.attribute.map(
                              (c: any, v: React.Key | null | undefined) => {
                                return (
                                  <div key={v} className="flex gap-2 mb-4">
                                    {c.inputLabel}
                                    {createElement('input', {
                                      type: `${c.inputType}`,
                                      name: `${c.inputKey}`,
                                      className: 'flex flex-col border',
                                      onChange: (e: {
                                        target: {
                                          name: string;
                                          value: string;
                                        };
                                      }) => handleInputChange(e),
                                    })}
                                  </div>
                                );
                              }
                            );
                          }
                        })()}
                      </div>
                    ))}
                  </Card>
                </Modal>
              </Space>
              <AttributeTable />
            </Card>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default CreateComponents;
