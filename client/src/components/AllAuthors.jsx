import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

const AllAuthors = ({allAuthors, deleteAuthor}) => {
    const deleteHandler = event => {
        const authorId = event.target.id;
        deleteAuthor(authorId);
    }

    return(
        <div>
            <Link to={'/authors/new'}>Add a New Author</Link>
            <h3>We Have Quotes By:</h3>
            <table className=" table table-striped">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Actions Available</th>
                    </tr>
                </thead>
                <tbody>
                    {allAuthors.map( author => {
                        return(
                            <tr key={author._id}>
                                <td>{author.name}</td>
                                <td><Link to={`/authors/edit/${author._id}`}>Edit</Link> | <span className="fake-link" onClick={deleteHandler} id={author._id}>Delete</span></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AllAuthors;