import React, { useState, useEffect, ChangeEvent  } from "react";
import { Container, Box, Typography, Pagination } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { fetchEpisodes, EpisodeState } from "../slices/episodesSlice";
import { AppDispatch } from '../store/store'

const EpisodesInfo: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const dispatch = useDispatch<AppDispatch>();
  const { listOfEpisodes, infoPage, isLoading } = useSelector(
    (state: { episodes: EpisodeState }) => state.episodes
  );

  useEffect(() => {
    dispatch(fetchEpisodes(page));
  }, [dispatch, page]);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {isLoading && (
          <Typography sx={{ textAlign: "center", mt: 3 }}>
            Loading...
          </Typography>
        )}
        {!isLoading && (
          <>
            {listOfEpisodes.map((item, index) => {
              return (
                <Box sx={{ display: "flex", mt: 2, mb: 2 }} key={index}>
                  <Box mr={1}>
                    <Typography>{`${item.id}.`}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignContent: "flex-start" }}>
                    <Typography mr={1}>
                      <b>Name: </b>
                      {item.name}
                    </Typography>
                    <Typography mr={1}>
                      <b>Date: </b>
                      {item.air_date}
                    </Typography>
                    <Typography mr={1}>
                      <b>Episod: </b>
                      {item.episode}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 3,
          mb: 3,
        }}
      >
        <Pagination
          count={infoPage?.pages}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default EpisodesInfo;