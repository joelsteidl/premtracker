import ClubNav from "./ClubNav";
import Head from 'next/head';
import { useEffect } from 'react';
import MicroModal from 'micromodal';
import { scroller } from 'react-scroll';

export default function RootLayout({ children, sortedTeams }) {
  useEffect(() => {
    const menuButton = document.querySelector('#menu-button');
    const closeElements = document.querySelectorAll('.club-nav');

    const toggleModal = () => {
      if (menuButton.classList.contains('is-active')) {
        MicroModal.close('nav-modal');
        menuButton.classList.remove('is-active');
        menuButton.setAttribute('aria-label', 'Open navigation');
      } else {
        MicroModal.show('nav-modal', {
          disableScroll: true
        });
        menuButton.classList.add('is-active');
        menuButton.setAttribute('aria-label', 'Close navigation');
      }
    };

    closeElements.forEach(element => {
      element.addEventListener('click', (event) => {
        // prevent the default action
        event.preventDefault();

        // get the id of the target element
        const id = event.currentTarget.getAttribute('href');
        const targetElement = id.startsWith('/#') ? id.substring(2) : id;

        // scroll to the anchor only if the modal is open
        if (menuButton.classList.contains('is-active') && targetElement) {
          scroller.scrollTo(targetElement, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart'
          });

          toggleModal();
        }
      });
    });

    menuButton.addEventListener('click', toggleModal);

    // clean up the event listener when the component unmounts
    return () => {
      menuButton.removeEventListener('click', toggleModal);
      closeElements.forEach(element => {
        element.removeEventListener('click', toggleModal);
      });
    };
  }, []);
  return (
    <div className="container">
      <Head>
        <title>PremTracker 2023/24</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <header>
        <img
          className="logo"
          src="/pl_logo_white.png"
          alt="PL Standings"
          width="90"
        />
        <div className="logo-text">
          <h1>PremTracker</h1>
          <h2>2023/24</h2>
        </div>
      </header>
      <main>
        <button id="menu-button" className="hamburger hamburger--spin hamburger-button" type="button" aria-label="Open Menu" aria-controls="navigation" aria-expanded="false">
          <span className="hamburger-box">
            <span className="hamburger-inner"></span>
          </span>
        </button>
        {children}
      </main>
      <footer>
        <p>Standings and team data provided by <a href="https://www.football-data.org/">football-data.org</a>. Stadium capacities provided by Wikipedia (Updated Dec 2023). Salary data provided by <a href="https://www.spotrac.com/epl/payroll/">spotrac.com</a>. (Updated Dec 2023) Not associated with the Premier League.</p>
      </footer>
      <div id="nav-modal" className="modal" aria-hidden="true">
        <div tabIndex="-1" data-micromodal-close>
          <nav role="dialog" aria-modal="true">
            {sortedTeams.map((team) => (
              <ClubNav team={team} key={`nav-${team.id}`} />
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
