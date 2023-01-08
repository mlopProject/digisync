import fonts from '~/constants/fonts/leftFont';
import usePosterContent from "../../../hooks/usePosterContent";
import EditIcon from '~/media/Images/edit.png';
import { useRef } from 'react';
import domtoimage from 'dom-to-image';
import axiosInstance from '~/axios/axiosinstance';
import { toast } from 'react-toastify';


export default function Preview({ previewIndex, data, setIsOpen }) {
  const { caption, hastag, prompt, posterText, Title, Promotion, Contact, Description, index, setSelectedPoster } = usePosterContent();
  const ref = useRef(null);
  function closeModal() { 
    setIsOpen(false);
  }

  const handleImage = () => {
    console.log("Hello");
    if (ref.current !== null) {
      domtoimage.toJpeg(ref.current, { quality: 1 })
        .then(function (dataUrl) {
          console.log(hastag);
          // remove the initial 'data:image/png;base64,' part of the string
          let data = new FormData();
          data.append('data', dataUrl);
          data.append('message', `${caption}\n${hastag}`);
          axiosInstance.post(`/meta/postOnInsta`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }, timeout: 5000000
          })
            .then(res => {
              console.log(res);
              if (res.data.status === 201) {
                toast.success(res.message);
              }
            }).catch(err => {
              console.log(err.message);
              toast.error(err.message);
            });

        });
    }
  }

  // replace %23 with # in hastag
  const texthashtag = hastag.replace(/%23/g, "#");

  return (
    <div className="z-40 h-[1000px]">
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={closeModal} />
      <div className='fixed right-8 top-10' onClick={closeModal}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-6 h-6 text-bold">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <div className="absolute bg-slate-100 border-b-2 top-0 left-[50%] translate-x-[-50%] p-4 shadow-[0px_22px_70px_4px_rgba(0,0,0,0.56)] rounded-lg mt-8">
        <div className="z-20 relative flex flex-col items-center align-center">
          <div ref={ref} className="w-[1080px] h-[1080px] top-6">
            <div className="absolute w-[1080px] h-[1080px] cursor-pointer">
              <img className="object-cover w-full h-full" src={data.image_path} alt="Flower and sky" />
              <div className="absolute top-0 right-0 px-6 py-12">
                <div className="relative">
                  <h4 style={{ "fontFamily": `${fonts[previewIndex].headingfont}` }}
                    className={`mb-3 text-[48px] font-bold tracking-tight text-gray-100 max-w-[550px] border-4 p-4 pr-6`}
                  >
                    {Title}
                  </h4>
                  <p style={{ "fontFamily": `${fonts[previewIndex].paragraphfont1}` }}
                    className={`max-w-[500px]  text-[32px]  text-sm leading-normal text-gray-200`}>
                    {posterText[index]}
                  </p>
                </div>
              </div>
              <div className="absolute top-[55%] left-0 px-6">
                <h4 style={{ "fontFamily": `${fonts[previewIndex].paragraphfont2}` }}
                  className={`font-extrabold  text-[60px] text-gray-100`}>
                  {Promotion}
                </h4>
                <p style={{ "fontFamily": `${fonts[previewIndex].paragraphfont2}` }}
                  className={`text-sm text-gray-100 text-[36px] mt-2 h-4 leading-10`}>{Description} </p>
              </div>
              <div className="absolute bottom-8 left-0 px-6">
                <div className="relative flex flex-col">
                  <h4 style={{ "fontFamily": `${fonts[previewIndex].paragraphfont3}` }}
                    className={`text-sm text-[20px] font-bold  text-gray-100 max-w-[600px]`}>
                    Graphic Generated By AI
                  </h4>
                  <p style={{ "fontFamily": `${fonts[previewIndex].paragraphfont3}` }}
                    className={`text-sm mt-2 text-[18px] text-gray-100 max-w-[600px]`}>
                    prompt: {prompt}
                  </p>
                </div>
              </div>
              <div className="absolute right-8 bottom-6">
                <div className="relative flex flex-col items-center">
                  <h4 style={{ "fontFamily": `${fonts[previewIndex].paragraphfont3}` }}
                    className={`text-[20px] font-bold text-lg tracking-tight text-gray-100`}>
                    Contact at:
                  </h4>
                  <p style={{ "fontFamily": `${fonts[previewIndex].paragraphfont3}` }}
                    className={`text-[18px] text-lg font-normal text-gray-100`}>{` ${Contact}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-4 p-2">
            <div className='text-md max-w-[800px] font-poppins'>
              <p>{caption} __<span className='font-semibold'>{texthashtag}</span></p>
            </div>
            <div className='flex gap-x-4'>
              <div className="relative">
                <img className="absolute left-3 top-3" src={EditIcon} alt="Edit Icons" width="15px" height="15px" />
                <button className="py-2 pl-8 pr-4 text-white text-md font-roboto font-bold rounded bg-black" onClick={closeModal} >Edit</button>
              </div>
              <div className="relative">
                <img className="absolute left-3 top-3 text-black" src={EditIcon} alt="Edit Icons" width="15px" height="15px" />
                <button className="py-2 pl-8 pr-4 text-white text-md font-roboto font-bold rounded bg-[#1976d2]" onClick={handleImage} >Publish</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
