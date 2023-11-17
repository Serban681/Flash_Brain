import LogoComponent from "./Logo";

export default function FooterComponent() {
    return (
        <div className="h-32 bg-black flex justify-between items-center">
            <div className="ml-5">
                <LogoComponent />
            </div>
            <h6 className="mr-5 text-white font-bold font-josefin">© flashbrain 2023</h6>
        </div>
    )
}