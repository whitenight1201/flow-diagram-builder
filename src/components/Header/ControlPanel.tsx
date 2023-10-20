import SelectZoomLevel from "./SelectZoomLevel";
import { useBetween } from "use-between";
import { useGlobalState } from "../../hooks";

// custom hook for sharing state between any components
const useSharedZoomState = () => useBetween(useGlobalState);

const ControlPanel = () => {
  const { setZoomLevel } = useSharedZoomState();

  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center gap-x-1">
        <button className="bg-indigo-500 text-white text-sm p-3 hover:bg-indigo-600">
          LIST VIEW
        </button>
        <button
          className="focus:outline-none flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 text-gray-700"
          onClick={() => setZoomLevel(100)}
        >
          <i
            style={{ fontSize: 18, opacity: "0.7" }}
            className="fas fa-location-arrow"
          ></i>
        </button>
      </div>
      <div className="flex items-center gap-x-[2px]">
        <button
          className="focus:outline-none flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 text-gray-700"
          onClick={() => setZoomLevel((prevZoomLevel) => prevZoomLevel - 10)}
        >
          <i
            style={{ fontSize: 18, opacity: "0.7" }}
            className="fas fa-minus"
          ></i>
        </button>
        <SelectZoomLevel />
        <button
          className="focus:outline-none flex items-center justify-center w-11 h-11 bg-white hover:bg-gray-50 text-gray-700"
          onClick={() => setZoomLevel((prevZoomLevel) => prevZoomLevel + 10)}
        >
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
