import * as React from "react";
import { TableBody } from "@mui/material";

import SkeletonTableRow from "./SkeletonTable";
import BasicModal from "./HeroModalInfo";
import { StyledTableCell, StyledTableRow } from "./CharapterTable";
import { Character } from "../../slices/heroesSlice";

interface HeroTableBodyProps {
  isLoading: boolean;
  listOfСharacter: Character[];
  rowsPerPage: number;
}

const HeroTableBody: React.FC<HeroTableBodyProps> = ({
  isLoading,
  listOfСharacter,
  rowsPerPage,
}) => {
  const [selectedHero, setSelectedHero] = React.useState<Character | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const openModal = (id: number) => {
    const hero = listOfСharacter.find((hero) => hero.id === id);
    setSelectedHero(hero as Character);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <TableBody>
        {[...Array(rowsPerPage)].map((_, index) => (
          <SkeletonTableRow key={index} />
        ))}
      </TableBody>
    );
  }

  return (
    <>
      <TableBody>
        {listOfСharacter.map((row, index) => (
          <StyledTableRow
            sx={{
              "&:hover": {
                backgroundColor: "lightgray",
                cursor: "pointer",
              },
            }}
            key={index}
            onClick={() => openModal(row.id)}
          >
            <StyledTableCell
              align="center"
              style={{ borderRight: "0.5px solid rgb(0, 0, 0, 0.3)" }}
            >
              {row.id}
            </StyledTableCell>
            <StyledTableCell align="left" component="th" scope="row">
              {row.name}
            </StyledTableCell>
            <StyledTableCell align="center">{row.status}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
      <BasicModal data={selectedHero} open={open} setOpen={setOpen} />
    </>
  );
};

export default HeroTableBody;
