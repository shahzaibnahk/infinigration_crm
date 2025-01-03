import loading_v2 from "../assets/loading_v2.json"
import Lottie from "lottie-react";
const Loading = () => {

    return (
        <section className='w-full h-screen fixed top-0 left-0 bg-white flex justify-center items-center z-10'>
            <div className="w-[200px]">
                <Lottie animationData={loading_v2} loop={true} />
            </div>
        </section>
    )
}

export default Loading
