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
  const [inputLabel, setInputLabel] = useState('');
  const [inputType, setInputType] = useState('');
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
    // create()
    // try {
    //   await addDoc(colRef, formDetails)
    //   .then(() => {
    //     console.log('created');
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleFormAdd = () => {
    setFormList([...formList, { inputLabel: '', inputType: '' }]);
  };

  
  function handleLabel(){
    return createElement('label',null,`${inputLabel}`)
  }
  const handleCreate = ()=>{
    if(inputType == data.TEXT){
      return createElement('input',{type:'text',className:'border'})
    }else if(inputType == data.CHECKBOX){
      return createElement('input',{type:'checkbox'},)
    }
    else if(inputType == data.DATE){
      return createElement('input',{type:'date'},)
    }
    // else if(inputType == data.SELECT){
      //    return createElement('select',{},
      //    createElement('option',{onchange:handleChange},
      //     createElement('input',{type:'text',style:{padding:'10'}})
      //     )
      //     )
      //   }
    };
    const handleChange = (e: { target: { options: any; value:any;}; },index: string | number) => {
      const {options,value}=e.target
      const list= [...formList]
      list[index][options] = e.target.value
      setInputType(list);
      console.log(`selected ${value}`);
      
    };
    const handleInputChange = (e: { target: { name: any; value: any; }; }, index: string | number) => {
      const { name, value } = e.target;
      const list = [...formList];
      list[index][name] = value;
      setFormList(list);
    };
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
                        value={formData.inputLabel}
                        onChange={(e)=>handleInputChange(e,index)}
                      />
                    </Form.Item>
                    <Form.Item label="Input type">
                      <Select
                        placeholder="input types"
                        aria-required
                        // value={formData.inputType}
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                          { name: 'text', value: '1', label: 'text' },
                          { name: 'select', value: '2', label: 'select' },
                          { name: 'checkbox', value: '3', label: 'checkbox'},
                          { name: 'date', value: '4', label: 'date' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                      <Button onClick={()=>{
                        // handleLabel
                        handleCreate;}} type="default">
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
                
                <div className='flex flex-col gap-2'>
                  {/* {handleLabel()}
                  {handleCreate()} */}
                  {formList && formList.map((list,index)=>(
                    <ul key={index}>
                      {list.inputLabel && <li>{list.inputLabel}</li>}
                      {list.inputType && <li>{list.inputType}</li>}
                    </ul>
                  ))}
                </div>
               
                
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
