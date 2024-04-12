import { DUMMY_EQUIPMENTS } from "../../dummy_data/dummy_equipments";
import classes from "./EquipmentsPage.module.css";
import EquipmentsPagination from "./EquipmentsPagination";
import { useSearchParams } from "react-router-dom";

export default function EquipmentsPage() {
  const [searchParams] = useSearchParams();
  let content;
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const maxItemsPerPage = 10;
  const maxPage = Math.ceil(DUMMY_EQUIPMENTS.length / maxItemsPerPage);
  
  if (currentPage > 0 && currentPage <= maxPage) {
    content = (
      <section className={classes.sectionContainer}>
        <EquipmentsPagination
          currentPage={currentPage}
          maxItems={DUMMY_EQUIPMENTS.length}
          maxPage={maxPage}
        />
      </section>
    );
  } else {
    content = <p>Sorry, nothing found.</p>;
  }

  return content;
}
