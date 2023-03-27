// import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
// import { useContext, useEffect, useState } from 'react';
// import { dbfire } from '../../config/firebase';
// import {
//   Select,
//   Input,
//   Button,
//   Form,
//   Card,
//   Modal,
//   Space,
//   Layout,
//   theme,
// } from 'antd';
// import { labels } from '../../data/json-form';
// import { AuthContext } from '../../config/AuthContex';
// import { link } from 'fs';
// import { useParams } from 'react-router-dom';
// import FormTable from '../table/formTable';
// import { Content } from 'antd/es/layout/layout';
// import Footer from '../footer';
// import Sidebar from '../sidebar';
// const AppForm = () => {
//   const [formName, setFormName] = useState('');
//   const [description, setDescription] = useState('');
//   const [formKey, setFormKey] = useState('');
//   const [formApp, setFormApp] = useState<[]>([]);
//   const { appId } = useParams();
//   const [formList, setFormList] = useState([
//     { formName: '', formKey: '', Description: '' },
//   ]);
//   const handleInputChange = (
//     e: { target: { name: string; value: string } },
//     index: string | number
//   ) => {
//     const { name, value } = e.target;
//     const lists = [...attributeList];
//     lists[index][name] = value;
//     console.log(lists);
//     setAttributeList(lists);
//   };
//   const { currentUser } = useContext(AuthContext);
//   const userId = currentUser?.uid;
//   const [attributeList, setAttributeList] = useState([
//     { inputLabel: '', inputType: '', inputKey: '' },
//   ]);

//   const colRefApp = collection(dbfire, 'application');
//   useEffect(() => {
//     const display = onSnapshot(colRefApp, (querySnapshot) => {
//       const items: any = [];
//       querySnapshot.forEach((doc) => {
//         items.push(doc.data());
//       });
//       setFormApp(items);
//     });
//     return () => {
//       display();
//     };
//   }, []);

//   const formDetails = {
//     formName: formName,
//     formKey: formKey,
//     description: description,
//     userId: userId,
//     appId: appId,
//     attribute: attributeList,
//   };
//   const colRef = collection(dbfire, 'form');
//   const createForm = async (event: any) => {
//     event.preventDefault();
//     try {
//       await setDoc(doc(colRef), { ...formDetails, id: doc(colRef).id });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [form] = Form.useForm();
//   const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

//   type LayoutType = Parameters<typeof Form>[0]['layout'];

//   const formItemLayout =
//     formLayout === 'horizontal'
//       ? { labelCol: { span: 3 }, wrapperCol: { span: 14 } }
//       : null;
//   const buttonItemLayout =
//     formLayout === 'horizontal'
//       ? { wrapperCol: { span: 14, offset: 4 } }
//       : null;

//   const attributeItemLayout =
//     formLayout === 'inline'
//       ? { labelCol: { span: 13 }, wrapperCol: { span: 10 } }
//       : null;

//   const handleInputChangee = (
//     e: { value: { value: any } },
//     index: string | number
//   ) => {
//     let value;
//     const list = [...formList];
//     list[index][value] = e.value;
//     console.log(setFormList(list));
//   };

//   const handleFormDuplicate = () => {
//     setAttributeList([
//       ...attributeList,
//       { inputLabel: '', inputType: '', inputKey: '' },
//     ]);
//   };

//   let lastValue = '';
//   function onInput(e: any) {
//     const currentValue = e.target.value;
//     if (!currentValue.match(labels.KEY)) e.target.value = lastValue;
//     else lastValue = currentValue;
//   }

//   const [open, setOpen] = useState(false);
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const showModal = () => {
//     setOpen(true);
//   };

//   const handleOk = () => {
//     // createApp(true)
//     setConfirmLoading(true);
//     setTimeout(() => {
//       setOpen(false);
//       setConfirmLoading(false);
//     }, 4000);
//   };
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const handleCancel = () => {
//     setOpen(false);
//   };
//   /*--------------return---------------------------------- */

//   return (
//     <Space wrap>
//       <div className='flex flex-col w-full'>
//       <Button type="default" className="mb-2 w-fit right-9 fixed " onClick={showModal}>
//         Add
//       </Button>
//       <Modal
//         open={open}
//         onOk={createForm}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//         width={1000}
//         okButtonProps={{ type: 'default' }}
//       >
//         <Card className="w-full mb-4" bordered={false}>
//           <Card title="Form" className="w-full mb-4" bordered={true}>
//             <Form
//               {...formItemLayout}
//               layout={formLayout}
//               form={form}
//               className="flex flex-col"
//             >
//               <Form.Item label="Form Name">
//                 <Input
//                   name="formName"
//                   required
//                   placeholder="Form name"
//                   value={formName}
//                   onChange={(e) => setFormName(e.target.value)}
//                 />
//               </Form.Item>
//               <Form.Item label="Key">
//                 <Input
//                   required
//                   name="formKey"
//                   placeholder="Key"
//                   onChange={(e) => {
//                     setFormKey(e.target.value);
//                   }}
//                 />
//               </Form.Item>
//               <Form.Item label="Description">
//                 <Input
//                   name="description"
//                   required
//                   placeholder="Some thing..."
//                   onChange={(e) => {
//                     setDescription(e.target.value);
//                   }}
//                 />
//               </Form.Item>
//             </Form>
//           </Card>
//           <Card title="Attributes" className="w-full mb-4" bordered={true}>
//             <div className="flex justify-end mr-6">
//               {}
//               <Button
//                 onClick={handleFormDuplicate}
//                 type="dashed"
//                 className="float-right w-fit mb-2"
//               >
//                 {/* <PlusSquareOutlined /> */}
//                 <span>add</span>
//               </Button>
//             </div>
//             {attributeList.map((formData, index) => (
//               <Form
//                 {...attributeItemLayout}
//                 layout={formLayout}
//                 form={form}
//                 key={index}
//                 className="grid grid-cols-3 border-b-2 gap-2 mb-2 "
//               >
//                 <Form.Item label="InputLabel">
//                   <Input
//                     name="inputLabel"
//                     required
//                     placeholder="label:"
//                     // onInput={(e)=>onInput(e)}
//                     onChange={(e) => handleInputChange(e, index)}
//                   />
//                 </Form.Item>
//                 <Form.Item label="InputKey">
//                   <Input
//                     name="inputKey"
//                     required
//                     placeholder="Key"
//                     onInput={(e) => onInput(e)}
//                     onChange={(e) => handleInputChange(e, index)}
//                   />
//                 </Form.Item>
//                 <Form.Item label="Input type">
//                   <Select
//                     placeholder="input types"
//                     aria-required
//                     // value={formData.inputType}
//                     style={{ width: 100 }}
//                     onChange={(e) => handleInputChangee(e, index)}
//                     options={[
//                       { name: 'text', value: 'text', label: 'text' },
//                       { name: 'select', value: 'select', label: 'select' },
//                       {
//                         name: 'checkbox',
//                         value: 'checkbox',
//                         label: 'checkbox',
//                       },
//                       { name: 'date', value: 'date', label: 'date' },
//                     ]}
//                   />
//                 </Form.Item>
//               </Form>
//             ))}
//           </Card>
//         </Card>
//       </Modal>
//       <FormTable />
//     </div>
//     </Space>
//   );
// };

// export default AppForm;
