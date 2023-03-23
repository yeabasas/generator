import { Layout, theme, Input, Button, Form, Card, Alert } from 'antd';
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
// import Table from '../../component/table';
import { useContext, useEffect, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../../config/firebase';
import { useCookies } from 'react-cookie';
import Footer from '../../component/footer';
import Table from '../../component/table';
import { AuthContext } from '../../config/AuthContex';
const Application = () => {
  const [appName, setAppName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrs, setImageUrls] = useState<any[]>([]);
  const [cookies, setCookies] = useCookies();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { currentUser } = useContext(AuthContext);
  const key = currentUser?.uid;

  const [form] = Form.useForm();
  const [formLayout] = useState<LayoutType>('horizontal');
  const [posts,setPosts]=useState<[]>([])

  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const formItemLayout =
    formLayout === 'horizontal'
      ? { labelCol: { span: 3 }, wrapperCol: { span: 12 } }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? { wrapperCol: { span: 14, offset: 4 } }
      : null;

  const { Content } = Layout;
  const appDetails = { name: appName, description: description, userId: key };
  const colRef = collection(dbfire, 'application form');
  // let q = query(colRef,where('user','==',key))
  const createApp = async () => {
    try {
      await addDoc(colRef, appDetails).then(function (docRef) {
        console.log(docRef.id);
        setCookies('docRef', docRef.id);
        <Table/>
        // <Alert
        //   className="flex"
        //   message="App Created"
        //   type="success"
        //   showIcon
        // />;
        
      });
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

  const columns = [
    {
      title: 'AppName',
      dataIndex: 'AppName',
      key: 'appName',
      // render:(datas:any)=>data.map(datas=>datas.AppName)
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'description',
    },
  ];
  return (
    <div className="flex">
      <Layout>
        <Sidebar />
        <div className="flex flex-col w-full">
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <Card title="Application" className="w-2/3" bordered={false}>
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
                  <Form.Item {...buttonItemLayout}>
                    <Button onClick={createApp} type="default">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </div>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Card title="Created Apps" className="w-2/3">
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
