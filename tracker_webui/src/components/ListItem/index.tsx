import Filter from "./Filter";
import Paginator from "./Paginator";
import Table from "./Table";

import { ListItemProvider } from "@/providers";

export default function ListItem(): JSX.Element {
  return (
    <ListItemProvider>
      <Filter />
      <Table />
      <Paginator />
    </ListItemProvider>
  );
}
