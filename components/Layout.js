import ClubNav from "./ClubNav";
import Head from 'next/head';
import { useEffect } from 'react';
import MicroModal from 'micromodal';
import smoothscroll from 'smoothscroll-polyfill';

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
        const targetElement = document.querySelector(id.startsWith('/') ? id.substring(1) : id);

        // scroll to the anchor only if the modal is open
        if (menuButton.classList.contains('is-active') && targetElement) {
          smoothscroll.polyfill();
          targetElement.scrollIntoView({ behavior: 'smooth' });
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
        <button id="menu-button" className="hamburger hamburger--spin" type="button" aria-label="Open Menu" aria-controls="navigation" aria-expanded="false">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
        {children}
      </main>
      <footer>
        <p>Standings and team data provided by <a href="https://www.football-data.org/">football-data.org</a>. Stadium capacities provided by Wikipedia (Updated Dec 2023). Salary data provided by <a href="https://www.spotrac.com/epl/payroll/">spotrac.com</a>. (Updated Dec 2023) Not associated with the Premier League.</p>
      </footer>
      <div id="nav-modal" className="modal" aria-hidden="true">
        <div tabindex="-1" data-micromodal-close>
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
