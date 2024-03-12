import { useEffect, useState } from 'react';
import axios from 'axios';

function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState('');

    return (
        <div>
            <SearchBar 
                filterText={filterText}
                onFilterTextChange={setFilterText}/>
            <ProductTable 
                products={products} 
                filterText={filterText}/>
        </div>
    );
}

function ProductRow({ product }) {
    return (
        <tr>
            <td className="tablecell">{product.id}</td>
            <td className="tablecell">{product.name}</td>
            <td className="tablecell">{product.description}</td>
            <td className="tablecell">{product.category}</td>
            <td className="tablecell">{product.sustainability_factor}</td>
            <td className="tablecell"><img src={product.image_link} alt={product.name} width="100" /></td>
        </tr>
    );
}

function ProductTable({ products, filterText }) {
    const rows = [];
    products.forEach((product) => {
        if (
            product.name.toLowerCase().indexOf(
                filterText.toLowerCase()
            ) !== -1
        ) {
            rows.push(
                <ProductRow
                    product={product}
                    key={product.name} />
            );
        }
    });
    return (
        <table>
            <thead>
                <tr>
                    <th className="tablecell">ID</th>
                    <th className="tablecell">Name</th>
                    <th className="tablecell">Description</th>
                    <th className="tablecell">Category</th>
                    <th className="tablecell">Sustainability Factor</th>
                    <th className="tablecell">Image</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
}

function SearchBar({
    filterText,
    onFilterTextChange,
}) {
    return (
        <form>
            <input 
                type="text" 
                value={filterText} placeholder="Search..." 
                onChange={(e) => onFilterTextChange(e.target.value)} />
        </form>
    );
}

export default function ProductSearch() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchData();
    }, []);
    return <FilterableProductTable products={products} />;
}
