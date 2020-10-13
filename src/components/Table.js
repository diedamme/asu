import React from 'react';
import PersonList from './PersonList';

const Table = () => {
    return (
        <table>
            <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th></th>
            </tr>
            <PersonList />
        </table>
    )
}

export default Table