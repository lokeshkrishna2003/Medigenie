import React, { useState } from 'react';
import DiagnosesHeading from '../Components/DiagnosesHeading';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const DropdownForm = () => {
    const jwt = sessionStorage.getItem('jwt');
    const navigate = useNavigate();
    const navigateToLogin = () => {
        navigate('/login');
    };

    //common states
    const [prob, setprob] = useState("");
    const [probColour, setProbColour] = useState("ml-[10px] text-[#07f79f]");
    const [visibility, setVisibility] = useState("font-bold text-[30px] hidden ");
    const [selectedOption, setSelectedOption] = useState('Covid 19');
    const handleDropdownChange = (event) => {
        setVisibility("font-bold text-[30px] hidden");
        setSelectedOption(event.target.value);
    };
    //probability text colour
    useEffect(() => {
        if (parseFloat(prob) >= 0.75) {
            setProbColour("ml-[10px]  text-[#f70733]")
        } else if (parseFloat(prob) < 0.75 && parseFloat(prob) > 0.3) {
            setProbColour("ml-[10px] text-[#f7db07]")
        } else {
            setProbColour("ml-[10px] text-[#07f79f]")
        }
    }, [prob]);



    //diabetes states and request
    const [diabetesFormData, setDiabetesFormData] = useState({
        pregnancies: '',
        glucose: '',
        bloodPressure: '',
        skinThickness: '',
        insulin: '',
        bmi: '',
        diabetesPedigreeFunction: '',
        age: '',
    });

    const handleDiabetesInputChange = (event, fieldName) => {
        setDiabetesFormData({
            ...diabetesFormData,
            [fieldName]: event.target.value,
        });
        setVisibility("font-bold text-[30px] hidden");
    };

    const handleDiabetesFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const response = await fetch(`http://127.0.0.1:5000/diagnose_Diabetes`, {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "Pregnancies": parseFloat(diabetesFormData.pregnancies),
                        "Glucose": parseFloat(diabetesFormData.glucose),
                        "BloodPressure": parseFloat(diabetesFormData.bloodPressure),
                        "SkinThickness": parseFloat(diabetesFormData.skinThickness),
                        "Insulin": parseFloat(diabetesFormData.insulin),
                        "BMI": parseFloat(diabetesFormData.bmi),
                        "DiabetesPedigreeFunction": parseFloat(diabetesFormData.diabetesPedigreeFunction),
                        "Age": parseFloat(diabetesFormData.age)
                    }),
                })
                const data = await response.json();

                if (data.status === 'success') {

                    setVisibility("font-bold text-[30px] flex");
                    setprob(data.probability);

                    setDiabetesFormData({
                        pregnancies: '',
                        glucose: '',
                        bloodPressure: '',
                        skinThickness: '',
                        insulin: '',
                        bmi: '',
                        diabetesPedigreeFunction: '',
                        age: '',
                    });
                }
                if (data.status === 'failed') {
                    console.log("The status code :", data.status)
                    console.log("diagnose failed");
                }



            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);

            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")

        }

    }



    //Thyroid states and request

    const [thyroidFormData, setThyroidFormData] = useState({
        age: '',
        on_thyroxine: '',
        query_on_thyroxine: '',
        on_antithyroid_medication: '',
        pregnant: '',
        thyroid_surgery: '',
        tumor: '',
        T3: '',
        TT4: '',
        T4U: '',
        FTI: '',
    });

    const handleThyroidInputChange = (event, fieldName) => {
        setThyroidFormData({
            ...thyroidFormData,
            [fieldName]: event.target.value,
        });
        setVisibility("font-bold text-[30px] hidden");
    };

    const handleThyroidFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const response = await fetch(`http://127.0.0.1:5000/diagnose_Thyroid`, {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "age": parseFloat(thyroidFormData.age),
                        "on thyroxine": parseFloat(thyroidFormData.on_thyroxine),
                        "query on thyroxine": parseFloat(thyroidFormData.query_on_thyroxine),
                        "on antithyroid medication": parseFloat(thyroidFormData.on_antithyroid_medication),
                        "pregnant": parseFloat(thyroidFormData.pregnant),
                        "thyroid surgery": parseFloat(thyroidFormData.thyroid_surgery),
                        "tumor": parseFloat(thyroidFormData.tumor),
                        "T3": parseFloat(thyroidFormData.T3),
                        "TT4": parseFloat(thyroidFormData.TT4),
                        "T4U": parseFloat(thyroidFormData.T4U),
                        "FTI": parseFloat(thyroidFormData.FTI)
                    }),
                })
                const data = await response.json();

                if (data.status === 'success') {

                    setVisibility("font-bold text-[30px] flex");
                    setprob(data.probability);

                    setThyroidFormData({
                        age: '',
                        on_thyroxine: '',
                        query_on_thyroxine: '',
                        on_antithyroid_medication: '',
                        pregnant: '',
                        thyroid_surgery: '',
                        tumor: '',
                        T3: '',
                        TT4: '',
                        T4U: '',
                        FTI: '',
                    });
                }
                if (data.status === 'failed') {
                    console.log("The status code :", data.status)
                    console.log("diagnose failed");
                }


            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);

            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")

        }

    }


    //pneumonia states and request
    const [pneumoniaImage, setPneumoniaImage] = useState('');
    const handlePneumoniaInputChange = (e) => {
        setPneumoniaImage(e.target.files[0]);
        setVisibility("font-bold text-[30px] hidden");
    }

    const handlePneumoniaFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('image', pneumoniaImage);

                const response = await fetch('http://127.0.0.1:5000/diagnose_Pneumonia', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                const data = await response.json();
                // console.log(data)
                if (data.status === 'success') {
                    setVisibility("font-bold text-[30px] flex");
                    setprob(data.probability);
                    setPneumoniaImage('');
                } else if (data.status === 'failed') {
                    console.log("The status code:", data.status);
                    console.log("diagnose failed");
                }

            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")

        }

    };
    // Covid states and request
    const [covidImage, setCovidImage] = useState('');
    const handleCovidInputChange = (e) => {
        setCovidImage(e.target.files[0]);
        setVisibility("font-bold text-[30px] hidden");
    }

    const handleCovidFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const formData = new FormData();
                formData.append('image', covidImage);

                const response = await fetch('http://127.0.0.1:5000/diagnose_Covid', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                const data = await response.json();
                console.log(data)
                if (data.status === 'success') {
                    setVisibility("font-bold text-[30px] flex");
                    setprob(data.probability);
                    setCovidImage('');
                } else if (data.status === 'failed') {
                    console.log("The status code:", data.status);
                    console.log("diagnose failed");
                }

            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);
            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")

        }

    }


    //Breast Cancer states and request
    const [breastCancerFormData, setBreastCancerFormData] = useState({
        radius_mean: '',
        texture_mean: '',
        perimeter_mean: '',
        area_mean: '',
        smoothness_mean: '',
        compactness_mean: '',
        concavity_mean: '',
        concave_points_mean: '',
        radius_worst: '',
        texture_worst: '',
        perimeter_worst: '',
        area_worst: '',
        smoothness_worst: '',
        compactness_worst: '',
        concavity_worst: '',
        concave_points_worst: '',
        symmetry_worst: '',
        fractal_dimension_worst: '',
    });

    const handleBreastCancerInputChange = (e, fieldName) => {
        setBreastCancerFormData({
            ...breastCancerFormData,
            [fieldName]: e.target.value,
        });
        setVisibility("font-bold text-[30px] hidden");
    };

    const handleBreastCancerFormChange = async (e) => {
        if (jwt) {
            e.preventDefault();
            try {
                const response = await fetch(`http://127.0.0.1:5000/diagnose_Breast_Cancer`, {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "radius_mean": parseFloat(breastCancerFormData.radius_mean),
                        "texture_mean": parseFloat(breastCancerFormData.texture_mean),
                        "perimeter_mean": parseFloat(breastCancerFormData.perimeter_mean),
                        "area_mean": parseFloat(breastCancerFormData.area_mean),
                        "smoothness_mean": parseFloat(breastCancerFormData.smoothness_mean),
                        "compactness_mean": parseFloat(breastCancerFormData.compactness_mean),
                        "concavity_mean": parseFloat(breastCancerFormData.concavity_mean),
                        "concave_points_mean": parseFloat(breastCancerFormData.concave_points_mean),
                        "radius_worst": parseFloat(breastCancerFormData.radius_worst),
                        "texture_worst": parseFloat(breastCancerFormData.texture_worst),
                        "perimeter_worst": parseFloat(breastCancerFormData.perimeter_worst),
                        "area_worst": parseFloat(breastCancerFormData.area_worst),
                        "smoothness_worst": parseFloat(breastCancerFormData.smoothness_worst),
                        "compactness_worst": parseFloat(breastCancerFormData.compactness_worst),
                        "concavity_worst": parseFloat(breastCancerFormData.concavity_worst),
                        "concave_points_worst": parseFloat(breastCancerFormData.concave_points_worst),
                        "symmetry_worst": parseFloat(breastCancerFormData.symmetry_worst),
                        "fractal_dimension_worst": parseFloat(breastCancerFormData.fractal_dimension_worst)
                    }),
                })
                const data = await response.json();

                if (data.status === 'success') {

                    setVisibility("font-bold text-[30px] flex");
                    setprob(data.probability);

                    setBreastCancerFormData({
                        radius_mean: '',
                        texture_mean: '',
                        perimeter_mean: '',
                        area_mean: '',
                        smoothness_mean: '',
                        compactness_mean: '',
                        concavity_mean: '',
                        concave_points_mean: '',
                        radius_worst: '',
                        texture_worst: '',
                        perimeter_worst: '',
                        area_worst: '',
                        smoothness_worst: '',
                        compactness_worst: '',
                        concavity_worst: '',
                        concave_points_worst: '',
                        symmetry_worst: '',
                        fractal_dimension_worst: '',
                    });
                }
                if (data.status === 'failed') {
                    console.log("The status code :", data.status)
                    console.log("diagnose failed");
                }


            } catch (err) {
                console.error(`Error diagnosing the user`, err.message);

            }
        } else {
            navigateToLogin();
            toast.error("Please login to use all the functions!!")

        }

    }







    const renderForm = () => {
        switch (selectedOption) {
            case 'Covid 19':
                return (
                    <div>
                        <form >
                            <div>
                                <input
                                    type="file"
                                    className="w-[420px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    onChange={handleCovidInputChange}
                                />

                            </div>
                            <button className="mx-[auto] w-[150px] h-[40px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px]" type='submit' onClick={handleCovidFormChange}>Diagnose Me</button>
                        </form>
                        <div>
                            <h3 className={visibility}>
                                The probability of you having Covid-19 is  <span className={probColour}>{prob}</span>!!
                            </h3>
                        </div>
                    </div>
                );


            case 'BreastCancer':
                return (
                    <div>
                        <form >
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='radius mean'
                                        value={breastCancerFormData.radius_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'radius_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='texture mean'
                                        value={breastCancerFormData.texture_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'texture_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='perimeter mean'
                                        value={breastCancerFormData.perimeter_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'perimeter_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='area mean'
                                        value={breastCancerFormData.area_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'area_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='smoothness mean'
                                        value={breastCancerFormData.smoothness_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'smoothness_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='compactness mean'
                                        value={breastCancerFormData.compactness_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'compactness_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='concavity mean'
                                        value={breastCancerFormData.concavity_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'concavity_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='concave points mean'
                                        value={breastCancerFormData.concave_points_mean}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'concave_points_mean')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='radius worst'
                                        value={breastCancerFormData.radius_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'radius_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='texture worst'
                                        value={breastCancerFormData.texture_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'texture_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='perimeter worst'
                                        value={breastCancerFormData.perimeter_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'perimeter_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='area worst'
                                        value={breastCancerFormData.area_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'area_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='smoothness worst'
                                        value={breastCancerFormData.smoothness_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'smoothness_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='compactness worst'
                                        value={breastCancerFormData.compactness_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'compactness_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='concavity worst'
                                        value={breastCancerFormData.concavity_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'concavity_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='concave points worst'
                                        value={breastCancerFormData.concave_points_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'concave_points_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='symmetry worst'
                                        value={breastCancerFormData.symmetry_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'symmetry_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='fractal dimension worst'
                                        value={breastCancerFormData.fractal_dimension_worst}
                                        onChange={(e) => handleBreastCancerInputChange(e, 'fractal_dimension_worst')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>


                            </div>
                            <button className="mx-[auto] w-[150px] h-[40px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px]" type='submit' onClick={handleBreastCancerFormChange}>Diagnose Me</button>
                        </form>
                        <div>
                            <h3 className={visibility}>
                                The probability of you having Breast Cancer is  <span className={probColour}>{prob}</span>!!
                            </h3>
                        </div>
                    </div>
                );

            case 'Thyroid':
                return (
                    <div>
                        <form >
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='age'
                                        value={thyroidFormData.age}
                                        onChange={(e) => handleThyroidInputChange(e, 'age')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type='number'
                                        min='0'
                                        max='1'
                                        placeholder='on thyroxine'
                                        value={thyroidFormData.on_thyroxine}
                                        onChange={(e) => handleThyroidInputChange(e, 'on_thyroxine')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type='number'
                                        min='0'
                                        max='1'
                                        placeholder='query on thyroxine'
                                        value={thyroidFormData.query_on_thyroxine}
                                        onChange={(e) => handleThyroidInputChange(e, 'query_on_thyroxine')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type='number'
                                        min='0'
                                        max='1'
                                        placeholder='on antithyroid medication'
                                        value={thyroidFormData.on_antithyroid_medication}
                                        onChange={(e) => handleThyroidInputChange(e, 'on_antithyroid_medication')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type='number'
                                        min='0'
                                        max='1'
                                        placeholder='pregnant'
                                        value={thyroidFormData.pregnant}
                                        onChange={(e) => handleThyroidInputChange(e, 'pregnant')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type='number'
                                        min='0'
                                        max='1'
                                        placeholder='thyroid surgery '
                                        value={thyroidFormData.thyroid_surgery}
                                        onChange={(e) => handleThyroidInputChange(e, 'thyroid_surgery')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>

                                    <input
                                        type='number'
                                        min='0'
                                        max='1'
                                        placeholder='tumor'
                                        value={thyroidFormData.tumor}
                                        onChange={(e) => handleThyroidInputChange(e, 'tumor')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='T3'
                                        value={thyroidFormData.T3}
                                        onChange={(e) => handleThyroidInputChange(e, 'T3')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>

                                <div>
                                    <input
                                        type="text"
                                        placeholder='TT4'
                                        value={thyroidFormData.TT4}
                                        onChange={(e) => handleThyroidInputChange(e, 'TT4')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    /><input
                                        type="text"
                                        placeholder='T4U'
                                        value={thyroidFormData.T4U}
                                        onChange={(e) => handleThyroidInputChange(e, 'T4U')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='FTI'
                                        value={thyroidFormData.FTI}
                                        onChange={(e) => handleThyroidInputChange(e, 'FTI')}
                                        className="w-[420px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                            </div>
                            <button className="mx-[auto] w-[150px] h-[40px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px]" type='submit' onClick={handleThyroidFormChange}>Diagnose Me</button>
                        </form>
                        <div>
                            <h3 className={visibility}>
                                The probability of you having Thyroid is  <span className={probColour}>{prob}</span>!!
                            </h3>
                        </div>
                    </div>
                );



            case 'Pneumonia':
                return (
                    <div>
                        <form >
                            <div>
                                <input
                                    type="file"
                                    className="w-[420px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    onChange={handlePneumoniaInputChange}
                                />

                            </div>
                            <button className="mx-[auto] w-[150px] h-[40px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px]" type='submit' onClick={handlePneumoniaFormChange}>Diagnose Me</button>
                        </form>
                        <div>
                            <h3 className={visibility}>
                                The probability of you having Pneumonia is  <span className={probColour}>{prob}</span>!!
                            </h3>
                        </div>
                    </div>
                );


            case 'Diabetes':
                return (
                    <div>
                        <form>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='Pregnancies'
                                        value={diabetesFormData.pregnancies}
                                        onChange={(e) => handleDiabetesInputChange(e, 'pregnancies')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='Glucose'
                                        value={diabetesFormData.glucose}
                                        onChange={(e) => handleDiabetesInputChange(e, 'glucose')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='BloodPressure'
                                        value={diabetesFormData.bloodPressure}
                                        onChange={(e) => handleDiabetesInputChange(e, 'bloodPressure')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='SkinThickness'
                                        value={diabetesFormData.skinThickness}
                                        onChange={(e) => handleDiabetesInputChange(e, 'skinThickness')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='Insulin'
                                        value={diabetesFormData.insulin}
                                        onChange={(e) => handleDiabetesInputChange(e, 'insulin')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='BMI'
                                        value={diabetesFormData.bmi}
                                        onChange={(e) => handleDiabetesInputChange(e, 'bmi')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder='DiabetesPedigreeFunction'
                                        value={diabetesFormData.diabetesPedigreeFunction}
                                        onChange={(e) => handleDiabetesInputChange(e, 'diabetesPedigreeFunction')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                    <input
                                        type="text"
                                        placeholder='Age'
                                        value={diabetesFormData.age}
                                        onChange={(e) => handleDiabetesInputChange(e, 'age')}
                                        className="w-[200px]  m-[10px] h-[50px] rounded-xl my-[10px] border-[1px] border-[#979797] p-[10px]"
                                    />
                                </div>
                            </div>
                            <button className="mx-[auto] w-[150px] h-[40px] bg-[#18A0A9] text-[#FFFFFF] font-medium rounded-xl my-[10px]" type='submit' onClick={handleDiabetesFormChange}>Diagnose Me</button>
                        </form>
                        <div>
                            <h3 className={visibility}>
                                The probability of you having Diabetes is  <span className={probColour}>{prob}</span>!!
                            </h3>
                        </div>
                    </div>
                );


            default:
                return null;
        }
    };

    return (
        <section className="py-[100px]">
            <div className='text-center inline-block'>
                <DiagnosesHeading />
                <div className="text-start">
                    <select className="" onChange={handleDropdownChange}>
                        <option value="Covid 19">Covid 19</option>
                        <option value="BreastCancer">Breast Cancer</option>
                        <option value="Thyroid">Thyroid</option>
                        <option value="Pneumonia">Pneumonia</option>
                        <option value="Diabetes">Diabetes</option>

                    </select>
                </div>
                <div className='text-center shadow-lg  px-[35px] py-[20px] rounded-lg w-[800px] '>
                    <div className="py-[10px]">
                        {renderForm()}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DropdownForm;
