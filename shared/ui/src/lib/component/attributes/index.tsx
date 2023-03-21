import { useState } from 'react'
import { Input, Button, Form, Select } from 'antd';
import { labels } from '../../data/json-form';

const Attributes = () => {
    const [inputLabel, setInputLabel] = useState('');
    const [inputType, setInputType] = useState('');
    const [inputKey, setInputKey] = useState('');
    const [formList, setFormList] = useState([{ inputLabel: '', inputType: "", inputKey: "" }]);

    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('inline');
    const formDetails = { inputLabel: inputLabel, inputType: inputType, inputKey: inputKey };
    type LayoutType = Parameters<typeof Form>[0]['layout'];

    const formItemLayout = formLayout === 'inline' ? { labelCol: { span: 13 }, wrapperCol: { span: 10 } } : null;
    const buttonItemLayout = formLayout === 'inline' ? { wrapperCol: { span: 4, offset: 10 } } : null;

    const handleInputChange = (e: { target: { name: string; value: string; }; }, index: string | number) => {
        const { name, value } = e.target;
        const list = [...formList];
        list[index][name] = value;
        console.log(list)
        setFormList(list);
    };
    const handleInputChangee = (e: { value: { value: any; }; }, index: string | number) => {
        let value
        const list = [...formList];
        list[index][value] = e.value;
        console.log(setFormList(list));
    };

    const handleFormDuplicate = () => {
        setFormList([...formList, { inputLabel: '', inputType: "", inputKey: '' }]);
    };

    const handleFormAdd =() =>{
        console.log("form added")
    }
    let lastValue = "";
    function onInput(e: any) {
        const currentValue = e.target.value;
        if (!currentValue.match(labels.KEY))
            e.target.value = lastValue;
        else
            lastValue = currentValue;
    }

    return (
        <div className='flex flex-col'>
            <Button
                  onClick={handleFormDuplicate}
                  type="dashed"
                  className="float-right w-fit"
                >
                  {/* <PlusSquareOutlined /> */}
                  <span>add</span>
                </Button>
            {formList.map((formData, index) => (
                <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    key={index}
                    className="grid grid-cols-4 gap-2 mb-2"
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
                            // value={formData.inputType}
                            style={{ width: 100 }}
                            onChange={(e) => handleInputChangee(e, index)}
                            options={[
                                { name: 'text', value: 'text', label: 'text' },
                                { name: 'select', value: 'select', label: 'select' },
                                { name: 'checkbox', value: 'checkbox', label: 'checkbox' },
                                { name: 'date', value: 'date', label: 'date' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                        <Button onClick={handleFormAdd} type="default">
                            Add
                        </Button>
                    </Form.Item>
                </Form>
            ))}
        </div>
    )
}

export default Attributes