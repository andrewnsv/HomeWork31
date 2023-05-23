import * as React from "react";
import { styled } from "@mui/material/styles";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import HeroTablePagination from "./HeroPagination";
import HeroTableBody from './HeroTableBody'
import { useDispatch, useSelector } from "react-redux";
import { fetchHeroes } from "../../slices/heroesSlice";
import { HeroesState } from '../../slices/heroesSlice'
import { AppDispatch } from '../../store/store'

export const StyledTableCell = styled(TableCell)(({ theme }) => {
  return {
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
  };
});

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const HeroTable: React.FC = () => {
  const [page, setPage] = React.useState<number>(0);
  const rowsPerPage = 20;

  const dispatch = useDispatch<AppDispatch>();
  const { listOfСharacter, infoPage, isLoading } = useSelector(
    (state: { heroes: HeroesState }) => state.heroes
  );

  React.useEffect(() => {
    const offset = page * rowsPerPage;
    dispatch(fetchHeroes(offset / rowsPerPage + 1));
  }, [dispatch, page]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  if (isLoading && listOfСharacter.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "77vh",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TableContainer
        sx={{
          background: "transparent",
          mt: 3,
          boxShadow: "none",
          maxHeight: 700,
          maxWidth: 555,
        }}
        component={Paper}
      >
        <Table
          sx={{ overflowY: "scroll", maxWidth: 555 }}
          aria-label="customized table"
        >
          <TableHead sx={{ position: "sticky", top: 0 }}>
            <TableRow>
              <StyledTableCell style={{ width: "24px" }} align="center">
                ID
              </StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell style={{ width: "75px" }} align="center">
                Status
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <HeroTableBody
            isLoading={isLoading}
            listOfСharacter={listOfСharacter}
            rowsPerPage={rowsPerPage}
          />
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeroTablePagination
          component={"div"}
          // rowsPerPageOptions={[]}
          count={infoPage?.count !== undefined ? infoPage.count : 0}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage=""
        />
      </Box>
    </Box>
  );
};

export default HeroTable;