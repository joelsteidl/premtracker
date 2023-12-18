const ClubCardStat = ({ label, rank, value, suffix }) => {
  return (
    <div className="club-card-stat">
      <div className="club-card-stat-intro">
        <span className="club-card-stat-label">{label}</span>
        {rank && <span className="club-card-stat-rank">{`#${rank}`}</span>}
      </div>
      <div className="club-card-stat-body">
        <span className="club-card-stat-value">{value}</span>
        {suffix && <span className="club-card-stat-suffix">{suffix}</span>}
      </div>
    </div>
  );
}

export default ClubCardStat;
