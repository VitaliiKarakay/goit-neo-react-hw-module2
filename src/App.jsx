import React, { useState, useEffect } from 'react';
import Description from './Components/Description';
import Options from './Components/Options';
import Feedback from './Components/Feedback';
import Notification from './Components/Notification';

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
    const positivePercentage = totalFeedback
        ? Math.round((feedback.good / totalFeedback) * 100)
        : 0;

    return (
        <div style={{ padding: '20px' }}>
            <Description />
            <Options onLeaveFeedback={handleFeedback} />
            {totalFeedback > 0 ? (
                <Feedback
                    good={feedback.good}
                    neutral={feedback.neutral}
                    bad={feedback.bad}
                    total={totalFeedback}
                    positivePercentage={positivePercentage}
                />
            ) : (
                <Notification message="No feedback yet" />
            )}
        </div>
    );
}