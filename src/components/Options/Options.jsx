import React from 'react';

export default function Options({ onLeaveFeedback, totalFeedback }) {
    return (
        <div style={{ marginTop: '20px' }}>
            <button onClick={() => onLeaveFeedback('good')}>Good</button>
            <button onClick={() => onLeaveFeedback('neutral')}>Neutral</button>
            <button onClick={() => onLeaveFeedback('bad')}>Bad</button>
            {totalFeedback > 0 && (
                <button onClick={() => onLeaveFeedback('reset')}>Reset</button>
            )}
        </div>
    );
}
