import React, { useState } from 'react';

function Report() {
    const [reportText, setReportText] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Log the report text and display the success message
        console.log(reportText);
        setSuccessMessage('Report submitted successfully!');
        setReportText(''); // Clear the input after submission

        // Clear the success message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000); // 3000ms = 3 seconds
    };

    return (
        <div className="report-container">
            <h1>Submit a Report</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={reportText}
                    onChange={(e) => setReportText(e.target.value)}
                    placeholder="Describe your report here..."
                    rows="6"
                    required
                />
                <button type="submit">Submit Report</button>
            </form>
            {successMessage && <p>{successMessage}</p>}
        </div>
    );
}

export default Report;
