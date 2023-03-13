import { doc, setDoc} from 'firebase/firestore';
import { useState } from 'react';
import { dbfire } from '../../config/firebase';
import Sidebar from '../sidebar';
import { useCookies } from 'react-cookie';
import { Layout, Input, Button, Form, theme } from 'antd';
import Footer from '../footer';
import {PlusSquareOutlined} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';

const AppForm = () => {
  const [formName, setFormName] = useState('');
  const [description, setDescription] = useState('');
  const [formKey, setFormKey] = useState('');
  const [cookies] = useCookies();
  const [formList,setFormList]=useState([{ formName:"",formKey:"",Description:""}])
  const {token: { colorBgContainer },} = theme.useToken();
  const navigate = useNavigate();
  
  const key = cookies['user'];

  const formDetails = {
    formName: formName,
    formKey: formKey,
    description: description,
  };

  
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');

  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const formItemLayout =
  formLayout === 'inline' ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
  formLayout === 'inline' ? { wrapperCol: { span: 14, offset: 4 } } : null;

  const { Content } = Layout;
  const createForm = async (event:any) => {
    event.preventDefault();
    try {
      await setDoc(doc(dbfire, 'form', key), formDetails)
      .then(() => {
        console.log('created');
        navigate('/application/applicationform/createComponents')
      });
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className='flex'>
    <Layout>
      <Sidebar/>
      <div className='flex flex-col w-full'>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: colorBgContainer }}>
            <Form
                {...formItemLayout}
                layout={formLayout}
                form={form}
                className='flex w-full'
              >
                <Form.Item label="Form Name">
                  <Input 
                  name='formName'
                  required
                  placeholder="Form name"  
                  onChange={(e)=>{setFormName(e.target.value)}}/>
                </Form.Item>
                <Form.Item label="Key">
                  <Input 
                  required
                  name='formKey'
                  placeholder="Key" 
                  onChange={(e) => {setFormKey(e.target.value);}} />
                </Form.Item>
                <Form.Item label="Description">
                  <Input 
                  name='description'
                  required
                  placeholder="Some thing..." 
                  onChange={(e) => {setDescription(e.target.value);}}/>
                </Form.Item>
                <Form.Item {...buttonItemLayout}>
                  <Button onClick={createForm} type="default">Submit</Button>
                </Form.Item>
              </Form>
          </div>
          {/* <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Table columns={columns}/>
          </div> */}
        </Content>
        <Footer/>
      </div>
      </Layout>
  </div>
  );
};

export default AppForm;
