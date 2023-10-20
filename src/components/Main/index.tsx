import { useEffect, useState } from "react";

import MainItem from "./MainItem";
import { ItemInfo } from "../../types/ItemType";

const Main = () => {
  const [items, setItems] = useState<ItemInfo[]>([]);
  const [isDrag, setIsDrag] = useState<boolean>(false);
  const [activeID, setActiveID] = useState<number>(-1);

  const [clientX, setClientX] = useState<number>(0);
  const [clientY, setClientY] = useState<number>(0);

  const [deltaX, setDeltaX] = useState<number>(0);
  const [deltaY, setDeltaY] = useState<number>(0);

  useEffect(() => {
    setItems([
      {
        id: 1,
        x: 900,
        y: 70,
        title: "Categories",
        outline: "dashed",
        parent: -1,
        children: [],
        width: 0,
        isLeaf: true,
        visiblebtn:false
      },
    ]);
  }, []);

  const getAverageX = (items: ItemInfo[]) => {
    let sum: number = 0;
    items.forEach((item) => (sum += item.x));
    return sum / items.length;
  };

  const handleAdd = (id: number, title: string) => {
    // Get Parent Item of Adding Item
    let parentItem: ItemInfo | undefined = items.find((item) => item.id === id);
    if (parentItem === undefined) return;

    // default, add new item below of parent item
    let newItem: ItemInfo = {
      id: items.length + 1,
      x: parentItem.x,
      y: parentItem.y + 80,
      title: title,
      parent: parentItem.id,
      children: [],
      isLeaf: true,
      width: 0,
      visiblebtn: true
    };
    parentItem.children.push(newItem.id);

    let leafs: ItemInfo[] = items.filter((item) => item.isLeaf);
    let blockItems: ItemInfo[] = [
      ...items.map((item) =>
        item.id === parentItem!.id ? { ...parentItem!, isLeaf: false } : item
      ),
      newItem,
    ];

    let leafIndex = 0;
    let leafCenter: number = getAverageX(leafs);

    // Rearrange leafs
    let arr: number[] = [1];
    while (arr.length > 0) {
      const popID: number | undefined = arr.shift();
      if (popID === undefined) continue;
      let curIndex = blockItems.findIndex((item) => item.id === popID);
      if (curIndex === -1) continue;
      let item: ItemInfo = blockItems[curIndex];

      arr = [...item.children, ...arr];
      if (item.isLeaf) {
        blockItems[curIndex].x =
          leafCenter - 75 * (leafs.length - 1 - 2 * leafIndex);
        leafIndex++;
      }
    }

    // Start from leaf, align parent x to the center of children elements
    arr = leafs.map((leaf) => leaf.id);
    while (arr.length > 0) {
      const leafID = arr.pop(),
        leafItem = blockItems.find((item) => item.id === leafID);
      const parentID = leafItem?.parent,
        parentIndex = blockItems.findIndex((item) => item.id === parentID),
        parentItem = blockItems[parentIndex];

      if (parentItem === undefined) continue;
      const childItems = parentItem.children.map(
        (id) => blockItems.find((item) => item.id === id) as ItemInfo
      );
      parentItem.x = getAverageX(childItems);
      blockItems[parentIndex] = parentItem;

      arr.push(parentIndex);
    }

    // Calculating the distance between siblings
    arr = [1];
    while (arr.length > 0) {
      const popID: number | undefined = arr.shift();
      if (popID === undefined) continue;
      let curIndex = blockItems.findIndex((item) => item.id === popID);
      if (curIndex === -1) continue;
      let item: ItemInfo = blockItems[curIndex];

      arr = [...item.children, ...arr];
      // blockItems[curIndex].width = 0;
      if (item.children.length > 1) {
        let childIndexs = item.children.map((id) =>
          blockItems.findIndex((block) => block.id === id)
        );
        childIndexs.forEach((value, index) => {
          let nextValue = childIndexs[index + 1];
          if (
            !(
              value === -1 ||
              nextValue === -1 ||
              blockItems[nextValue] === undefined
            )
          ) {
            blockItems[value].width =
              blockItems[nextValue].x - blockItems[value].x;
          }
        });
      }
    }

    setItems(blockItems);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDrag(true);
    setClientX(event.clientX);
    setClientY(event.clientY);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDrag) {
      const dx: number = event.clientX - clientX;
      const dy: number = event.clientY - clientY;
      const newItems: ItemInfo[] = items.map((item) =>
        item.id === activeID
          ? { ...item, x: event.clientX - deltaX, y: event.clientY - deltaY }
          : { ...item, x: item.x + dx, y: item.y + dy }
      );
      setItems(newItems);
      setClientX(event.clientX);
      setClientY(event.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsDrag(false);
    setActiveID(-1);
  };

  const handleClick = (id: number, deltaX: number, deltaY: number) => {
    setIsDrag(true);
    setActiveID(id);
    setDeltaX(deltaX);
    setDeltaY(deltaY);
  };

  return (
    <div
      className="h-full cursor-move"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {items.map((item) => (
        <MainItem
          key={item.id}
          item={item}
          setClick={handleClick}
          setAdd={handleAdd}
        />
      ))}
    </div>
  );
};

export default Main;
