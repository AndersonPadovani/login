export enum ToolbarEnum {
  warning = "bg-yellow-400",
  alert = "bg-orange-400",
  success = "bg-green-700",
  error = "bg-red-700",
}

type ToolbarType = {
  message: string;
  type: ToolbarEnum;
};

const ToolbarMessage = ({ message, type }: ToolbarType) => {
  return (
    <div
      className={`flex absolute max-w-[90%] top-14 right-0 px-4 py-1 border-l-8 border-transparent/50 lg:right-4 lg:px-4 ${type}`}
    >
      <span className="flex max-w-fit text-center text-balance text-slate-200 font-bold">
        {message}
      </span>
    </div>
  );
};

export default ToolbarMessage;
