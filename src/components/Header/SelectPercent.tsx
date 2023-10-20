import { useState } from "react";

const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPercent, setCurrentPercent] = useState<number>(100);

  const percents: number[] = [25, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          className="flex items-center justify-center w-32 h-11 p-4 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
          onClick={toggleMenu}
        >
          {currentPercent}%
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <ul className="py-1">
            {percents.map((percent, idx) => (
              <div className="flex px-6 justify-between items-center gap-x-4">
                <li
                  key={idx}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold border-b-[1px] border-gray-200"
                  onClick={() => {
                    setCurrentPercent(percent);
                    setIsOpen(!isOpen);
                  }}
                >
                  {percent}%
                </li>
                {currentPercent == percent ? (
                  <i style={{ fontSize: 14, color:"blue" }} className="fas fa-check"></i>
                ) : (
                  <div></div>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
