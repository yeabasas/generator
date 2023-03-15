import React, { createElement } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { useCookies } from 'react-cookie';
import { Layout, Input, Button, Form, theme, Select, Space, Card } from 'antd';
import Footer from '../../component/footer';
import { PlusSquareOutlined } from '@ant-design/icons';
import { data } from '../../data/json-form';

const CreateComponents = () => {
  const [inputLabel, setinputLabel] = useState('');
  const [inputType, setinputType] = useState('');
  const [inputKey, setinputKey] = useState('');
  const [cookies] = useCookies();
  const [formList, setFormList] = useState([{ inputLabel: '', inputType: '' }]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const key = cookies['formKey'];

  const formDetails = {
    inputLabel: inputLabel,
    inputType: inputType,
    formKey:key
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
  const colRef = collection(dbfire,'attributes')
  const { Content } = Layout;
  const createForm = async (event: any) => {
    event.preventDefault();
    try {
      await addDoc(colRef, formDetails)
      .then(() => {
        console.log('created');
      });
    } catch (error) {
      console.log(error);
    }
    handleCreate();
  };

  const handleFormAdd = () => {
    setFormList([...formList, { inputLabel: '', inputType: '' }]);
  };

  const handleChange = (value: string) => {
    setinputType(value);
    console.log(`selected ${value}`);
    
  };
  const handleCreate = ()=>{
    if(inputType == data.TEXT){
      return (
        createElement('h1',{className:'border'},`"zxcvzxcv"${inputLabel}`),
        createElement('input',{className:'border',placeholder:`${inputLabel}`}))
    }else if(inputType == data.CHECKBOX){
      return (createElement('input',{type:'checkbox'}))
      }
  }
  return (
    <div className="flex">
      <Layout>
        <Sidebar />
        <div className="flex flex-col w-full">
          {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: colorBgContainer }}>
              <Card title="Attributes" className="w-2/3" bordered={false}>
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
                    <Form.Item label="Input Label">
                      <Input
                        name="inputLabel"
                        required
                        placeholder="label:"
                        onChange={(e) => {
                          setinputLabel(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Input type">
                      <Select
                        placeholder="input types"
                        aria-required
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                          { name: 'text', value: 'text', label: 'text' },
                          { name: 'select', value: 'select', label: 'select' },
                          { name: 'checkbox', value: 'checkbox', label: 'checkbox'},
                          { name: 'data', value: 'date', label: 'date' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                      <Button onClick={createForm} type="default">
                        Create
                      </Button>
                      {/* <Button onClick={handleCreate} type="default">
                        Create form
                      </Button> */}

                    </Form.Item>
                  </Form>
                ))}
              </Card>
            </div>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Card title="Content" className="w-2/3" bordered={false}>
                  {handleCreate()}
              </Card>
            </div>
          </Content>
          <Footer />
        </div>
      </Layout>
    </div>
  );
};

export default CreateComponents;
