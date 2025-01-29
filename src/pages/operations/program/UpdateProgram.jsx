import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';
import { styles } from '../../../select/styles';
import { useDispatch, useSelector } from 'react-redux';
import { updateProgram, getProgramById } from '../../../redux/actions/program';
import moment from 'moment-timezone';
import { useAlert } from '../../../hooks/userAlert';
import Loading from '../../Loading';
import countryList from 'react-select-country-list';
import { currencyOptions } from '../../../select/options';
import { useParams } from 'react-router-dom';

const UpdateProgram = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const options = useMemo(() => countryList().getData(), []);

    const { program, loading, error, message } = useSelector(state => state.program);

    const [country, setCountry] = useState(null);
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [currency, setCurrency] = useState(null);
    const [totalCost, setTotalCost] = useState('');
    const [deduction, setDeduction] = useState('');
    const [processDuration, setProcessDuration] = useState('');
    const [jobs, setJobs] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [requirements, setRequirements] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [timelineProcess, setTimelineProcess] = useState([]);


    useEffect(() => {
        dispatch(getProgramById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (program) {
            setCountry(options.find(option => option.label === program.country) || null);
            setTitle(program.title || '');
            setDuration(program.durationOfWorkPermit || '');
            setCurrency(currencyOptions.find(option => option.label === program.currency) || null);
            setTotalCost(program.totalCost || '');
            setDeduction(program.deduction || '');
            setProcessDuration(program.processDuration || '');
            setJobs(program.jobs || []);
            setDocuments(program.documents || []);
            setRequirements(program.requirements || []);
            setBenefits(program.benefits || []);
            setTimelineProcess(program.timelineProcess || []);
        }
    }, [program]);

    useEffect(() => {
        alert(message, error, "/operations/programs");
    }, [error, message]);

    const addJob = () => {
        setJobs([...jobs, { title: '', currency: null, salary: '' }]);
    };

    const removeJob = (index) => {
        setJobs(jobs.filter((_, i) => i !== index));
    };

    const updateJob = (index, field, value) => {
        const updatedJobs = [...jobs];
        if (field === 'currency') { updatedJobs[index][field] = value.label } else {
            updatedJobs[index][field] = value;
        }
        setJobs(updatedJobs);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProgram(id, country?.label, title, duration, currency?.label, totalCost, deduction, processDuration, jobs, documents, requirements, benefits, timelineProcess, moment.tz('Asia/Karachi').format()));
    };

    return (
        loading ? <Loading /> : <section className='w-full'>
            <form className='w-full flex flex-col gap-[4px]' onSubmit={submitHandler}>
                <label>
                    <span>Country</span>
                    <Select options={options} styles={styles} placeholder='Choose Country' value={country} onChange={setCountry} />
                </label>

                <label>
                    <span>Title</span>
                    <input type='text' placeholder='Enter Program Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>

                <label>
                    <span>Duration of Work Permit</span>
                    <input type='text' placeholder='Enter Duration of Work Permit' value={duration} onChange={(e) => setDuration(e.target.value)} />
                </label>

                <label>
                    <span>Currency</span>
                    <Select options={currencyOptions} styles={styles} placeholder='Choose Currency' value={currency} onChange={setCurrency} />
                </label>

                <label>
                    <span>Total Cost</span>
                    <input type='number' placeholder='Enter Total Cost of Program' value={totalCost} onChange={(e) => setTotalCost(e.target.value)} />
                </label>

                <label>
                    <span>Deduction</span>
                    <input type='number' placeholder='Enter Deduction Program' value={deduction} onChange={(e) => setDeduction(e.target.value)} />
                </label>

                <label>
                    <span>Process Duration</span>
                    <input type='text' placeholder='Enter Duration of Process' value={processDuration} onChange={(e) => setProcessDuration(e.target.value)} />
                </label>

                <label>
                    <span>Jobs</span>
                    {jobs.map((job, index) => (
                        <div key={index} className='grid grid-cols-[1fr_1fr_1fr_120px] gap-[4px] items-center mb-[4px]'>
                            <input type='text' placeholder='Job Title' value={job.title} onChange={(e) => updateJob(index, 'title', e.target.value)} />

                            <Select
                                styles={styles}
                                options={currencyOptions}
                                onChange={(option) => updateJob(index, 'currency', option)} placeholder='Currency' />

                            <input type='number' placeholder='Salary' value={job.salary} onChange={(e) => updateJob(index, 'salary', e.target.value)} />

                            <button type='button' onClick={() => removeJob(index)} className='secondary-btn !bg-red-600 p-[12px] rounded-md text-white'>Remove</button>
                        </div>
                    ))}
                    <button type='button' onClick={addJob} className='primary-btn !bg-text '>Add Job</button>
                </label>

                <label>
                    <span>Documents</span>
                    <input type='text' placeholder='Enter Documents with , separator' value={documents} onChange={(e) => setDocuments(e.target.value.split(","))} />
                </label>

                <label>
                    <span>Requirements</span>
                    <input type='text' placeholder='Enter Requirements with , separator' value={requirements} onChange={(e) => setRequirements(e.target.value.split(","))} />
                </label>

                <label>
                    <span>Benefits</span>
                    <input type='text' placeholder='Enter Benefits with , separator' value={benefits} onChange={(e) => setBenefits(e.target.value.split(","))} />
                </label>

                <label>
                    <span>Timeline Process</span>
                    <input type='text' placeholder='Enter Timeline Process with , separator' value={timelineProcess} onChange={(e) => setTimelineProcess(e.target.value.split(","))} />
                </label>


                <button className='primary-btn !mt-[4px]' type='submit'>Update</button>
            </form>
        </section>
    );
};

export default UpdateProgram;