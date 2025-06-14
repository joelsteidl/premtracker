'use client'

import MicroModal from 'micromodal'
import type { ClubNavProps } from '@/types'
import TeamLogo from './TeamLogo'
import './club-nav.css'

export default function ClubNav({ team }: ClubNavProps) {
  const targetId = `club-${team.tla.toLowerCase()}`
  const isInverse = ['lut', 'not', 'tot'].includes(team.tla.toLowerCase())
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    console.log('ClubNav clicked, target:', targetId)
    
    // Close the modal first
    const menuButton = document.querySelector('#menu-button')
    if (menuButton) {
      console.log('Closing modal and resetting button state')
      MicroModal.close('nav-modal')
      menuButton.classList.remove('is-active')
      menuButton.setAttribute('aria-label', 'Open navigation')
      document.body.classList.remove('modal-is-open')
    }
    
    // Wait for modal to close then scroll
    setTimeout(() => {
      const element = document.getElementById(targetId)
      console.log('Looking for element:', targetId, 'Found:', element)
      if (element) {
        console.log('Scrolling to element')
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      } else {
        console.error('Element not found:', targetId)
      }
    }, 400) // Wait for modal transition to complete
  }
  
  return (
    <a
      className={`club-nav club-${team.tla.toLowerCase()}${isInverse ? ' inverse' : ''}`}
      href={`/#${targetId}`}
      onClick={handleClick}
    >
      <div className="club-nav-logo">
        <TeamLogo
          teamTla={team.tla}
          teamName={team.name}
          apiLogoUrl={team.crest}
          width={30}
          height={30}
          style={{ objectFit: 'contain', width: 'auto', height: '30px' }}
        />
      </div>
      <span className="club-nav-name">{team.name}</span>
    </a>
  )
}
