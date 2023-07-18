import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import axios from 'axios';
import AllAuthors from './AllAuthors';
import NewAuthor from './NewAuthor';
import EditAuthor from './EditAuthor';

const Home = (props) => {
    const [allAuthors, setAllAuthors] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/authors')
            .then( res => setAllAuthors(res.data))
            .catch( err => console.log(err));
    }, [])

    const deleteAuthor = (id) => {
        axios.delete(`http://localhost:8000/api/authors/${id}`)
            .then( res => {
                const updatedAllAuthors = allAuthors.filter( author => author._id !== res.data._id)
                setAllAuthors(updatedAllAuthors);
                navigate("/authors");
            })
            .catch( err => console.log(err));
    }

    return(
        <div>
            <h1>Favorite Authors</h1>
            <Routes>
                <Route path="/" element={<AllAuthors allAuthors={allAuthors} deleteAuthor={deleteAuthor} default/>}/>
                <Route path="/new" element={<NewAuthor allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
                <Route path="/edit/:id" element={<EditAuthor allAuthors={allAuthors} setAllAuthors={setAllAuthors}/>}/>
            </Routes>
        </div>
    );
}

export default Home;