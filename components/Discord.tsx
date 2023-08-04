'use client'
import WidgetBot from "@widgetbot/react-embed";

export default function Discord() {
  return (
    <div className="grow flex justify-center items-center md:px-0 px-[16px] py-[200px]">
      <WidgetBot
        server="1125351036740194336"
        channel="1125351038170443838"
        className="md:w-[1008px] w-full h-full"
      />
    </div>
  );
}
