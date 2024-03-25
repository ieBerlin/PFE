import mainImage from "../assets/mainBackground.png"
export default function Test(){
    return <div className="main-background-image">
        <div className="overlay"></div>
        <img src={mainImage} alt="" />
    </div>
}