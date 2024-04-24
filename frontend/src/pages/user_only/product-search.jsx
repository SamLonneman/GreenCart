import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Container, TextField, IconButton, Grid, Box, ThemeProvider, createTheme, Link } from '@mui/material';
import { green } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/material/Typography';
import Footer from '../footer';

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
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: 'green', mb: 2, mt: 6 }}>
          Product Search
        </Typography>
        <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
          <form onSubmit={handleSearch}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs>
                <TextField 
                  label="Search" 
                  variant="outlined" 
                  fullWidth
                  onChange={handleSearchChange}
                />
              </Grid>
              <Grid item>
                <IconButton color="primary" type="submit">
                  <SearchIcon color="primary" />
                </IconButton>
              </Grid>
            </Grid>
          </form>
        </Container>
        <Box ml={15} mr={15} mb={15}>
          <div style={{ height: products.length === 0 || isLoading ? 400 : 'auto' }}>
            <DataGrid
              rows={isLoading ? [] : products}
              columns={[
                { field: 'price', headerName: 'Price', headerClassName: 'header-cell', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => `$${params.value}`},
                { field: 'name', headerName: 'Name', headerClassName: 'header-cell', flex: 4},
                { field: 'category', headerName: 'Category', headerClassName: 'header-cell', flex: 2},
                { field: 'sustainability_factor', headerName: 'Sustainability Score', headerClassName: 'header-cell', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => `${Math.round(params.value)}/100`},
                { field: 'image_link', headerName: 'Where to Purchase', headerClassName: 'header-cell', headerAlign: 'center', align: 'center', flex: 1, renderCell: (params) => (
                  <Link href={params.value} target="_blank" rel="noopener noreferrer">
                    Walmart
                  </Link>
                )},
              ]}
              loading={isLoading}
              hideFooter
            />
          </div>
        </Box>
      </div>
      <Footer />
    </ThemeProvider>
  );
};
export default ProductSearch;