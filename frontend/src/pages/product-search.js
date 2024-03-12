import './pages.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductSearch() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchData();
    }, []);
    const columns = ['ID', 'Name', 'Description', 'Category', 'Sustainability Factor', 'Image'];
    const productProperties = ['id', 'name', 'description', 'category', 'sustainability_factor'];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column} className="tablecell">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            {productProperties.map((property) => (
                                <td className="tablecell" key={property}>
                                    {product[property]}
                                </td>
                            ))}
                            <td className="tablecell">
                                <img src={product.image_link} alt={product.name} width="100" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
