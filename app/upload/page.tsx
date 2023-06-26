export default async function Page({ params }: { params: { user: string } }) {
  return (
    // <div className="md:w-[814px] md:h-[526px] h-[470px] md:rounded-[10px] rounded-none bg-[#FAF9F6] shadow-[0px_3px_10px_rgba(0,0,0,0.16)]">
    <div className="w-full h-full flex flex-col items-center font-sans grow">
      <iframe
        src={IframeUrl}
        className="relative inline-flex grow w-full h-full top-0 left-0 md:rounded-[10px] rounded-none"
        allowFullScreen
      />
    </div>
  );
}

const IframeUrl = `${process.env.NEXT_PUBLIC_WEBSITE}/threejs-full`;
