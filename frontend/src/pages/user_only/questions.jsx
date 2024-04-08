import CSRFToken from "../../components/CSRFToken";
import Cart from '../../icons/cart.png';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'; // Questions is, guess what, another form!!
import React from 'react';


const questions = {
    first: "Are you currently experiencing economic crisis?"
};

const Questions = () => {

    const{
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const onSubmit = data => {
        console.log(data);
    };
    

    return(
        <div className="center">
            <div className="center">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>{questions.first}</label>
                    <div className="radio-buttons-flex">
                    <input
                        {...register("q1")}
                        type="radio"
                        value="yes"
                        id="field-yes" 
                    />
                    <label htmlFor="field-yes">Yes</label>
                    <input
                        {...register("q1")}
                        type="radio"
                        value="no"
                        id="field-no" 
                    />
                    <label htmlFor="field-no">No</label>
                    </div>
                    <button type="submit" className="custom-text btn button">Done</button>
                </form>
            </div>
        </div>
    )
};

export default Questions;