import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const NewAuthor = ({allAuthors, setAllAuthors}) => {
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const newAuthorHandler = event => {
        event.preventDefault();
        const newAuthor = {
            name
        }
        axios.post("http://localhost:8000/api/authors", newAuthor)
            .then(res => {
                setAllAuthors([...allAuthors, res.data])
                navigate("/authors")
            })
            .catch (err => {
                const errArray = [];
                for (const key of Object.keys(err.response.data.errors)){
                    errArray.push(err.response.data.errors[key].message)
                }
                setErrors(errArray);
            })
    }
    return(
        <div>
            <Link to="/authors">Home</Link>
            <h3>Add a New Author</h3>
            <form onSubmit={newAuthorHandler}>
                <div style={{color: "red"}}>
                    {
                        errors.map( (err, idx) => {
                            return(
                                <p key={idx}>{err}</p>
                            )
                        })
                    }
                </div>
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

export default NewAuthor;