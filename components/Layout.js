import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <div class="container">
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
        <div class="logo-text">
          <h1>PremTracker</h1>
          <h2>2023/24</h2>
        </div>
      </header>
      {children}
      <footer>
        <p>Standings and team data provided by <a href="https://www.football-data.org/">football-data.org</a>. Stadium capacities provided by Wikipedia (Updated Dec 2023). Salary data provided by <a href="https://www.spotrac.com/epl/payroll/">spotrac.com</a>. (Updated Dec 2023) Not associated with the Premier League.</p>
      </footer>
    </div>
  )
}
