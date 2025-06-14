'use client'

import { useState } from 'react'
import Image from 'next/image'

interface TeamLogoProps {
  teamTla: string
  teamName: string
  apiLogoUrl?: string
  width: number
  height: number
  className?: string
  style?: React.CSSProperties
}

export default function TeamLogo({ 
  teamTla, 
  teamName, 
  apiLogoUrl, 
  width, 
  height, 
  className,
  style 
}: TeamLogoProps) {
  const [useLocalLogo, setUseLocalLogo] = useState(true)
  const [useFallback, setUseFallback] = useState(false)

  const localLogoPath = `/club-logos/${teamTla.toLowerCase()}.png`
  
  const handleLocalError = () => {
    console.log(`Local logo not found for ${teamTla}, trying API logo`)
    setUseLocalLogo(false)
  }

  const handleApiError = () => {
    console.log(`API logo failed for ${teamTla}, using fallback`)
    setUseFallback(true)
  }

  // Fallback when no logo is available
  if (useFallback) {
    return (
      <div 
        className={`team-logo-fallback ${className || ''}`}
        style={{
          width,
          height,
          backgroundColor: '#333',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: Math.min(width, height) * 0.3,
          fontWeight: 'bold',
          ...style
        }}
      >
        {teamTla}
      </div>
    )
  }

  // Try API logo if local failed
  if (!useLocalLogo && apiLogoUrl) {
    return (
      <Image
        src={apiLogoUrl}
        alt={`${teamName} crest`}
        width={width}
        height={height}
        className={className}
        style={style}
        onError={handleApiError}
      />
    )
  }

  // Default to local logo
  return (
    <Image
      src={localLogoPath}
      alt={`${teamName} crest`}
      width={width}
      height={height}
      className={className}
      style={style}
      onError={handleLocalError}
    />
  )
}
