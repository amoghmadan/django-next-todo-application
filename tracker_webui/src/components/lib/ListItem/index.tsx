import Filter from "./Filter";
import Paginator from "./Paginator";
import Table from "./Table";

import { ListItemProvider } from "@/components/lib/ListItem/context";

export default function ListItem(): JSX.Element {
  return (
    <ListItemProvider>
      <Filter />
      <Table />
      <Paginator />
    </ListItemProvider>
  );
}
