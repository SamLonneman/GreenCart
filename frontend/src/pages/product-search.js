import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductSearch = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchData();
    }, []);
    return (
        <div>
            {/* TODO: Clean this up. This was just proof of concept for retreival from database */}
            <table>
                <thead>
                    <tr>
                        <th style = {{ padding: '10px', textAlign: 'center' }}>ID</th>
                        <th style = {{ padding: '10px', textAlign: 'center' }}>Name</th>
                        <th style = {{ padding: '10px', textAlign: 'center' }}>Description</th>
                        <th style = {{ padding: '10px', textAlign: 'center' }}>Category</th>
                        <th style = {{ padding: '10px', textAlign: 'center' }}>Sustainability Factor</th>
                        <th style = {{ padding: '10px', textAlign: 'center' }}>Image</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{product.id}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{product.name}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{product.description}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{product.category}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>{product.sustainability_factor}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}><img src={product.image_link} alt={product.name} width="100" /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default ProductSearch;