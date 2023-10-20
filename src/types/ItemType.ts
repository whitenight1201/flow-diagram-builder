export interface ItemInfo {
  id: number;
  x: number;
  y: number;
  title: string;
  outline?: string;
  bgcolor: string;
  parent: number;
  children: number[];
  isLeaf: boolean;
  width: number;
  visiblebtn?: boolean;
}

export interface MainItemProps {
  item: ItemInfo;
  setClick: any;
  setAdd: any;
}
