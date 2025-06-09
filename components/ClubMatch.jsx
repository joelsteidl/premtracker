import React from 'react';
import { formatMatchDate } from '../utils/dateUtils';

const ClubMatch = ({ match, teamId }) => {
  return (
    <div className="match">
      <h3>{`Matchweek ${match.matchday} - ${formatMatchDate(match.utcDate)}`}</h3>
    </div>
  );
}

export default ClubMatch;