//* Next Imports
import { useRouter } from "next/router";
//* React Icons Imports
import { IoMdClose } from "react-icons/io";

const Modal = ({ children }) => {
  const router = useRouter();

  return (
    <div className="bg-black/80 fixed inset-0 z-30">
      <div onClick={() => router.push("/")} className="p-5 flex justify-end">
        <button
          type="button"
          className="text-white text-4xl"
          onClick={() => router.push("/")}
        >
          <IoMdClose />
        </button>
      </div>
      <div className="bg-white h-[95%] rounded-t-xl px-5 lg:px-48 pt-12 pb-48 overflow-auto no-scrollbar">
        {children}
      </div>
    </div>
  );
};

export default Modal;
