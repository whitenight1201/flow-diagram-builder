import React, { useState } from "react";
import { useBetween } from "use-between";
import { useGlobalState } from "../../hooks";
import { MainItemProps } from "../../types/ItemType";
import Button from "../../shared/Button";

// custom hook for sharing state between any components
const useSharedZoomState = () => useBetween(useGlobalState);

const MainItem = ({ item, setClick, setAdd }: MainItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("New Item");
  const { zoomLevel } = useSharedZoomState();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setClick(item.id, event.clientX - item.x, event.clientY - item.y);
  };

  const handleAdd = () => {
    setAdd(item.id, title);
  };

  let controlButton;
  if (!isEditing) {
    controlButton = (
      <>
        <Button type="add" handleAction={handleAdd} />
        <Button
          type="edit"
          visibility={item.visiblebtn}
          handleAction={() => setIsEditing(!isEditing)}
        />
      </>
    );
  } else {
    controlButton = (
      <>
        <Button
          type="checkok"
          visibility={item.visiblebtn}
          handleAction={() => {
            setIsEditing(!isEditing);
          }}
        />
        <Button
          type="cancel"
          visibility={item.visiblebtn}
          handleAction={() => {
            setIsEditing(!isEditing);
          }}
        />
      </>
    );
  }

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
            style={{ width: 1, height: 19, transform: `translateX(55px)` }}
          ></div>
        ) : (
          <div style={{ height: 18 }}></div>
        )}
        <div
          className="flex items-center gap-x-1 w-80"
          onMouseDown={handleClick}
        >
          {!isEditing ? (
            <div
              className={` border-2 text-${
                item.outline === "dashed" ? "black" : "white"
              } px-4 py-2`}
              style={{
                borderStyle: `${item.outline}`,
                backgroundColor: `${item.bgcolor}`,
              }}
              onClick={handleAdd}
            >
              <span style={{ cursor: "move" }}>{item.title}</span>
            </div>
          ) : (
            <div>
              <input
                className="outline-none w-28 px-2 py-2"
                placeholder="Category name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
          )}
          {controlButton}
        </div>
        {!item.isLeaf ? (
          <div
            className="bg-gray-400 opacity-30"
            style={{ width: 1, height: 19, transform: `translateX(55px)` }}
          ></div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default MainItem;
