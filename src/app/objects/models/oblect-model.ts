export interface objectItem {
  [key: string]: objectItem | string | number;
}

export interface objectOutputItem {
  data: string;
  level: number;
}

export interface ForDirectiveContext<T> {
  $implicit: objectOutputItem;
}
