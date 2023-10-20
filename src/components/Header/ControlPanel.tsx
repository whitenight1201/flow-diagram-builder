import SelectPercent from "./SelectPercent";

const ControlPanel = () => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center gap-x-1">
        <button className="bg-indigo-500 text-white text-sm p-3 hover:bg-indigo-600">
          LIST VIEW
        </button>
        <button className="focus:outline-none flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 text-gray-700">
          <i
            style={{ fontSize: 18, opacity: "0.7" }}
            className="fas fa-location-arrow"
          ></i>
        </button>
      </div>
      <div className="flex items-center gap-x-[2px]">
        <button className="focus:outline-none flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 text-gray-700">
          <i
            style={{ fontSize: 18, opacity: "0.7" }}
            className="fas fa-minus"
          ></i>
        </button>
        <SelectPercent />
        <button className="focus:outline-none flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 text-gray-700">
          <i
            style={{ fontSize: 18, opacity: "0.7" }}
            className="fas fa-plus"
          ></i>
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
