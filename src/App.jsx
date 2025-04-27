import React, { useState, useEffect } from 'react';
import Description from './Components/Description';
import Options from './Components/Options';
import Feedback from './Components/Feedback';
import Notification from './Components/Notification';

export default function App() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    useEffect(() => {
        const savedFeedback = JSON.parse(localStorage.getItem('feedback'));

        if (savedFeedback) {
            setGood(savedFeedback.good || 0);
            setNeutral(savedFeedback.neutral || 0);
            setBad(savedFeedback.bad || 0);
        }
    }, []);

    useEffect(() => {
        const feedbackToSave = { good, neutral, bad };
        localStorage.setItem('feedback', JSON.stringify(feedbackToSave));
    }, [good, neutral, bad]);

    const handleFeedback = (type) => {
        if (type === 'good') setGood(prev => prev + 1);
        if (type === 'neutral') setNeutral(prev => prev + 1);
        if (type === 'bad') setBad(prev => prev + 1);
        if (type === 'reset') {
            setGood(0);
            setNeutral(0);
            setBad(0);
        }
    };

    const totalFeedback = good + neutral + bad;
    const positivePercentage = totalFeedback ? Math.round((good / totalFeedback) * 100) : 0;

    return (
        <div style={{ padding: '20px' }}>
            <Description />
            <Options onLeaveFeedback={handleFeedback} />
            {totalFeedback > 0 ? (
                <Feedback
                    good={good}
                    neutral={neutral}
                    bad={bad}
                    total={totalFeedback}
                    positivePercentage={positivePercentage}
                />
            ) : (
                <Notification message="No feedback yet" />
            )}
        </div>
    );
}
