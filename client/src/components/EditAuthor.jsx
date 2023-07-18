import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';

const EditAuthor = ({allAuthors, setAllAuthors}) => {
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/authors/${id}`)
            .then( res => {
                setName(res.data.name)
            })
            .catch( err => console.log(err));
    }, [id])

    const updateAuthorHandler = event => {
        event.preventDefault();
        const editAuthor = {
            name
        }
        axios.patch(`http://localhost:8000/api/authors/${id}`, editAuthor)
            .then( res => {
                const updatedAuthor = res.data;
                const updatedAllAuthors = allAuthors.map( author => {
                    return author._id === updatedAuthor._id ? updatedAuthor : author;
                })
                setAllAuthors(updatedAllAuthors);
                navigate("/authors");
            })
            .catch(err => console.log(err));
    }

    return(
        <div>
            <Link to ="/authors">Home</Link>
            <h3>Edit This Author</h3>
            <form onSubmit={updateAuthorHandler}>
                <div>
                    <label htmlFor="name">Name:</label>
                </div>
                <div>
                    <input type="text" name="name" id="name" value={name} onChange={event => setName(event.target.value)}/>
                </div>
                <Link to="/authors"><button>Cancel</button></Link> <button>Submit</button>
            </form>
        </div>
    );
}

export default EditAuthor;