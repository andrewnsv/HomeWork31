import * as React from "react";
import { TablePagination } from "@mui/material";

interface HeroTablePaginationProps {
  component: string;
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  labelRowsPerPage: string;
}

const HeroTablePagination: React.FC<HeroTablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[]}
      count={count}
      page={page}
      onPageChange={onPageChange}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onRowsPerPageChange}
      labelRowsPerPage=""
    />
  );
};

export default HeroTablePagination;
