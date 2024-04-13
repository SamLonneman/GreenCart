import CSRFToken from "../../components/CSRFToken";
import Cart from '../../icons/cart.png';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Questions is, guess what, another form!!
import React, { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { InputNumber } from 'antd';
import Stack from '@mui/material/Stack';
import ArrowRight from '@mui/icons-material/ArrowRight';
import { Radio } from 'antd';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import Container from '@mui/material/Container';
import { Form } from 'antd';
import { Button } from 'antd';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';


const questions = {
    age: "What is your age?", // Text input, min 18 years old.
    dietary_pref: { // All yes/no questions.
        veg: "Are you a vegetarian?",
        vegan: "Are you a vegan?",
        gluten: "Do you follow a gluten-free diet?",
        pesc: "Are you a pescatarian?",
        aller: "Do you have any allergies?"
    },
    financial: "What is your estimated monthly spending on groceries and everyday expenses?",
    lifestyle: {
        transport: "What are you preferred methods of transportation?", // Dropdown
        energy: "Describe your household's energy source.", // Solar, grid, limited.
        waste: "How do you manage waste in your household?", // Do you recycle, compost, or trash
        water: "Describe your household's water usage habits.", // under 2 minute showers, 5 minute showers, or more than 5 minute showers 
        house: "How many people live in your household?" // Text input between 1 and 10.
    },
    engagement: {
        time: "How much time are you willing to commit to activities or tasks per week?", // Probably in hours/week
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
        .required()
        .min(18)
        .max(119)
        .integer(),

    // Dietary Restrictions
    veg: Yup
        .bool()
        .required(),
    vegan: Yup
        .bool()
        .required(),
    gluten: Yup
        .bool()
        .required(),
    pesc: Yup
        .bool()
        .required(),
    allergies: Yup
        .array()
        .required(),

    // Financial Considerations
    money: Yup
        .number()
        .required(),

    // Lifestyle
    transport: Yup
        .string()
        .required(),
    energy: Yup
        .string()
        .required(),
    waste: Yup
        .string()
        .required(),
    water: Yup
        .string()
        .required(),
    house: Yup
        .number()
        .integer()
        .min(1)
        .required(),

    // Engagement
    time: Yup
        .number()
        .required(),
    enjoy: Yup
        .number()
        .required(),
    comm: Yup
        .number()
        .required(),
    impact: Yup
        .number()
        .required(),
    learn: Yup
        .number()
        .required()

});

export default function Questions() {

    const [currentStep, setCurrentStep] = useState(0);
    const totalSteps = 4;

    const next = (data) => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }

        console.log(data);
    }

    const prev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm({
        mode: "all",
        resolver: yupResolver(QuestionsSchema)
    });

    const selectedAllergies = watch("allergies");

    React.useEffect(() => {
        if (selectedAllergies.includes("none") && selectedAllergies.length > 1) {
            // If 'none' is selected along with other options, keep only 'none'
            setValue("allergies", ["none"]);
        }
    }, [selectedAllergies, setValue]);

    const onSubmit = data => {
        console.log(data);
    };

    const onChange = (value) => {
        console.log(value);
    };

    const [val, setVal] = useState(true);
    const onRadioChange = (e) => {
        setVal(e.target.value);
    };

    const handleAgeChange = age => {
        setValue('age', age, { shouldValidate: true});
    };

    return (
        <Form onFinish={handleSubmit(onSubmit)}>
            <Container maxWidth="sm">
                {/*First Section*/}
                {currentStep === 0 && (
                    <div>
                        <h1 className="text-center">Personal Information</h1>
                        <div>
                            <label>{questions.age}</label>
                            <InputNumber
                                min={18}
                                max={119}
                                onChange={onChange}
                                changeOnWheel
                            />
                        </div>

                    </div>)
                }

                {/*Second Section*/}
                {currentStep === 1 && /*TODO: center elements*/(

                    <div>
                        <h1 className="text-center">Dietary Restrictions</h1>
                        <div>
                            <label>{questions.dietary_pref.veg}</label>
                            <Radio.Group onChange={onRadioChange}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </div>

                        <div>
                            <label>{questions.dietary_pref.vegan}</label>
                            <Radio.Group onChange={onRadioChange}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </div>

                        <div>
                            <label>{questions.dietary_pref.gluten}</label>
                            <Radio.Group onChange={onRadioChange}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </div>

                        <div>
                            <label>{questions.dietary_pref.pesc}</label>
                            <Radio.Group onChange={onRadioChange}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </div>

                        <div>
                            <label>{questions.dietary_pref.aller}</label>
                            <Radio.Group onChange={onRadioChange}>
                                <Radio value={true}>Yes</Radio>
                                <Radio value={false}>No</Radio>
                            </Radio.Group>
                        </div>
                    </div>
                )
                }

                {/*Third Section*/}
                {currentStep === 2 && (
                    <div>
                        <h1 className="text-center">Financial Information</h1>
                        <div>
                            <label>{questions.financial}</label>
                            <InputNumber
                                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                                onChange={onChange}
                            />
                        </div>

                    </div>
                )
                }

                {/*Fourth Section*/}
                {currentStep === 3 && (
                    <div>
                        <h1 className="text-center">Lifestyle</h1>
                        <div>
                            <label>{questions.lifestyle.transport}</label>
                        </div>
                        <div>
                            <label>{questions.lifestyle.energy}</label>
                        </div>
                        <div>
                            <label>{questions.lifestyle.waste}</label>
                        </div>
                        <div>
                            <label>{questions.lifestyle.water}</label>
                        </div>
                        <div>
                            <label>{questions.lifestyle.house}</label>
                        </div>
                    </div>
                )
                }

                {/*Fifth Section*/}
                {currentStep === 4 && (
                    <div>
                        <h1 className="text-center">Engagement</h1>
                        <div>
                            <label>{questions.engagement.time}</label>
                        </div>
                        <div>
                            <label>{questions.engagement.enjoy}</label>
                        </div>
                        <div>
                            <label>{questions.engagement.comm}</label>
                        </div>
                        <div>
                            <label>{questions.engagement.impact}</label>
                        </div>
                        <div>
                            <label>{questions.engagement.learn}</label>
                        </div>
                    </div>

                )
                }

                {/*Next and Previous buttons*/}
                <Stack direction="row" spacing={40} align='center'>
                    {console.log(currentStep)}
                    {currentStep > 0 && <Button type="primary" style={{ background: 'blue' }} onClick={prev} icon={<ArrowLeft />}>Back</Button>}
                    {currentStep < totalSteps && <Button type="primary" style={{ background: 'blue' }} onClick={next} icon={<ArrowRight />}>Next</Button>}
                    {currentStep === totalSteps && <Button type="primary" style={{background: 'green'}} onClick={onSubmit}>Submit</Button>}
                </Stack>
            </Container>
        </Form>
    )
};