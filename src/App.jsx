import React, { useState, useEffect } from 'react';
import Description from './components/Description/Description.jsx';
import Options from './components/Options/Options.jsx';
import Feedback from './components/Feedback/Feedback.jsx';
import Notification from './components/Notification/Notification.jsx';

export default function App() {
    const [feedback, setFeedback] = useState(() => {
        const savedFeedback = localStorage.getItem('feedback');
        return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
    });

    useEffect(() => {
        localStorage.setItem('feedback', JSON.stringify(feedback));
    }, [feedback]);

    const handleFeedback = (type) => {
        if (type === 'reset') {
            setFeedback({ good: 0, neutral: 0, bad: 0 });
        } else {
            setFeedback((prevFeedback) => ({
                ...prevFeedback,
                [type]: prevFeedback[type] + 1,
            }));
        }
    };

    const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

    return (
        <div style={{ padding: '20px' }}>
            <Description />
            <Options onLeaveFeedback={handleFeedback} totalFeedback={totalFeedback} />
            {totalFeedback > 0 ? (
                <Feedback
                    good={feedback.good}
                    neutral={feedback.neutral}
                    bad={feedback.bad}
                    total={totalFeedback}
                />
            ) : (
                <Notification message="No feedback yet" />
            )}
        </div>
    );
}