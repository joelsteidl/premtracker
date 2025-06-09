import { Team } from '@/types'
import NavigationContent from './NavigationContent'
import './navigation.css'

interface NavigationProps {
  sortedTeams: Team[]
}

export default function Navigation({ sortedTeams }: NavigationProps) {
  return (
    <>
      <button 
        id="menu-button" 
        className="hamburger hamburger--spin hamburger-button" 
        type="button" 
        aria-label="Open Menu" 
        aria-controls="navigation" 
        aria-expanded="false"
      >
        <span className="hamburger-box">
          <span className="hamburger-inner"></span>
        </span>
      </button>

      <div id="nav-modal" className="modal" aria-hidden="true">
        <div tabIndex={-1} data-micromodal-close>
          <NavigationContent sortedTeams={sortedTeams} />
        </div>
      </div>
    </>
  )
}
