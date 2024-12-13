import Dropzone from 'react-dropzone'
import { RiUploadCloud2Line } from "react-icons/ri";
import Select from "react-select"
import { styles } from '../../../select/styles';
const AddNewLead = () => {
    return (
        <div className='w-full grid grid-cols-2 gap-[16px]'>

            <form action="" className='!w-full flex flex-col gap-[4px]'>
                <label htmlFor="">
                    <span>Name</span>
                    <input type="text" placeholder='Enter Name' />
                </label>
                <label htmlFor="">
                    <span>City</span>
                    <input type="text" placeholder='Enter City' />
                </label>

                <label htmlFor="">
                    <span>Phone</span>
                    <input type="text" placeholder='Enter Phone' />
                </label>

                <label htmlFor="">
                    <span>Campaign</span>
                    <Select styles={styles} placeholder='Enter Campaign' />
                </label>

                <button className='primary-btn'>Submit</button>
            </form>

            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({ getRootProps, getInputProps }) => (
                    <section className="bg-white p-[16px] rounded-lg flex flex-col justify-center items-center">
                        <div {...getRootProps()} className='flex flex-col gap-[4px] items-center'>
                            <RiUploadCloud2Line className='text-7xl text-accent' />
                            <input {...getInputProps()} />
                            <p className='text-text'>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>


        </div>
    )
}

export default AddNewLead
