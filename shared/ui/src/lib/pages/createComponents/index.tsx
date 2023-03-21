import { createElement } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { dbfire } from '../../config/firebase';
import Sidebar from '../../component/sidebar';
import { useCookies } from 'react-cookie';
import { Layout, Input, Button, Form, theme, Select, Card } from 'antd';
import Footer from '../../component/footer';
import { PlusSquareOutlined } from '@ant-design/icons';
import { data,labels } from '../../data/json-form';

const CreateComponents = () => {
  const buildForm =()=>{
    let keyvalue:any
     const formFromApi={
       name:'',
       description:"",
       attributes:[
         {
           label:"Name",
           inputType:"text",
           key:'name'
         }
       ]
     }
     formFromApi.attributes.forEach(single=>{
       keyvalue[single.key]=""
     })
     return keyvalue
   }
  const [inputLabel, setInputLabel] = useState('');
  const [inputType, setInputType] = useState('');
  const [inputKey, setinputKey] = useState('');
  const [cookies] = useCookies();
  const [formList, setFormList] = useState([{ inputLabel: '', inputType: ""}]);
  const [customFormList,setCustomFormList]= useState([buildForm])
  const [List, setList] = useState([{ inputType: {} }]);
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
    setFormList([...formList, { inputLabel: '', inputType: "" }]);
  };

  
  function handleLabel(){
    return createElement('label',null,`${inputLabel}`)
  }
  function handleButton(){
    
      return createElement('input',{type:'button',className:'border px-4 hover:cursor-pointer',value:`${inputLabel}`})
   
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
      return createElement('input',{type:'button',className:'border px-4 hover:cursor-pointer',value:'select'})
    }
    };

    const handleChange = (value:any) => {
      // const {name,values}=value
      // const seurat = {...List}
      // seurat[index][name]=values
      setInputType(value)
      console.log(`selected ${value}`);
    };
    const handleInputChange = (e: { target: { name: string; value: string; }; }, index: string | number) => {
      const { name, value } = e.target;
      const list = [...formList];
      list[index][name] = value;
      setFormList(list);
    };
    let lastValue = "";

    function onInput(e:any) {
	    const currentValue = e.target.value;

	    if (!currentValue.match(labels.LABEL))
		    e.target.value = lastValue;
	    else
		    lastValue = currentValue;
    }

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
                    className="flex gap-4 w-full mb-6"
                    key={index}
                  >
                    <Form.Item label="button">
                      <Input
                        name="inputLabel"
                        required
                        placeholder="label"
                        onChange={(e)=>setInputLabel(e.target.value)}
                      />
                    </Form.Item>
                  <Form.Item>
                      <Button onClick={handleButton}>Add Button</Button>
                    </Form.Item>
                    <Form className='flex'>
                    <Form.Item label="Input Label">
                      <Input
                        name="inputLabel"
                        required
                        placeholder="label:"
                        // onInput={(e)=>onInput(e)}
                        value={formData.inputLabel}
                        onChange={(e)=>handleInputChange(e, index)}
                      />
                    </Form.Item>
                    <Form.Item label="Input type">
                      <Select
                        placeholder="input types"
                        aria-required
                        // value={formData.inputType}
                        style={{ width: 120 }}
                        // value={formData.inputType}
                        onChange={handleChange}
                        options={[
                          { name: 'text', label: 'text' },
                          { name: 'select',  label: 'select' },
                          { name: 'checkbox',  label: 'checkbox'},
                          { name: 'date',  label: 'date' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                      <Button onClick={createForm} type="default">
                        Create
                      </Button>
                    </Form.Item>
                    </Form>
                  </Form>
                ))}

                 {formList.map((formData, index) => (
                  <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    className="flex gap-4 w-full mb-6"
                    key={index}
                  >
                    <Form.Item label="button">
                      <Input
                        name="inputLabel"
                        required
                        placeholder="label"
                        onChange={(e)=>setInputLabel(e.target.value)}
                      />
                    </Form.Item>
                  <Form.Item>
                      <Button onClick={handleButton}>Add Button</Button>
                    </Form.Item>
                    <Form className='flex'>
                    <Form.Item label="Input Label">
                      <Input
                        name="inputLabel"
                        required
                        placeholder="label:"
                        // onInput={(e)=>onInput(e)}
                        value={formData.inputLabel}
                        onChange={(e)=>handleInputChange(e, index)}
                      />
                    </Form.Item>
                    <Form.Item label="Input type">
                      <Select
                        placeholder="input types"
                        aria-required
                        // value={formData.inputType}
                        style={{ width: 120 }}
                        value={formData.inputType}
                        onChange={handleChange}
                        options={[
                          { name: 'text', label: 'text' },
                          { name: 'select',  label: 'select' },
                          { name: 'checkbox',  label: 'checkbox'},
                          { name: 'date',  label: 'date' },
                        ]}
                      />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                      <Button onClick={createForm} type="default">
                        Create
                      </Button>
                    </Form.Item>
                    </Form>
                  </Form>
                ))}
              </Card>
            </div>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer, }}>
              <Card title="Content" className="w-2/3" bordered={false}>
                <>
                {formList && formList.map((list,index) => (
                  <><ul key={index}>
                    {list.inputLabel && 
                    <>
                    <li>{list.inputLabel}</li>
                    <li>{list.inputType}</li>
                    </>}
                  </ul>
                    {handleButton}</>
                ))}
                <div>
                  {handleButton()}
                </div>
                </>
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
