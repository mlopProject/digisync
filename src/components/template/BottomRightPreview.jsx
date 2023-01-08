
import usePosterContent from "../../hooks/usePosterContent";
import EditIcon from '../../media/Images/edit.png';
import { useNavigate } from "react-router-dom";
import fonts from '~/constants/fonts/bottomRight';


const BottomRightPreview = ({ data, index1, setIsOpen }) => {
	console.log(index1)
	const navigate = useNavigate();
	const { bottomRightImage,setImage,prompt, posterText, Title, Promotion, Contact, Description, setFont, index, setSelectedPoster } = usePosterContent();
	const handleClick = () => {
		console.log("edit");
		setFont([fonts[index1]]);
		setSelectedPoster(index1);
		setImage(bottomRightImage);
		navigate("/design-editor");
	}

	function openModal() {
		setSelectedPoster(index1);
		setIsOpen(true);
	}

	return (
		<>
			<div className="z-0 hover:opacity-90 relative group">
				<div className="w-[500px] h-[500px] relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
					<img className="object-cover w-full h-full" src={data.image_path} alt="Flower and sky" />
					<div className="absolute top-0 left-0 px-6 py-6">
						<div className="relative">
							<h4 style={{ "fontFamily": `${fonts[index1].headingfont}` }}
								className={`mb-3 text-[30px] font-bold tracking-tight text-gray-100 w-full max-w-[400px] pl-2`}
							>
								{Title}
							</h4>
							<p style={{ "fontFamily": `${fonts[index1].paragraphfont1}` }}
								className={`max-w-[400px] text-sm leading-normal text-gray-100 pl-2`}>
								{posterText[index]}
							</p>
						</div>
					</div>
					<div className="absolute top-[40%] left-0 px-6">
						<h4 style={{ "fontFamily": `${fonts[index1].paragraphfont2}` }}
							className={`font-extrabold text-3xl text-gray-100`}>
							{Promotion}
						</h4>
						<p style={{ "fontFamily": `${fonts[index1].paragraphfont2}` }}
							className={`text-md text-gray-100 mt-[4px]`}>{Description} </p>
					</div>
					<div className="absolute bottom-2 left-0 px-6">
						<div className="relative flex flex-col leading-[24px]">
							<h4 style={{ "fontFamily": `${fonts[index1].paragraphfont3}` }}
								className={`text-xs font-bold text-gray-100 max-w-[250px]`}>
								Graphic Generated By AI
							</h4>
							<p style={{ "fontFamily": `${fonts[index1].paragraphfont3}` }}
								className={`text-[12px] text-gray-100 max-w-[300px]`}>
								prompt: {prompt}
							</p>
						</div>
						<div className="flex items-center">
							<p style={{ "fontFamily": `${fonts[index1].paragraphfont3}` }}
								className={`text-xs font-normal text-gray-100`}>{` ${Contact}`}</p>
						</div>
					</div>
				</div>
				<div className="z-20 absolute space-y-2 right-8 top-8">
					<div className="hidden group-hover:flex relative">
						<img className="absolute left-3 top-3" src={EditIcon} alt="Edit Icons" width="15px" height="15px" />
						<button className="py-2 pl-8 pr-4 text-white text-md font-roboto font-bold rounded bg-black" onClick={handleClick} >Edit</button>
					</div>
					<div className="z-20 hidden group-hover:flex relative">
						<div className="flex items-center justify-center">
							<button
								type="button"
								onClick={openModal}
								className="rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
							>
								Preview
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default BottomRightPreview;