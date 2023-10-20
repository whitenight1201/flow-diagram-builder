import { IButtonProps } from "../types/ButtonType";

const Button = ({ type, visibility, handleAction }: IButtonProps) => {
  return (
    <div>
      {type === "add" && (
        <button
          className="focus:outline-none flex items-center justify-center w-5 h-5 rounded-full bg-gray-400 text-white opacity-60 hover:opacity-90"
          onClick={handleAction}
        >
          <i style={{ fontSize: 10 }} className="fas fa-plus"></i>
        </button>
      )}
      {type === "edit" && (
        <button
          className={`focus:outline-none flex items-center justify-center w-5 h-5 rounded-full bg-gray-400 text-white opacity-60 hover:opacity-90 ${
            visibility ? "visible" : "invisible"
          }`}
          onClick={handleAction}
        >
          <i style={{ fontSize: 10 }} className="fas fa-pen"></i>
        </button>
      )}
      {type === "delete" && (
        <button
          className={`focus:outline-none flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white opacity-80 hover:opacity-90 ${
            visibility ? "visible" : "invisible"
          }`}
          onClick={handleAction}
        >
          <i style={{ fontSize: 10 }} className="fas fa-xmark">X</i>
        </button>
      )}
    </div>
  );
};

export default Button;
