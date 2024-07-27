/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { LocateIcon, TicketCheck } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] mt-5 grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  number_tickets,
  url_image,
  icon,
  colorStatus,
  place,
  date,
  time,
  navigate
}: {
  className?: string;
  title?: string | React.ReactNode;
  number_tickets?: number| any;
  url_image?: string;
  icon?: React.ReactNode;
  place?: string;
  colorStatus?: string;
  date?: string;
  time?: string;
  navigate?: () => void;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none  dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4 relative cursor-pointer",
        className
      )}
      onClick={navigate}
    >
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
        <img
          src={url_image}
          alt="Events"
          className="h-full w-full object-cover rounded-t-xl"
        />
      </div>
      <div className="group-hover/bento:translate-x-2 transition duration-200 p-4">
        <div className="font-sans font-normal flex flex-row gap-2 text-neutral-600 text-xs dark:text-neutral-300">
        {icon} <span>{date?.slice(0,10)} - {time}</span>
        </div>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          <p>{title}</p>
        </div>
        <div className="font-sans font-normal flex flex-row gap-2 text-neutral-600 text-xs dark:text-neutral-300">
        <TicketCheck size={15}/><span>{number_tickets} ticket{number_tickets > 1 ? "s" : " "}</span>
        <LocateIcon size={15}/><span>{place}</span>
        </div>
      </div>
      <div
        className={cn([
          "absolute p-1 animate-pulse rounded-sm right-4 bottom-2",
          colorStatus,
        ])}
      ></div>
    </div>
  );
};
