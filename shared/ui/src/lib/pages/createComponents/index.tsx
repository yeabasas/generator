import React from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { useCookies } from 'react-cookie';
import { Layout, Input, Button, Form, theme, Select, Space } from 'antd';
import Footer from '../../component/footer';
import { PlusSquareOutlined } from '@ant-design/icons';

const CreateComponents = () => {
  const [formName, setFormName] = useState('');
  const [description, setDescription] = useState('');
  const [formKey, setFormKey] = useState('');
  const [cookies] = useCookies();
  const [formList, setFormList] = useState([
    { formName: '', formKey: '', Description: '' },
  ]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    formLayout === 'inline'
      ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } }
      : null;

  const buttonItemLayout =
    formLayout === 'inline' ? { wrapperCol: { span: 14, offset: 4 } } : null;

  const { Content } = Layout;
  const createForm = async (event: any) => {
    event.preventDefault();
    try {
      await setDoc(doc(dbfire, 'form', key), formDetails).then(() => {
        console.log('created');
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormAdd = () => {
    setFormList([...formList, { formName: '', formKey: '', Description: '' }]);
  };

  const handleChange = (value:string) => {
        console.log(`selected ${value}`)
  }

  return (
    <div className="flex">
      <Layout>
        <Sidebar />
        <div className="flex flex-col w-full">
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <Button
                onClick={handleFormAdd}
                type="dashed"
                className="float-right mb-6"
              >
                <PlusSquareOutlined />
                <span>add</span>
              </Button>
              {formList.map((formData, index) => (
                <Form
                  {...formItemLayout}
                  layout={formLayout}
                  form={form}
                  className="flex w-full mb-6"
                  key={index}
                >
                  <Form.Item label='Input Label'>
                    <Input
                      name="formName"
                      required
                      placeholder="label:"
                      onChange={(e) => {
                        setFormName(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label='Input type'>
                    <Select
                      placeholder="input types"
                      style={{ width: 120 }}
                      onChange={handleChange}
                      options={[
                        { value: 'text', label: 'text' },
                        { value: 'select', label: 'select' },
                        { value: 'checkbox', label: 'checkbox' },
                        { value: 'select', label: 'select' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item {...buttonItemLayout}>
                    <Button onClick={createForm} type="default">
                      Create
                    </Button>
                  </Form.Item>
                </Form>
              ))}
            </div>
            {/* <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Table columns={columns}/>
          </div> */}
          </Content>
          <Footer />
        </div>
      </Layout>
    </div>
  );
};

export default CreateComponents;
