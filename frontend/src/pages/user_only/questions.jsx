import CSRFToken from "../../components/CSRFToken";
import Cart from '../../icons/cart.png';
import { Navigate } from 'react-router-dom';
import { preferences } from '../../actions/auth';
import { useForm } from 'react-hook-form'; // Questions is, guess what, another form!!
import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { InputNumber } from 'antd';
import Stack from '@mui/material/Stack';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { DevTool } from "@hookform/devtools";
import { Radio } from 'antd';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import Container from '@mui/material/Container';
import { Form, Select, Slider, Rate, Modal, Tooltip } from 'antd';
import { Button } from 'antd';
import { Divider } from 'antd';
import { Col, Row } from 'antd';
import { FormItem } from 'react-hook-form-antd';
import { Space } from 'antd';
import { Dropdown } from 'antd';

const { Option } = Select;

const questions = {
    age: "What is your age?", // Text input, min 18 years old.
    dietary_pref: { // All yes/no questions.
        veg: "Are you a vegetarian?",
        vegan: "Are you a vegan?",
        gluten: "Do you follow a gluten-free diet?",
        pesc: "Are you a pescatarian?",
        aller: "Do you have any allergies?"
    },
    financial: "What is your estimated monthly spending on everyday expenses?",
    lifestyle: {
        transport: "What are you preferred methods of transportation?", // Dropdown
        energy: "Describe your household's energy source.", // Solar, grid, limited.
        waste: "How do you manage waste in your household?", // Do you recycle, compost, or trash
        water: "On average, how long do you shower for in minutes?", // under 2 minute showers, 5 minute showers, or more than 5 minute showers 
        house: "How many people live in your household?" // Text input between 1 and 10.
    },
    engagement: {
        time: "How much time are you willing to commit to tasks per week?", // Probably in hours/week
        enjoy: "On a scale of 1 to 5, how much do you enjoy a challenge?", // Show labels for each value in the slider, 1 = least likely, 3 = neutral, 5 = most likely
        comm: "On a scale of 1 to 5, how important is community involvment to you?",
        impact: "On a scale of 1 to 5, how important is making an impact to you?",
        learn: "On a scale of 1 to 5, how important is learning new things to you?"
    }
};

const QuestionsSchema = Yup.object().shape({
    // Personal Info
    age: Yup
        .number()
        .required("Required.")
        .integer(),

    // Dietary Restrictions
    isVegetarian: Yup
        .bool()
        .required("Required."),
    isVegan: Yup
        .bool()
        .required("Required."),
    isGluten: Yup
        .bool()
        .required("Required."),
    isPesc: Yup
        .bool()
        .required("Required."),
    allergies: Yup
        .array()
        .required("Required."),

    // Financial Considerations
    money: Yup
        .number()
        .required("Required."),

    // Lifestyle
    transport: Yup
        .array()
        .required("Required."),
    energy: Yup
        .array()
        .required("Required."),
    waste: Yup
        .array()
        .required("Required."),
    water: Yup
        .number()
        .integer()
        .required("Required."),
    house: Yup
        .number()
        .integer()
        .min(1)
        .required("Required."),

    // Engagement
    time: Yup
        .string()
        .required("Required."),
    enjoy: Yup
        .number()
        .required("Required."),
    comm: Yup
        .number()
        .required("Required."),
    impact: Yup
        .number()
        .required("Required."),
    learn: Yup
        .number()
        .required("Required.")

});

const allergens = [
    { key: '1', label: 'None' },
    { key: '2', label: 'Other' },
    { key: '3', label: 'Peanuts' },
    { key: '4', label: 'Tree Nuts' },
    { key: '5', label: 'Milk' },
    { key: '6', label: 'Eggs' },
    { key: '7', label: 'Fish' },
    { key: '8', label: 'Shellfish' },
    { key: '9', label: 'Wheat' },
    { key: '10', label: 'Soy' },
    { key: '11', label: 'Sesame' },
    { key: '12', label: 'Pollen' }
];

const transport = [
    { key: '1', label: 'Walking' },
    { key: '2', label: 'Bicycling' },
    { key: '3', label: 'Car' },
    { key: '4', label: 'Motorcycle' },
    { key: '5', label: 'Bus' },
    { key: '6', label: 'Subway' },
    { key: '7', label: 'Train' },
    { key: '8', label: 'Tram' },
    { key: '9', label: 'Ferry' },
    { key: '10', label: 'Airplane' },
    { key: '11', label: 'Helicopter' },
    { key: '12', label: 'Electric scooter' },
    { key: '13', label: 'Skateboarding' },
    { key: '14', label: 'Rollerblading' },
];

const waste = [
    { key: 1, label: 'Recycle' },
    { key: 2, label: 'Compost' },
    { key: 3, label: 'Trash' },
    { key: 4, label: 'None' },
]

const householdEnergySources = [
    { key: 1, label: 'Electricity' },
    { key: 2, label: 'Natural Gas' },
    { key: 3, label: 'Solar Power' },
    { key: 4, label: 'Wind Power' },
    { key: 5, label: 'Hydroelectric Power' },
    { key: 6, label: 'Biomass' },
    { key: 7, label: 'Coal' },
    { key: 8, label: 'Propane' },
    { key: 9, label: 'Geothermal' },
    { key: 10, label: 'None' } // Option for households without active energy services
];

export default function Questions() {

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 4;

    const next = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
        resolver: yupResolver(QuestionsSchema),
        initialValues: { age: 18 }
    });


    const onSubmit = (data) => {
        console.log(data);
        preferences(data['age'], data['isVegetarian'], data['isVegan'], data['isGluten'], data['isPesc'], data['allergies'], data['money'], data['transport'], data['energy'], data['waste'], data['house'], data['time'], data['enjoy'], data['comm'], data['impact'], data['learn']);
    };

    const onChange = (value) => {
        console.log(value);
    }

    // Modal for confirmation.
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Are you sure you want to submit?');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('Processing your answers.');
        setConfirmLoading(true);
        setTimeout(() => {
            setModalText('Sending your answers to the database.')
        }, 2000);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 3000);
        setSuccess(true);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    const [sentToDatabase, setSentToDatabase] = useState(false);

    if(sentToDatabase){
        return <Navigate to="/home" replace = {true}/>;
    }

    return (
        <>
            <Form
                labelCol={{
                    span: 4
                }}
                wrapperCol={{
                    span: 14
                }}
                layout="horizontal"
                onFinish={handleSubmit(onSubmit)}>
                {/*First Section*/}
                {currentStep === 0 && (
                    <Row type="flex" justify="center" align="middle" style={{ minHeight: '50vh' }}>
                        <div className="questions-box">
                            <h1 className="text-center">Personal Information</h1>
                            <Divider />
                            <Space>
                                <h3 style={{ marginLeft: '20px' }}>{questions.age}</h3>
                                <FormItem style={{ marginLeft: '300px', marginBottom: '5px' }} control={control} name="age">
                                    <InputNumber
                                        min={18}
                                        max={119}
                                        keyboard
                                        changeOnWheel
                                    />
                                </FormItem>
                            </Space>
                        </div>
                    </Row>)
                }

                {/*Second Section*/}
                {currentStep === 1 && /*TODO: center elements*/(
                    <Row type="flex" justify="center" align="middle" style={{ minHeight: '80vh' }}>
                        <div className="questions-box">
                            <h1 className="text-center">Dietary Restrictions</h1>
                            <Divider />

                            <Tooltip title="Eats plants, avoids animal products except for eggs and milk.">
                                <h3 style={{ marginLeft: '20px' }}>{questions.dietary_pref.veg}</h3>
                            </Tooltip>
                            <FormItem control={control} name="isVegetarian">
                                <Radio.Group style={{ width: '100%', marginLeft: '200px', position: "absolute", top: '-40px' }}>
                                    <Space direction="horizontal" style={{ width: '100%', justifyContent: 'right' }}>
                                        <Radio value={true}><span className="radio-inpt">Yes</span></Radio>
                                        <Radio value={false}><span className="radio-inpt">No</span></Radio>
                                    </Space>
                                </Radio.Group>
                            </FormItem>

                            <div>
                                <Tooltip title="Avoids all animal-based products ex. eggs, milk.">
                                    <h3 style={{ marginLeft: '20px' }}>{questions.dietary_pref.vegan}</h3>
                                </Tooltip>
                                <FormItem control={control} name="isVegan">
                                    <Radio.Group style={{ width: '100%', marginLeft: '200px', position: "absolute", top: '-40px' }}>
                                        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'right' }}>
                                            <Radio value={true}><span className="radio-inpt">Yes</span></Radio>
                                            <Radio value={false}><span className="radio-inpt">No</span></Radio>
                                        </Space>
                                    </Radio.Group>
                                </FormItem>
                            </div>

                            <div>
                                <Tooltip title="Avoids wheat and related grains.">
                                    <h3 style={{ marginLeft: '20px' }}>{questions.dietary_pref.gluten}</h3>
                                </Tooltip>

                                <FormItem control={control} name="isGluten">
                                    <Radio.Group style={{ width: '100%', marginLeft: '200px', position: "absolute", top: '-40px' }}>
                                        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'right' }}>
                                            <Radio value={true}><span className="radio-inpt">Yes</span></Radio>
                                            <Radio value={false}><span className="radio-inpt">No</span></Radio>
                                        </Space>
                                    </Radio.Group>
                                </FormItem>
                            </div>

                            <div>
                                <Tooltip title="Eats only fish, but can consume milk, eggs.">
                                    <h3 style={{ marginLeft: '20px' }}>{questions.dietary_pref.pesc}</h3>
                                </Tooltip>

                                <FormItem control={control} name="isPesc">
                                    <Radio.Group style={{ width: '100%', marginLeft: '200px', position: "absolute", top: '-40px' }}>
                                        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'right' }}>
                                            <Radio value={true}><span className="radio-inpt">Yes</span></Radio>
                                            <Radio value={false}><span className="radio-inpt">No</span></Radio>
                                        </Space>
                                    </Radio.Group>
                                </FormItem>

                            </div>

                            <div>
                                <Divider />
                                <h3 className="text-center">{questions.dietary_pref.aller}</h3>
                                <FormItem style={{ marginLeft: '170px' }} control={control} name="allergies">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        defaultValue={[]}>
                                        {allergens.map(allergen => (
                                            <Option key={allergen.key} value={allergen.label}>
                                                {allergen.label}
                                            </Option>
                                        ))}

                                    </Select>
                                </FormItem>

                            </div>
                        </div>
                    </Row>
                )
                }

                {/*Third Section*/}
                {currentStep === 2 && (
                    <Row type="flex" justify="center" align="middle" style={{ minHeight: '50vh' }}>
                        <div className="questions-box">
                            <h1 className="text-center">Financial Information</h1>
                            <Divider />
                            <div>
                                <h3 className="text-center">{questions.financial}</h3>
                                <FormItem control={control} name="money">
                                    <InputNumber
                                        min={0}
                                        max={10000}
                                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChange}
                                        style={{ width: '35%' }}
                                        changeOnWheel
                                    />
                                </FormItem>
                            </div>

                        </div>
                    </Row>
                )
                }

                {/*Fourth Section*/}
                {currentStep === 3 && (
                    <Row type="flex" justify="center" align="middle" style={{ minHeight: '85vh' }}>
                        <div className="questions-box">
                            <h1 className="text-center">Lifestyle</h1>
                            <Divider />
                            <div>
                                <h3 className="text-center">{questions.lifestyle.transport}</h3>
                                <FormItem control={control} name="transport">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        defaultValue={[]}>
                                        {transport.map(allergen => (
                                            <Option key={allergen.key} value={allergen.label}>
                                                {allergen.label}
                                            </Option>
                                        ))}

                                    </Select>
                                </FormItem>
                            </div>
                            <div>
                                <h3 className="text-center">{questions.lifestyle.energy}</h3>
                                <FormItem control={control} name="energy">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        defaultValue={[]}>
                                        {householdEnergySources.map(allergen => (
                                            <Option key={allergen.key} value={allergen.label}>
                                                {allergen.label}
                                            </Option>
                                        ))}

                                    </Select>
                                </FormItem>
                            </div>
                            <div>
                                <h3 className="text-center">{questions.lifestyle.waste}</h3>
                                <FormItem control={control} name="waste">
                                    <Select
                                        mode="multiple"
                                        style={{ width: '100%' }}
                                        defaultValue={[]}>
                                        {waste.map(allergen => (
                                            <Option key={allergen.key} value={allergen.label}>
                                                {allergen.label}
                                            </Option>
                                        ))}

                                    </Select>
                                </FormItem>
                            </div>
                            <div>
                                <h3 className="text-center">{questions.lifestyle.water}</h3>
                                <FormItem control={control} name="water">
                                    <Slider min={0} max={5} marks={{ 0: '0', 2: '2', 5: '5' }} />
                                </FormItem>
                            </div>
                            <div>
                                <h3 className="text-center">{questions.lifestyle.house}</h3>
                                <FormItem control={control} name="house">
                                    <Slider min={1} max={10} marks={{ 1: '1', 5: '5', 10: '10' }} />
                                </FormItem>
                            </div>
                        </div>
                    </Row>
                )
                }

                {/*Fifth Section*/}
                {currentStep === 4 && (
                    <Row type="flex" justify="center" align="middle" style={{ minHeight: '65vh' }}>
                        <div className="questions-box">
                            <h1 className="text-center">Engagement</h1>
                            <Divider />
                            <div>
                                <h3>{questions.engagement.time}</h3>
                                <FormItem control={control} name="time">
                                    <Select>
                                        <Option value="1-3 hours">
                                            1-3 hours
                                        </Option>
                                        <Option value="4-6 hours">
                                            4-6 hours
                                        </Option>
                                        <Option value="7-10 hours">
                                            7-10 hours
                                        </Option>
                                        <Option value=">10 hours">
                                            More than 10 hours
                                        </Option>
                                    </Select>
                                </FormItem>
                            </div>
                            <div>
                                <h3>{questions.engagement.enjoy}</h3>
                                <FormItem control={control} name="enjoy">
                                    <Rate style={{ color: "green" }} defaultValue={3} character={({ index = 0 }) => index + 1} />
                                </FormItem>
                            </div>
                            <div>
                                <h3>{questions.engagement.comm}</h3>
                                <FormItem control={control} name="comm">
                                    <Rate style={{ color: "green" }} defaultValue={3} character={({ index = 0 }) => index + 1} />
                                </FormItem>
                            </div>
                            <div>
                                <h3>{questions.engagement.impact}</h3>
                                <FormItem control={control} name="impact">
                                    <Rate style={{ color: "green" }} defaultValue={3} character={({ index = 0 }) => index + 1} />
                                </FormItem>
                            </div>
                            <div>
                                <h3>{questions.engagement.learn}</h3>
                                <FormItem control={control} name="learn">
                                    <Rate style={{ color: "green" }} defaultValue={3} character={({ index = 0 }) => index + 1} />
                                </FormItem>
                            </div>
                        </div>
                    </Row>
                )
                }


                {currentStep === totalSteps && (
                    <>
                    <Button type="primary" htmlType="submit" onClick={showModal} className="button">Submit</Button>
                        <Form.Item>
                            <Modal
                            title="Confirmation"
                            open={open}
                            onOk={handleOk}
                            confirmLoading={confirmLoading}
                            onCancel={handleCancel}
                            okButtonProps={{
                                style: {backgroundColor: '#85E458', color: 'black'},
                                htmlType: 'submit'

                            }}
                         >
                            <p>{modalText}</p>
                        </Modal>
                        </Form.Item>
                    </>
                )}

                {/*Next and Previous buttons*/}
                <Stack direction="row" spacing={40} align='center'>
                    {console.log(currentStep)}
                    {currentStep > 0 && <Button type="primary" className="navigation-button" onClick={prev}>Back</Button>}
                    {currentStep < totalSteps && <Button type="primary" className="navigation-button" onClick={next}>Next</Button>}
                </Stack>
            </Form>
            <DevTool control={control} />
        </>
    )
};