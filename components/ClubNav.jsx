import Link from 'next/link';
import { useRouter } from 'next/router';

const ClubNav = ({ team }) => {
  const router = useRouter();
  const isInverse = ['lut', 'not', 'tot'].includes(team.tla.toLowerCase());
  return (
    <Link className={['club-nav', `club-${team.tla.toLowerCase()}`, isInverse ? 'inverse' : ''].filter(Boolean).join(' ')} href={`${router.pathname}#club-${team.tla.toLowerCase()}`}>
      <span className="club-nav-logo">
        <img src={`/club-logos/${team.tla.toLowerCase()}.png`} alt={`${team.shortName} Crest`} height="50" />
      </span>
      <span className="club-nav-name">{team.shortName}</span>
    </Link>
  );
}

export default ClubNav
