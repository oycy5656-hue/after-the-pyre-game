export default function Emblem({ type = 'flame', size = 48, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.4,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `emblem ${className}`,
    'aria-hidden': true,
  }

  if (type === 'sun-gate') {
    return (
      <svg {...common}>
        <circle cx="32" cy="28" r="10" />
        <path d="M32 8v7M32 42v7M12 28h7M45 28h7M18 14l5 5M41 37l5 5M46 14l-5 5M23 37l-5 5" />
        <path d="M19 56V44c0-7 6-12 13-12s13 5 13 12v12" />
        <path d="M14 56h36" />
      </svg>
    )
  }

  if (type === 'sun-eye') {
    return (
      <svg {...common}>
        <path d="M6 32c7-10 15-15 26-15s19 5 26 15c-7 10-15 15-26 15S13 42 6 32Z" />
        <circle cx="32" cy="32" r="8" />
        <path d="M32 5v8M32 51v8M5 32h8M51 32h8" />
      </svg>
    )
  }

  if (type === 'three-bars') {
    return (
      <svg {...common}>
        <path d="M10 24 32 9l22 15" />
        <path d="M16 28v25M32 28v25M48 28v25" />
        <path d="M11 56h42" />
        <path d="M22 36h8M34 36h8M22 43h8M34 43h8" />
      </svg>
    )
  }

  if (type === 'wheat-sword') {
    return (
      <svg {...common}>
        <path d="M32 8v44M25 20h14M27 52h10" />
        <path d="M25 52c-6-6-8-13-8-20M39 52c6-6 8-13 8-20" />
        <path d="M14 42c4-1 7-4 8-8M50 42c-4-1-7-4-8-8M15 32c4 0 7-2 9-6M49 32c-4 0-7-2-9-6" />
        <path d="M32 12 28 8h8l-4 4Z" />
      </svg>
    )
  }

  if (type === 'bird-skull') {
    return (
      <svg {...common}>
        <path d="M37 13c-9 0-16 7-16 16 0 6 3 10 7 13v9l5-3 4 3v-9c2-2 4-4 5-7l8-2-6-5c0-9-5-15-12-15Z" />
        <path d="M28 28h.1M39 28h.1" strokeWidth="4" />
        <path d="M32 34l-4 5h8l-4-5Z" />
        <path d="M23 20 12 13M42 18l10-7" />
      </svg>
    )
  }

  if (type === 'wheel-spear') {
    return (
      <svg {...common}>
        <circle cx="29" cy="35" r="14" />
        <circle cx="29" cy="35" r="4" />
        <path d="M29 21v28M15 35h28M19 25l20 20M39 25 19 45" />
        <path d="M50 9 36 24M50 9l-2 11-9 2" />
      </svg>
    )
  }

  return (
    <svg {...common}>
      <path d="M32 9c5 9 12 12 12 22a12 12 0 0 1-24 0c0-6 3-9 5-13 2 4 3 6 6 8 0-6 1-10 1-17Z" />
      <path d="M32 56c-9 0-17-6-18-15 4 3 7 4 10 4-2-3-3-6-2-10 4 5 8 6 10 21Z" />
    </svg>
  )
}
