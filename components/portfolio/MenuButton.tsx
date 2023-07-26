import Image from "next/image";
import Link from "next/link";

import refreshImg from "@/app/assets/images/refresh.svg";
import helpImg from "@/app/assets/images/help.svg";
import descriptionImg from "@/app/assets/images/description.svg";
import fullscreenImg from "@/app/assets/images/fullscreen.svg";
import originalscreenImg from "@/app/assets/images/originalscreen.svg";
import powerImg from "@/app/assets/images/power.svg";

interface MenuButtonProps {
  resetCamera: () => void;
  setHelpViewer: any;
  postMessage: () => void;
  fullScreen: boolean;
  setThumbnailViewer: any;
  avatarID: number;
  userID: string;
}

const MenuButton = (props: MenuButtonProps) => {
  const {
    resetCamera,
    setHelpViewer,
    postMessage,
    fullScreen,
    setThumbnailViewer,
    avatarID,
    userID
  } = props;

  return (
    <div className="absolute flex flex-row bottom-0 right-0 left-0 space-x-[20px] px-[20px] py-[20px]">
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={resetCamera}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={refreshImg}
          alt=""
        />
      </div>
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={() => setHelpViewer(true)}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={helpImg}
          alt=""
        />
      </div>
      <Link
        href={`/${userID}/avatar/${avatarID}`}
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={descriptionImg}
          alt=""
        />
      </Link>
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={postMessage}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={fullScreen ? originalscreenImg : fullscreenImg}
          alt=""
        />
      </div>
      <div
        className="flex justify-center items-center sm:w-[40px] sm:h-[40px] w-[30px] h-[30px] rounded-full bg-white hover:bg-[#E9E9E9] shadow-[0px_3px_6px_rgba(0,0,0,0.16)] cursor-pointer"
        onClick={() => setThumbnailViewer(true)}
      >
        <Image
          className="sm:w-[20px] sm:h-[20px] w-[16px] h-[16px]"
          src={powerImg}
          alt=""
        />
      </div>
    </div>
  );
};

export default MenuButton;
