
const Avatar = ({ name, image, designation }) => {
    return (
        <div className="flex items-center gap-[8px]">
            <img src={image !== "temp_url" ? image : "https://placehold.co/56x56"} alt="" className="w-[56px] h-[56px] rounded-full" />
            <div className="flex flex-col">
                <p className="font-[500]">{name}</p>
                <span className="text-sm font-[600] text-accent capitalize">{designation}</span>
            </div>
        </div>
    )
}

export default Avatar
