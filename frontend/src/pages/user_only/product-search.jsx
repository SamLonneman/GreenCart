import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, IconButton, Grid, Box, ThemeProvider, createTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/material/Typography';

import '../pages.css';


const theme = createTheme({
  palette: {
    primary: green
  },
});

const ProductSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    if (event)
      event.preventDefault();
    setIsLoading(true);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/products?contains=${searchTerm}&page_size=10`);
    setProducts(response.data.results);
    setIsLoading(false);
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Box mt={10} mb={5}>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', color: 'green', mb: 2 }}>Product Search</Typography>
            </Grid>
            <Grid item>
              <form onSubmit={handleSearch}>
                <TextField 
                  label="Search" 
                  variant="outlined" 
                  onChange={handleSearchChange}
                />
                <IconButton color="primary" type="submit">
                  <SearchIcon color="primary" />
                </IconButton>
              </form>
            </Grid>
          </Grid>
        </Box>
        <Box ml={15} mr={15} mb={15}>
          <div style={{ height: products.length === 0 || isLoading ? 400 : 'auto' }}>
            <DataGrid
              rows={isLoading ? [] : products}
              columns={[
                { field: 'price', headerName: 'Price', flex: 1,
                  renderCell: (params) => `$${params.value}`
                },
                { field: 'name', headerName: 'Name', flex: 2},
                { field: 'category', headerName: 'Category', flex: 1},
                { field: 'sustainability_factor', headerName: 'Sustainability Factor', flex: 1},
                { field: 'image_link', headerName: 'Image', flex: 2, renderCell: (params) => (
                  <img src={params.value} style={{width: '100px', height: 'auto'}}/>
                )},
              ]}
              loading={isLoading}
              hideFooter
            />
          </div>
        </Box>
      </div>
    </ThemeProvider>
  );
};
export default ProductSearch;