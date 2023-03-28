import { Layout, theme, Input, Button, Form, Card, Modal, Space, Alert, message } from 'antd';
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useContext, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../config/firebase';
import Footer from '../../component/footer';
import Table from '../../component/table';
import { AuthContext } from '../../config/AuthContex';

const Application = () => {
  const [appName, setAppName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrs, setImageUrls] = useState<any[]>([]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { currentUser } = useContext(AuthContext);
  const key = currentUser?.uid;

  const [form] = Form.useForm();
  const [formLayout] = useState<LayoutType>('horizontal');

  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const formItemLayout =
    formLayout === 'horizontal'
      ? { labelCol: { span: 8 }, wrapperCol: { span: 12 } }
      : null;


  const { Content } = Layout;
  const appDetails = { name: appName, description: description, userId: key };
  const colRef = collection(dbfire, 'application');
  // let q = query(colRef,where('user','==',key))
  const createApp = async () => {
    try {
      await setDoc(doc(colRef), { ...appDetails, id: doc(colRef).id })
      .then(message.success('Successfully Created!'))
      .then(()=>setOpen(false))
      if (imageUpload == null) return;
      const imageRef = ref(
        storage,
        `images/${currentUser?.uid}/${imageUpload.name + v4()}`
      );
      uploadBytes(imageRef, imageUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
        console.log('uploaded');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };


  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div className="flex">
      <Layout>
        <Sidebar />
        <div className="flex flex-col w-2/3">
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Card title='Applications' className="w-full">
              <Button type="default" className='mb-2 w-fit' onClick={showModal}>
                Add
              </Button>
                <Space wrap>
                  <Modal
                    title="Application"
                    open={open}
                    onOk={createApp}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                    okButtonProps={{ type: 'default' }}
                  >
                    <Card className="w-full" bordered={false}>
                      <Form
                        {...formItemLayout}
                        form={form}
                        className="flex flex-col "
                      >
                        <Form.Item label="App Name">
                          <Input
                            name="appName"
                            required
                            placeholder="Application name"
                            onChange={(e) => {
                              setAppName(e.target.value);
                            }}
                          />
                        </Form.Item>
                        <Form.Item label="Description:">
                          <Input
                            name="description"
                            required
                            placeholder="Some thing..."
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </Form.Item>
                        <Form.Item label="Image">
                          <Input
                            required
                            name="icon"
                            type="file"
                            placeholder="icon img"
                            onChange={(e) => {
                              setImageUpload(e.target.files?.[0] || null);
                            }}
                          />
                        </Form.Item>
                      </Form>
                    </Card>
                  </Modal>
                </Space>
                <Table />
              </Card>
            </div>
          </Content>
          <Footer />
        </div>
      </Layout>
    </div>
  );
};

export default Application;
