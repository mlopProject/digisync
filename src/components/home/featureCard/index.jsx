
import Heading3 from "../../heading3";
import CardParagraph from "../../cardParagraph";
import {useNavigate} from 'react-router-dom';
function FeatureCard({imgSrc,spanText,heading,paragraph,buttonText,flexDirection,buttonRef}){
    const navigate = useNavigate();
    const navigateToPage =()=>{
        navigate(buttonRef);
    }
    return(
        <div className={`flex flex-col rounded-lg shadow-2xl overflow-hidden ${flexDirection}`}>
                    <img src={imgSrc} alt="" className="h-80  aspect-video" />
                    <div className="flex flex-col justify-center flex-1 p-6">
                        <span className="text-xs uppercase text-black">{spanText}</span>
                        <Heading3 content={heading}/>
                        <CardParagraph content={paragraph}/>
                        <button  onClick={navigateToPage} type="button" className="self-start bg-violet-400 text-white p-2 rounded-md hover:bg-violet-500">{buttonText}</button>
                    </div>
        </div>

    )
}

export default FeatureCard;