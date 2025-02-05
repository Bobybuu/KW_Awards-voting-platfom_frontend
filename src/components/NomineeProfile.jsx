import React, { useState } from 'react';

const NomineeProfile = ({ nominee }) => {
    const [voteCount, setVoteCount] = useState(nominee.voteCount);

    const handleVote = () => {
        // Integrate M-Pesa payment here
        // On successful payment, increment vote count
        setVoteCount(voteCount + 1);
    };

    const shareProfile = () => {
        const profileLink = `${window.location.origin}/nominee/${nominee.id}`;
        navigator.clipboard.writeText(profileLink);
        alert('Profile link copied to clipboard!');
    };

    return (
        <div className="nominee-profile">
            <img src={nominee.image} alt={`${nominee.name}'s profile`} />
            <h2>{nominee.name}</h2>
            <p>{nominee.bio}</p>
            <p>Category: {nominee.category}</p>
            <button onClick={handleVote}>Vote</button>
            <button onClick={shareProfile}>Share Profile</button>
            <p>Votes: {voteCount}</p>
        </div>
    );
};

export default NomineeProfile;