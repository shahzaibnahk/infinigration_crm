import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClientProfile, updateClientProfile } from '../redux/actions/lead';
import Select from 'react-select';
import { styles } from '../select/styles';
import { getProgramAsOptions } from '../redux/actions/program';
import { useAlert } from '../hooks/userAlert';
import Loading from '../pages/Loading';
import moment from 'moment-timezone';

const ClientProfile = ({ id }) => {
    const dispatch = useDispatch();
    const { profile, loading, error, message } = useSelector(state => state.lead);
    const { programOptions } = useSelector(state => state.program);

    // State variables for all fields
    const [program, setProgram] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [cnic, setCnic] = useState('');
    const [age, setAge] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [travelHistory, setTravelHistory] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [passport, setPassport] = useState('');

    const alert = useAlert()
    useEffect(() => {
        dispatch(getClientProfile(id));
        dispatch(getProgramAsOptions());

        setProgram(programOptions?.find((p) => p.value.toString() === profile?.program.toString()))
        setName(profile?.name)
        setEmail(profile?.email)
        setCity(profile?.city)
        setPhone(profile?.phone)
        setCnic(profile?.cnic)
        setAge(profile?.age)
        setEducation(profile?.education || "")
        setExperience(profile?.experience || "")
        setTravelHistory(profile?.travelHistory || "")
        setAddress(profile?.address || "")
        setDob(profile?.dob || "")
        setPassport(profile?.passport || "")



    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updateClientProfile(id, name,
            email,
            city,
            phone,
            cnic,
            age,
            education,
            experience,
            travelHistory,
            address,
            dob,
            passport,
            program.value,
            moment.tz("Asia/Karachi").format()))
    };

    useEffect(() => {
        alert(message, error, `/sales/lead/${id}/activities`)
    }, [error, message])

    return (
        loading ? <Loading /> || !profile : <form onSubmit={handleSubmit} className='w-full my-[16px] flex flex-col gap-[4px]'>
            <label htmlFor="program">
                <span>Program</span>
                <Select
                    options={programOptions}
                    styles={styles}
                    placeholder='Choose Program'
                    value={program}
                    onChange={setProgram}
                />
            </label>

            <label htmlFor="name">
                <span>Name</span>
                <input
                    type="text"
                    placeholder='Enter Client Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>

            <label htmlFor="email">
                <span>Email</span>
                <input
                    type="text"
                    placeholder='Enter Client Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>

            <label htmlFor="city">
                <span>City</span>
                <input
                    type="text"
                    placeholder='Enter Client City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </label>

            <label htmlFor="phone">
                <span>Phone</span>
                <input
                    type="text"
                    placeholder='Enter Client Phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </label>

            <label htmlFor="cnic">
                <span>CNIC</span>
                <input
                    type="text"
                    placeholder='Enter Client CNIC'
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                />
            </label>

            <label htmlFor="age">
                <span>Age</span>
                <input
                    type="text"
                    placeholder='Enter Client Age'
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </label>

            <label htmlFor="education">
                <span>Education</span>
                <input
                    type="text"
                    placeholder='Enter Client Education'
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                />
            </label>

            <label htmlFor="experience">
                <span>Experience</span>
                <input
                    type="text"
                    placeholder='Enter Client Experience'
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                />
            </label>

            <label htmlFor="travelHistory">
                <span>Travel History</span>
                <input
                    type="text"
                    placeholder='Enter Client Travel History'
                    value={travelHistory}
                    onChange={(e) => setTravelHistory(e.target.value)}
                />
            </label>

            <label htmlFor="address">
                <span>Address</span>
                <input
                    type="text"
                    placeholder='Enter Client Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </label>

            <label htmlFor="dob">
                <span>Date of Birth</span>
                <input
                    type="text"
                    placeholder='Enter Client DOB'
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                />
            </label>

            <label htmlFor="passport">
                <span>Passport</span>
                <input
                    type="text"
                    placeholder='Enter Client Passport'
                    value={passport}
                    onChange={(e) => setPassport(e.target.value)}
                />
            </label>

            <button className='primary-btn'>Submit</button>
        </form>
    );
};

export default ClientProfile;