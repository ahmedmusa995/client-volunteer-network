import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './admin.css'

const TableBody = (props) => {
    const { name, fullName, email, _id, date, task } = props.tableData;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleDelete = (id) => {
        fetch(`https://volunteer--network.herokuapp.com/cancelRegistration/?id=${id}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status === 200) {
                    setShow(true)
                }
            })
    };
    useEffect(() => {
        handleDelete();
    }, [])

    return (
        <tr>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <h5 className="text-danger ">Cancelled Successfully <FontAwesomeIcon icon={faTrashAlt} /></h5>
                    <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
                </Modal.Body>
            </Modal>
            <td>{name || fullName}</td>
            <td>{email}</td>
            <td>{date}</td>
            <td>{task}</td>
            <td>
                <button onClick={() => handleDelete(_id)} className="delete-icon bg-danger text-light rounded" ><FontAwesomeIcon icon={faTrashAlt} /></button>
            </td>
        </tr>
    );
};

export default TableBody;