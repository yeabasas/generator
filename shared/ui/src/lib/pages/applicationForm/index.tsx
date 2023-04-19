import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { dbfire } from '../../config/firebase';
import { Select,Input,Button,Form,Card,Modal,Layout,theme,message,} from 'antd';
import { labels } from '../../data/json-form';
import { AuthContext } from '../../config/AuthContex';
import { useParams } from 'react-router-dom';
import { Content } from 'antd/es/layout/layout';
import Sidebar from '../../component/sidebar';
import FormTable from '../../component/table/formTable';
const ApplicationForm = () => {
  const [formName, setFormName] = useState('');
  const [description, setDescription] = useState('');
  const [formKey, setFormKey] = useState('');
  const [formApp, setFormApp] = useState<[]>([]);
  const params = useParams();
  const appId = params['appId']
  const [formList, setFormList] = useState([
    { formName: '', formKey: '', Description: '' },
  ]);
  const handleInputChange = (
    e: { target: { name: string; value: string } },
    index: string | number
  ) => {
    const { name, value } = e.target;
    const lists = [...attributeList];
    lists[index][name] = value;
    console.log(lists);
    setAttributeList(lists);
  };
  const { currentUser } = useContext(AuthContext);
  const [ selected,setSelected]=useState('')

const userId = currentUser?.uid;
  const [attributeList, setAttributeList] = useState([
    { inputLabel: '', inputKey: '',inputType: `` },
  ]);

  const colRefApp = collection(dbfire, 'application');
  useEffect(() => {
    const display = onSnapshot(colRefApp, (querySnapshot) => {
      const items: any = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setFormApp(items);
    });
    return () => {
      display();
    };
  }, []);

  const formDetails = {
    formName: formName,
    formKey: formKey,
    description: description,
    userId: userId,
    appId: appId,
    attribute: attributeList,
  };

  const colRef = collection(dbfire, 'form');

  const createForm = async (event: any) => {
    event.preventDefault();
    try {
      await setDoc(doc(colRef), { ...formDetails, id: doc(colRef).id })
      .then(message.success('Successfully Created!'))
      .then(()=>handleCancel())
    } catch (error) {
      console.log(error);
    }
    
  };

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const formItemLayout =
    formLayout === 'horizontal'
      ? { labelCol: { span: 3 }, wrapperCol: { span: 14 } }
      : null;

  const attributeItemLayout =
    formLayout === 'inline'
      ? { labelCol: { span: 13 }, wrapperCol: { span: 10 } }
      : null;

  const handleChange = (selected: string, index: number|string) => {
    const { name, value } = {name:"inputType",value:selected};
    const lists = [...attributeList];
    lists[index][name] = value;
    setAttributeList(lists);
  };

  const handleFormDuplicate = () => {
    setAttributeList([
      ...attributeList,
      { inputLabel: '', inputKey: '',inputType: ''},
    ]);
  };

  let lastValue = '';
  function onInput(e: any) {
    const currentValue = e.target.value;
    if (!currentValue.match(labels.KEY)) e.target.value = lastValue;
    else lastValue = currentValue;
  }

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const { token: { colorBgContainer }, } = theme.useToken();

  const handleCancel = () => {
    setOpen(false);
    setFormName('');
    setFormKey('');
    setDescription('');
    // setAttributeList([{inputLabel: '', inputKey: '' }]);
  };

  return (
    <div className='flex'>
      <Layout>
        <Sidebar />
        <div className='flex flex-col w-full'>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
              <Card title='Forms' className='w-full'>
                <Button type="default" className="mb-2 w-fit" onClick={showModal}>
                  Add
                </Button>
                <Modal
                  open={open}
                  onOk={createForm}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                  width={1000}
                  okButtonProps={{ type: 'default' }}
                >
                  <Card className="w-full mb-4" bordered={false}>
                    <Card title="Form" className="w-full mb-4" bordered={true}>
                      <Form
                        {...formItemLayout}
                        layout={formLayout}
                        form={form}
                        className="flex flex-col"
                      >
                        <Form.Item label="Form Name">
                          <Input
                            name="formName"
                            required
                            placeholder="Form name"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                          />
                        </Form.Item>
                        <Form.Item label="Key">
                          <Input
                            required
                            name="formKey"
                            placeholder="Key"
                            onChange={(e) => {
                              setFormKey(e.target.value);
                            }}
                          />
                        </Form.Item>
                        <Form.Item label="Description">
                          <Input
                            name="description"
                            required
                            placeholder="Some thing..."
                            onChange={(e) => {
                              setDescription(e.target.value);
                            }}
                          />
                        </Form.Item>
                      </Form>
                    </Card>
                    <Card title="Attributes" className="w-full mb-4" bordered={true}>
                      <div className="flex justify-end mr-6">
                        <Button
                          onClick={handleFormDuplicate}
                          type="dashed"
                          className="float-right w-fit mb-2"
                        >
                          {/* <PlusSquareOutlined /> */}
                          <span>add</span>
                        </Button>
                      </div>
                      {attributeList.map((formData, index) => (
                        <Form
                          {...attributeItemLayout}
                          layout={formLayout}
                          form={form}
                          key={index}
                          className="grid grid-cols-3 border-b-2 gap-2 mb-2 "
                        >
                          <Form.Item label="InputLabel">
                            <Input
                              name="inputLabel"
                              required
                              placeholder="label:"
                              // onInput={(e)=>onInput(e)}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </Form.Item>
                          <Form.Item label="InputKey">
                            <Input
                              name="inputKey"
                              required
                              placeholder="Key"
                              onInput={(e) => onInput(e)}
                              onChange={(e) => handleInputChange(e, index)}
                            />
                          </Form.Item>
                          <Form.Item label="Input type">
                            <Select
                              placeholder="input types"
                              aria-required
                              style={{ width: 100 }}
                              // value={selected}
                              onChange={(e)=>handleChange(e,index)}
                              options={
                              [
                                { name: 'text', value: 'text', label: 'text' },
                                { name: 'select', value: 'select', label: 'select' },
                                { name: 'checkbox', value: 'checkbox', label: 'checkbox',},
                                { name: 'date', value: 'date', label: 'date' },
                              ]}
                            />
                          </Form.Item>
                          {selected}
                        </Form>
                      ))}
                    </Card>
                  </Card>
                </Modal>
                <FormTable/>
              </Card>
            </div>
          </Content>
        </div>
      </Layout>
    </div>
  )
}

export default ApplicationForm