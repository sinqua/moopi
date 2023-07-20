import ClipLoader from "react-spinners/ClipLoader";

interface ModalProps {
    modal: any;
}

export default function LoadingModal(props: ModalProps){
    const { modal } = props;
  
    return (
      modal &&
      <div className="absolute w-full h-full bg-[#00000050] top-0 left-0 !m-0 z-0">
        <div className="sticky top-0 w-full h-screen px-[50px] flex justify-center items-center">
          <div className="relative max-w-[300px] w-full flex flex-col box-border bg-white rounded-[10px] overflow-hidden">
            <div className="flex flex-col justify-center items-center grow space-y-[15px] box-border px-[60px] py-[30px]">
              <ClipLoader color={"#2778C7"} loading={true} size={50} />
            </div>
            <div className="flex border-solid border-t-[1px] border-[#DFDFDF] w-full">
              <div
                className="flex justify-center items-center py-[20px] cursor-pointer w-full"
              >
                삭제중...
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };