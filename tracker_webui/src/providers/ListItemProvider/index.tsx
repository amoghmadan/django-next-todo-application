import { IProps } from "./types";
import { ListItemContext } from "@/contexts";
import { useListItem } from "@/hooks";

export default function ListIncidentProvider(props: IProps): JSX.Element {
  const [itemList, loading, filters, setFilters] = useListItem();

  return (
    <ListItemContext.Provider
      value={{ itemList, loading, filters, setFilters }}
    >
      {props.children}
    </ListItemContext.Provider>
  );
}
