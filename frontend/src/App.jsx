import { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';
import Table from './components/Table/index';
import Search from './components/Search/index';
import Genre from './components/Genre/index';
import Sort from './components/Sort/index';
import Pagination from './components/Pagination/index';

const base_url = import.meta.env.VITE_REACT_APP_API_URL;

function App() {
    const [obj, setObj] = useState({});
    const [sort, setSort] = useState({ sort: "rating", order: "desc" });
    const [filterGenre, setFilterGenre] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const getAllMovies = async () => {
            try {
                const url = `${base_url}?page=${page}&sort=${sort.sort},${sort.order
                    }&genre=${filterGenre.toString()}&search=${search}`;
                console.log(url);
                const { data } = await axios.get(url);
                setObj(data);
            } catch (err) {
                console.log(err);
            }
        };

        getAllMovies();
    }, [sort, filterGenre, page, search]);

    return (
        <div className="wrapper">
            <div className="container">
                <div className="head">
                    <img src="./images/logo.png" alt="logo" className="logo" />
                </div>
                <div className="body">
                    <div className="table_container">
                        <Table movies={obj.movies ? obj.movies : []} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
