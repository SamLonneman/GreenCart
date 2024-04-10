import CSRFToken from "../../components/CSRFToken";
import Cart from '../../icons/cart.png';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Questions is, guess what, another form!!
import React from 'react';
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';


const questions = {
    personal_info: "What is your age?", // Text input, min 18 years old.
    dietary_pref: { // All yes/no questions.
        veg: "Are you a vegetarian?",
        be: "Are you a vegan?",
        third: "Do you follow a gluten-free diet?",
        fourth: "Are you a pescatarian?"
    },
    allergies: "What allergies do you have?", // Drop down with maybe text fill in the blank for other.
    financial: "How much do you currently spend on groceries/day to day life per month?",
    lifestyle: {
        first: "What are you preferred methods of transportation?", // Dropdown
        second: "Describe your household's energy source.", // Solar, grid, limited.
        third: "How do you manage waste in your household?", // Do you recycle, compost, or trash
        fourth: "Describe your household's water usage habits.", // under 2 minute showers, 5 minute showers, or more than 5 minute showers 
        fifth: "How many people live in your household?" // Text input between 1 and 10.
    },
    engagement: {
        first: "How much time are you willing to commit to activities or tasks per week?", // Probably in hours/week, or days/week, or N times/week
        second: "On a scale of 1 to 5, how much do you enjoy a challenge?", // Show labels for each value in the slider, 1 = least likely, 3 = neutral, 5 = most likely
        third: "On a scale of 1 to 5, how important is community involvment to you?",
        fourth: "On a scale of 1 to 5, how important is making an impact to you?",
        fifth: "On a scale of 1 to 5, how important is learning new things to you?"
    }
};

const QuestionsSchema = Yup.object().shape({
    age: Yup
        .number()
        .required()
        .min(18)
        .max(119)

})

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  }));

const Questions = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setValue
    } = useForm({
        mode: "all",
        resolver: yupResolver(QuestionsSchema),        
        defaultValues: { allergies: [] }
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

    return (
        <React.Fragment>
            <Container maxWidth="lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Age */}
                    <label>{questions.personal_info}</label>
                    <div className="mb-5">
                        <input
                            {...register("age")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full max-w-xs" />
                    </div>
                    <Stack direction="row" spacing={25}>
                        <ColorButton variant="contained" startIcon={<ArrowLeft/>}>Back</ColorButton>
                        <ColorButton variant="contained" endIcon={<ArrowRight/>}>Next</ColorButton>
                    </Stack>
                    {/* Allergens
                    <div className="dropdown mb-15 dropdown-hover dropdown-right">
                        <label>{questions.allergies}</label>
                        <div tabIndex={0} role="button" className="btn m-1">Allergies</div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><input
                                {...register("allergies")}
                                type="checkbox"
                                name="allergies"
                                className="btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="None"
                                value="none"
                            /></li>
                            <li><input
                                {...register("allergies")}
                                type="checkbox"
                                name="allergies"
                                className="btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Fish"
                                value="fish"
                            /></li>
                            <li><input
                                {...register("allergies")}
                                type="checkbox"
                                name="allergies"
                                className="btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Shellfish"
                                value="shellfish"
                            /></li>
                            <li><input
                                {...register("allergies")}
                                type="checkbox"
                                name="allergies"
                                className="btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Peanuts"
                                value="peanuts" /></li>
                            <li><input
                                {...register("allergies")}
                                type="checkbox"
                                name="allergies"
                                className="btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Soy"
                                value="soy" /></li>
                            <li><input
                                {...register("allergies")}
                                type="checkbox"
                                name="allergies"
                                className="btn btn-sm btn-block btn-ghost justify-start"
                                aria-label="Eggs"
                                value="eggs" /></li>
                        </ul>
                    </div> */}
                   
                </form>
            </Container>
        </React.Fragment>
    )
};

export default Questions;