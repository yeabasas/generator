import { createElement } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { useCookies } from 'react-cookie';
import { Layout, Input, Button, Form, theme, Select, Card } from 'antd';
import Footer from '../../component/footer';
import { PlusSquareOutlined } from '@ant-design/icons';
import { data } from '../../data/json-form';

const CreateComponents = () => {
  const [inputLabel, setInputLabel] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputKey, setinputKey] = useState('');
  const [cookies] = useCookies();
  const [formList, setFormList] = useState([{ inputLabel: '', inputType: '' }]);
  const { token: { colorBgContainer } } = theme.useToken();

  const key = cookies['formKey'];

  const formDetails = { inputLabel: inputLabel, inputType: inputType, formKey:key };
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('inline');

  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const formItemLayout = formLayout === 'inline' ? { labelCol: { span: 8 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout = formLayout === 'inline' ? { wrapperCol: { span: 14, offset: 4 } } : null;
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
  };

  const handleFormAdd = () => {
    setFormList([...formList, { inputLabel: '', inputType: '' }]);
  };

  
  function handleLabel(){
    return createElement('label',null,`${inputLabel}`)
  }

  const handleCreate = ()=>{
    const receivedInputs = inputType;
    if(receivedInputs == data.TEXT){
      return createElement('input',{type:'text',className:'border'})
    }else if(receivedInputs == data.CHECKBOX){
      return createElement('input',{type:'checkbox'},)
    }
    else if(receivedInputs == data.DATE){
      return createElement('input',{type:'date'},)
    }
    else if(receivedInputs == data.SELECT){
      return handleSelect()
    }
    };

    const handleChange = (value:string) => {
      setInputType(value);
      console.log(`selected ${value}`);
    };
    // const handleInputChange = (e: { target: { name: any; value: any; }; }, index: string | number) => {
    //   const { name, value } = e.target;
    //   const list = [...formList];
    //   list[index][name] = value;
    //   setFormList(list);
    // };
  return (
    <div className="flex">
      <Layout>
        <Sidebar />
        <div className="flex flex-col w-full">
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
                        // value={formData.inputLabel}
                        onChange={(e)=>setInputLabel(e.target.value)}
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
                          { name: 'text', value: 'text', label: 'text' },
                          { name: 'select', value: 'select', label: 'select' },
                          { name: 'checkbox', value: 'checkbox', label: 'checkbox'},
                          { name: 'date', value: 'date', label: 'date' },
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
              </Card>
            </div>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }}>
              <Card title="Content" className="w-2/3" bordered={false}>
              <div className='flex gap-2'>
                {handleLabel()}
                {handleCreate()}
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
function handleSelect() {
  throw new Error('Function not implemented.');
}

