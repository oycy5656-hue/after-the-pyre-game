import { LOCATIONS } from '../data/world.js'

const NODES = LOCATIONS.filter((location) => location.id !== 'tower')

export default function MapGreyBay({
  selected = null,
  onSelect = null,
  interactive = true,
  className = '',
}) {
  return (
    <div className={`bay-map ${className}`}>
      <svg viewBox="0 0 1000 700" role="img" aria-label="灰湾城市示意图">
        <defs>
          <radialGradient id="mapGlow" cx="52%" cy="44%" r="58%">
            <stop offset="0%" stopColor="#d9b46a" stopOpacity="0.11" />
            <stop offset="55%" stopColor="#d9b46a" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#0b0d0c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="waterGradient" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#102020" />
            <stop offset="100%" stopColor="#091313" />
          </linearGradient>
          <pattern id="mapGrid" width="42" height="42" patternUnits="userSpaceOnUse">
            <path d="M42 0H0V42" fill="none" stroke="#d9b46a" strokeOpacity="0.045" strokeWidth="1" />
          </pattern>
          <filter id="mapBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <rect width="1000" height="700" fill="#0c1110" />
        <rect width="1000" height="700" fill="url(#mapGrid)" />
        <ellipse cx="520" cy="340" rx="430" ry="280" fill="url(#mapGlow)" />

        {/* land mass */}
        <path
          d="M0 0H1000V492C928 486 872 500 820 540C758 588 700 620 622 632C542 644 470 624 402 584C338 546 300 508 236 500C148 490 74 506 0 536Z"
          fill="#171a16"
        />
        <path
          d="M0 0H1000V492C928 486 872 500 820 540C758 588 700 620 622 632C542 644 470 624 402 584C338 546 300 508 236 500C148 490 74 506 0 536Z"
          fill="none"
          stroke="#4a4b3e"
          strokeOpacity="0.65"
          strokeWidth="1.5"
        />

        {/* bay water */}
        <path
          d="M0 536C74 506 148 490 236 500C300 508 338 546 402 584C470 624 542 644 622 632C700 620 758 588 820 540C872 500 928 486 1000 492V700H0Z"
          fill="url(#waterGradient)"
        />
        <path
          d="M0 536C74 506 148 490 236 500C300 508 338 546 402 584C470 624 542 644 622 632C700 620 758 588 820 540C872 500 928 486 1000 492"
          fill="none"
          stroke="#7b8b7e"
          strokeOpacity="0.38"
          strokeWidth="1.4"
        />

        {/* water contour lines */}
        {[80, 150, 220, 290].map((offset) => (
          <path
            key={offset}
            d={`M${-40 + offset} 700C${70 + offset} 640 ${150 + offset} 600 ${250 + offset} 596C${350 + offset} 592 ${410 + offset} 620 ${490 + offset} 640`}
            fill="none"
            stroke="#9db6a9"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
        ))}

        {/* contour rings */}
        <g fill="none" stroke="#b7a477" strokeOpacity="0.1" strokeWidth="1">
          <path d="M80 160c90-54 198-52 276 8 60 47 54 126-8 167-75 50-198 31-254-35-47-56-44-113-14-140Z" />
          <path d="M108 178c75-42 165-40 230 8 50 37 44 101-8 134-62 39-164 24-210-29-38-44-36-90-12-113Z" />
          <path d="M660 150c80-34 180-22 238 32 44 41 36 106-18 139-65 40-172 26-219-27-39-43-36-117-1-144Z" />
          <path d="M694 176c62-25 142-16 187 24 34 31 27 80-15 105-51 29-134 18-171-22-30-32-27-86-1-107Z" />
        </g>

        {/* district blocks */}
        <g fill="#d9b46a" fillOpacity="0.055" stroke="#d9b46a" strokeOpacity="0.16" strokeWidth="1">
          <path d="M112 250l128-22 58 88-42 98-126 8-56-82Z" />
          <path d="M330 238l150 10 34 96-74 94-136-18-28-92Z" />
          <path d="M528 212l160-18 62 100-44 112-148 10-66-98Z" />
          <path d="M736 232l138 22 24 108-88 82-110-38-18-94Z" />
          <path d="M426 444l114-12 44 62-38 70-104 8-42-58Z" />
        </g>

        {/* roads */}
        <g fill="none" stroke="#c9b98f" strokeOpacity="0.42" strokeWidth="2">
          <path d="M330 596C352 548 398 510 436 474C470 442 498 414 522 392" />
          <path d="M522 392C546 350 566 310 588 268C612 222 650 190 690 164" />
          <path d="M212 486C260 468 306 456 354 452C390 449 414 444 436 474" />
          <path d="M436 474C494 466 548 464 600 470C654 476 710 470 768 468" />
          <path d="M300 228C330 280 354 330 354 380C354 414 360 438 390 460" />
          <path d="M522 392C558 372 604 352 650 340C690 330 722 320 748 304" />
          <path d="M632 626C640 586 646 548 650 508C654 470 662 420 680 380" />
        </g>
        <g fill="none" stroke="#d9b46a" strokeOpacity="0.24" strokeWidth="1.2" strokeDasharray="4 7">
          <path d="M80 370C180 350 280 350 380 368C480 386 580 386 690 350C780 320 860 300 940 310" />
          <path d="M180 110C240 160 280 210 300 260" />
          <path d="M760 120C750 190 756 250 768 310C778 360 780 410 768 468" />
        </g>

        {/* railway to the iron tide */}
        <g stroke="#b16a45" strokeOpacity="0.55" strokeWidth="2" fill="none">
          <path d="M900 430 820 448 768 468" />
          <path d="M900 438 820 456 768 476" />
        </g>
        {Array.from({ length: 9 }).map((_, index) => {
          const x = 900 - index * 16
          const y = 430 + index * 4.7
          return <path key={index} d={`M${x} ${y - 5}l-6 14`} stroke="#b16a45" strokeOpacity="0.32" strokeWidth="1" />
        })}

        {/* city dots */}
        <g fill="#d9b46a" fillOpacity="0.28">
          {Array.from({ length: 90 }).map((_, index) => {
            const x = 70 + ((index * 83) % 860)
            const y = 80 + ((index * 47) % 380)
            return <circle key={index} cx={x} cy={y} r={index % 5 === 0 ? 1.6 : 1} />
          })}
        </g>

        <text x="530" y="76" className="map-region-label" textAnchor="middle">
          灰 湾
        </text>
        <text x="530" y="98" className="map-region-sub" textAnchor="middle">
          GREY BAY · 047
        </text>

        <g className="map-compass" transform="translate(910 86)">
          <circle r="28" fill="none" stroke="#d9b46a" strokeOpacity="0.24" />
          <path d="M0-20 5 0 0 20-5 0Z" fill="#d9b46a" fillOpacity="0.55" />
          <text y="-34" textAnchor="middle">N</text>
        </g>

        <g className="map-scale" transform="translate(70 646)">
          <path d="M0 0h120M0-4v8M60-3v6M120-4v8" stroke="#d9b46a" strokeOpacity="0.5" />
          <text x="0" y="18">0</text>
          <text x="58" y="18">2 KM</text>
          <text x="112" y="18">4 KM</text>
        </g>

        {NODES.map((location) => {
          const active = selected === location.id
          return (
            <g
              key={location.id}
              className={`map-node ${active ? 'is-active' : ''} ${interactive ? 'is-interactive' : ''}`}
              transform={`translate(${location.x} ${location.y})`}
              onClick={interactive && onSelect ? () => onSelect(location.id) : undefined}
              onKeyDown={
                interactive && onSelect
                  ? (event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onSelect(location.id)
                      }
                    }
                  : undefined
              }
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              aria-label={location.name}
            >
              <title>{location.name}</title>
              <circle className="map-node__halo" r={active ? 22 : 15} />
              <circle className="map-node__ring" r={active ? 10 : 7} />
              <circle className="map-node__core" r={active ? 4.5 : 3} />
              <path className="map-node__stem" d="M0 12v18" />
              <text className="map-node__label" y="48" textAnchor="middle">
                {location.short}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="bay-map__legend">
        <span>
          <i className="legend-dot" /> 聚居点
        </span>
        <span>
          <i className="legend-line" /> 旧路
        </span>
        <span>
          <i className="legend-rail" /> 铁潮轨线
        </span>
      </div>
    </div>
  )
}
