import ControlPanel from "./ControlPanel";

const Header = () => {
  return (
    <div className="flex justify-between items-center w-full h-full border-b-2 border-gray-300">
      <div className="flex items-center text-4xl gap-x-2">
        <p className="">Services</p>
        <p className="rounded-full text-lg text-center bg-yellow-400 px-2 mt-2">0</p>
      </div>
      <ControlPanel />
    </div>
  );
};

export default Header;
