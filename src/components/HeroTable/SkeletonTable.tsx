import * as React from 'react'
import { Skeleton } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./CharapterTable";

const SkeletonTableRow: React.FC = () => (
    <StyledTableRow>
      <StyledTableCell style={{ width: "24px" }} align="center">
        <Skeleton />
      </StyledTableCell>
      <StyledTableCell align="left">
        <Skeleton />
      </StyledTableCell>
      <StyledTableCell style={{ width: "75px" }} align="center">
        <Skeleton />
      </StyledTableCell>
    </StyledTableRow>
  );

export default SkeletonTableRow;