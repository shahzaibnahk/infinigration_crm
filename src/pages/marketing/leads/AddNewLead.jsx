import Dropzone from 'react-dropzone'
import { RiUploadCloud2Line } from "react-icons/ri";
import Select from "react-select";
import { phoneButtonStyles, phoneInputStyles, styles } from '../../../select/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bulkUploadLead, createLead } from '../../../redux/actions/lead';
import { useAlert } from '../../../hooks/userAlert';
import Loading from '../../Loading';
import { sourceOptions } from '../../../select/options';
import PhoneInput from 'react-phone-input-2';
import * as XLSX from 'xlsx';
import 'react-phone-input-2/lib/style.css';
import moment from 'moment-timezone';

const AddNewLead = () => {
    const { loading, error, message } = useSelector(state => state.lead);
    const alert = useAlert();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [campaign, setCampaign] = useState({ value: "facebook", label: "Facebook" });
    const [excelData, setExcelData] = useState([]);
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createLead(name, city, phone, campaign.value, moment.tz("Asia/Karachi").format("YYYY-MM-DD")));
    };

    useEffect(() => {
        alert(message, error, "/marketing/leads/fresh");
    }, [error, message]);

    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const binaryStr = e.target.result;
            const workbook = XLSX.read(binaryStr, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Remove the header row and parse remaining rows
            const parsedData = data.slice(1).map(row => ({
                name: row[0],
                city: row[1],
                phone: row[2],
                source: row[3],
                date: row[4],
            }));

            setExcelData(parsedData);
        };

        reader.readAsBinaryString(file);
    };

    const bulkLeadUploadHandler = (e) => {
        e.preventDefault()
        dispatch(bulkUploadLead(excelData, moment.tz("Asia/Karachi").format("YYYY-MM-DD")))
    }

    return (
        loading ? <Loading /> : (
            <>
                <div className='w-full grid grid-cols-[1fr_2fr] gap-[16px]'>
                    <form onSubmit={submitHandler} action="" className='!w-full flex flex-col gap-[4px]'>
                        <label htmlFor="">
                            <span>Name</span>
                            <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='Enter Name' />
                        </label>
                        <label htmlFor="">
                            <span>City</span>
                            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder='Enter City' />
                        </label>

                        <label htmlFor="">
                            <span>Phone</span>
                            <PhoneInput
                                value={phone}
                                onChange={(e) => setPhone(e)}
                                inputStyle={phoneInputStyles}
                                buttonStyle={phoneButtonStyles}
                            />
                        </label>

                        <label htmlFor="">
                            <span>Source</span>
                            <Select value={campaign} onChange={setCampaign} options={sourceOptions} styles={styles} placeholder='Choose Source' />
                        </label>

                        <button className='primary-btn'>Submit</button>
                    </form>

                    <Dropzone onDrop={handleDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <section className="bg-white p-[16px] rounded-lg flex flex-col justify-center items-center">
                                <div {...getRootProps()} className='flex flex-col gap-[4px] items-center'>
                                    <RiUploadCloud2Line className='text-7xl text-accent' />
                                    <input {...getInputProps()} />
                                    <p className='text-text'>Drag and drop an Excel file here, or click to select a file</p>
                                </div>
                            </section>
                        )}
                    </Dropzone>


                </div>

                <div className="mt-4">
                    {excelData.length > 0 && (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>City</th>
                                        <th>Phone</th>
                                        <th>Source</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {excelData.map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.name}</td>
                                            <td>{row.city}</td>
                                            <td>{row.phone}</td>
                                            <td>{row.source}</td>
                                            <td>{row.date}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <button onClick={bulkLeadUploadHandler} className='primary-btn !mt-[8px]'>Submit</button>
                        </>
                    )}
                </div>
            </>
        )
    );
};

export default AddNewLead;
