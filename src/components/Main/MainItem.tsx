import React, { useState } from "react";
import { useBetween } from "use-between";
import { useGlobalState } from "../../hooks";
import { MainItemProps } from "../../types/ItemType";
import Button from "../../shared/Button";

// custom hook for sharing state between any components
const useSharedZoomState = () => useBetween(useGlobalState);

const MainItem = ({ item, setClick, setAdd }: MainItemProps) => {
  const [title, setTitle] = useState<string>("New Item");
  const { zoomLevel } = useSharedZoomState();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setClick(item.id, event.clientX - item.x, event.clientY - item.y);
  };

  const handleAdd = () => {
    setAdd(item.id, title);
  };

  return (
    <div style={{ transform: `scale(${zoomLevel / 100})` }}>
      <div
        className="flex flex-col absolute"
        style={{ transform: `translate(${item.x}px, ${item.y}px)` }}
      >
        <div
          className="bg-gray-400 opacity-30"
          style={{
            width: item.width + 1,
            height: 1,
            transform: `translateX(55px)`,
          }}
        ></div>
        {item.parent !== -1 ? (
          <div
            className="bg-gray-400 opacity-30"
            style={{ width: 1, height: 18, transform: `translateX(55px)` }}
          ></div>
        ) : (
          <div style={{ height: 18 }}></div>
        )}
        <div className="flex items-center gap-x-1 w-60">
          <div
            className="border-dashed border-2 bg-white px-4 py-2 mr-1"
            onMouseDown={handleClick}
          >
            <span style={{ cursor: "move" }}>{item.title}</span>
          </div>
          <Button type="add" handleAction={handleAdd} />
          <Button type="edit" visibility={item.visiblebtn} />
          <Button type="delete" visibility={item.visiblebtn} />
        </div>
        {!item.isLeaf ? (
          <div
            className="bg-gray-400 opacity-30"
            style={{ width: 1, height: 18, transform: `translateX(55px)` }}
          ></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default MainItem;
