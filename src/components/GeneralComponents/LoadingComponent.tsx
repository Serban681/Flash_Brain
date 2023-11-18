export default function LoadingComponent({loading} : {loading: boolean}) {


    return (
        <>
            {loading && 
                <div className="absolute w-screen h-screen bg-black opacity-70 translate-y-[-5rem] flex justify-center items-center z-50">
                    <div className="lds-dual-ring opacity-100"></div>
                </div>
            }
        </>    
    )
}