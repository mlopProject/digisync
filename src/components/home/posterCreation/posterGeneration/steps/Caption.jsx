import ListBox from "./listBox";
import { useState } from 'react';
import { Button, SIZE } from 'baseui/button';
import { toast } from 'react-toastify';
import axiosInstance from '~/axios/axiosinstance';
import selectIcon from '~/media/Images/check.png';
import usePosterContent from "~/hooks/usePosterContent";
const people = [
	{ name: 'Artificial Intelligence' },
	{ name: 'Software Engineering' },
	{ name: 'Data Science' },
	{ name: 'Cyber Security' },
	{ name: 'Robotics' },
	{ name: 'IoT' },
	{ name: 'Artificial Intelligence' },
	{ name: 'Software Engineering' },
	{ name: 'Data Science' },
	{ name: 'Cyber Security' },
	{ name: 'Robotics' },
	{ name: 'IoT' },
	{ name: 'life' },
	{ name: 'happiness' },
	{ name: 'love' },
	{ name: 'truth' },
	{ name: 'inspiration' },
	{ name: 'humor' },
	{ name: 'philosophy' },
	{ name: 'science' },
	{ name: 'soul' },
	{ name: 'books' },
	{ name: 'wisdom' },
	{ name: 'knowledge' },
	{ name: 'education' },
	{ name: 'poetry' },
	{ name: 'hope' },
	{ name: 'friendship' },
	{ name: 'writing' },
	{ name: 'religion' },
	{ name: 'death' },
	{ name: 'romance' },
	{ name: 'success' },
	{ name: 'arts' },
	{ name: 'relationship' },
	{ name: 'motivation' },
	{ name: 'faith' },
	{ name: 'mind' },
	{ name: 'god' },
	{ name: 'funny' },
	{ name: 'quotes' },
	{ name: 'positive' },
	{ name: 'purpose' },
	{ name: 'fashion' },
	{ name: 'sports' },
	{ name: 'nature' },
	{ name: 'technology' },
	{ name: 'food' }

]

export default function Caption() {

	const [selected, setSelected] = useState(people[0]);
	const [isLoading, setLoading] = useState(false);
	const [selectedText, setSelectedText] = useState(0);
	const [captionList, setCaptionList] = useState([]);
	const [editCaption, setEditCaption] = useState(false);

	const { caption,setCaption } = usePosterContent();
	const handleBlue= (e)=>{
		setEditCaption(false);
	}

	const fetchData = (e) => {
		e.preventDefault();
		setLoading(true);
		axiosInstance.post('/post/captions', {
			"prefix": `_TOPIC_ ${selected.name} _QUOTE_`
		}).then(
			result => {
				console.log(selected.name);
				setCaptionList(result.data);
				setCaption(result.data[0]);
				// setCaption(captionList[0]);
				setLoading(false);
				toast.success('Caption Generated Successfully!');
			}
		).catch(error => {
			setLoading(false);
			console.log(error);
			if ('response' in error && 'data' in error.response && 'message' in error.response.data) {
				toast.error(error.response.data.message);
			}
			else {
				toast.error("Something went wrong! Please try again.");
			}
		});
	}

	return (
		<div className="flex flex-col">
			<div className="mx-2 w-full flex-1">
				<h4 className="text-xl font-semibold">Caption Generation:</h4>
				<p className="mb-10">Select a category from the options below to generate cool captions.</p>

				<div className="space-y-8 ng-untouched ng-pristine ng-valid flex flex-col gap-x-4 w-full z-20">
					<div className="space-y-4 flex-1">
						<div className="space-y-2">
							<label htmlFor="prompt" className="block text-sm">Category</label>
							<div className="box-shadow-custom rounded-lg">
								<ListBox setSelected={setSelected} selected={selected} className="px-10 py-1 mt-2 w-full text-md font-roboto font-bold rounded border-2" />
							</div>
						</div>
					</div>
					<Button onClick={fetchData} size={SIZE.compact} className="px-10 w-full text-md font-roboto font-bold border rounded bg-black hover:bg-gray-800 text-white" isLoading={isLoading} >Generate</Button>
				</div>
				{captionList.length !== 0 &&
					<div className="h-[200px] overflow-y-scroll mt-8 scroll-smooth -webkit-scrollbar-track:rounded scroll_r_adjust scroll_w_adjust scroll_t_adjust z-0">
						{captionList.map((item, index) => {
							return (
								<div className="flex relative" key={index}>
									{(editCaption === false || index !== selectedText) &&
										<p className={`m-4 cursor-pointer p-4 w-full shadow-lg rounded-lg mt-4 text-sm font-poppins ${(index === selectedText) && 'border-green-600 border-2'} `} onClick={() => {
											setSelectedText(index);
											setCaption(item);
											setEditCaption(true);
										}} >{item}</p>
									}
									{(index === selectedText && editCaption == true) && (
										<textarea rows={3} onBlur={handleBlue} className={`resize-none h-fit overflow-hidden focus:outline-0 m-4 p-4 w-full rounded-lg mt-4 text-sm font-poppins  border-green-600 border-2 shadow-none`} value={caption} onChange={(e) => {
											const captionNewText= [...captionList];
											captionNewText[index] = e.target.value;
											setCaptionList(captionNewText);
											setCaption(e.target.value);
										}} />)}

									{(index === selectedText) && <img src={selectIcon} width="22px" height="22px" className="absolute right-[10px] top-[10px] bg-white" alt="SelectedIcon" />}
								</div>
							)
						})}
					</div>}
			</div>
		</div>
	);
}

