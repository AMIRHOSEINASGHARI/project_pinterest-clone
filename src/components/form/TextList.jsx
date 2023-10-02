// Components
import { Button } from "@/components";
// React Icons
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";

const TextList = ({ data, setData, title, type }) => {
  const handleAdd = () => {
    setData({
      ...data,
      [type]: [...data[type], ""],
    });
  };

  const handleChange = (e, i) => {
    const newList = [...data[type]];
    newList[i] = e.target.value;
    setData({
      ...data,
      [type]: newList,
    });
  };

  const handleDelete = (i) => {
    const newList = [...data[type]];
    newList.splice(i, 1);
    setData({
      ...data,
      [type]: newList,
    });
  };

  return (
    <div>
      <h1 className="mb-3">{title}</h1>
      <div className="w-full bg-gray-100 rounded-lg p-4 lg:p-6">
        <Button
          type="button"
          styles="bg-purple-600 mb-2 text-white font-bold text-xs flex items-center gap-2 rounded-full py-2 px-4"
          handleButton={handleAdd}
          title={
            <>
              <AiOutlinePlusCircle className="text-xl" /> <span>Add</span>
            </>
          }
        />
        <div className="flex flex-wrap gap-6">
          {data[type].map((el, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={el}
                onChange={(e) => handleChange(e, i)}
                className="rounded-lg p-2 border-dashed border-2 border-primary-gray"
              />
              <Button
                type="button"
                styles="bg-red-200 text-red-500 font-bold text-xs flex items-center gap-2 rounded-full p-2"
                handleButton={() => handleDelete(i)}
                title={<BiTrashAlt className="text-xl" />}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TextList;
