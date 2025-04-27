import React from 'react';

export default function Notification({ message }) {
    return (
        <div style={{ marginTop: '20px', fontStyle: 'italic' }}>
            <p>{message}</p>
        </div>
    );
}
