'use client'

const LANTERN_POSITIONS = [
  { left: '10%', top: '15%' }, { left: '25%', top: '8%' },
  { left: '45%', top: '12%' }, { left: '65%', top: '18%' },
  { left: '85%', top: '10%' }, { left: '15%', top: '35%' },
  { left: '35%', top: '42%' }, { left: '55%', top: '38%' },
  { left: '75%', top: '45%' }, { left: '90%', top: '35%' },
];

const STAR_POSITIONS = [
  { left: '5%', top: '25%' }, { left: '20%', top: '60%' },
  { left: '40%', top: '75%' }, { left: '60%', top: '65%' },
  { left: '80%', top: '70%' }, { left: '95%', top: '55%' },
  { left: '30%', top: '85%' }, { left: '50%', top: '90%' },
  { left: '70%', top: '80%' }, { left: '85%', top: '95%' },
  { left: '15%', top: '95%' }, { left: '35%', top: '25%' },
  { left: '55%', top: '15%' }, { left: '75%', top: '20%' },
  { left: '92%', top: '25%' }
];

export default function RamadanLights() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-indigo-950 via-blue-900 to-purple-900">
      {/* Stars */}
      {STAR_POSITIONS.map((pos, i) => (
        <div
          key={`star-${i}`}
          className="star"
          style={{
            ...pos,
            position: 'absolute',
            width: '4px',
            height: '4px',
            background: 'white',
            borderRadius: '50%'
          }}
        />
      ))}
      
      {/* Lanterns */}
      {LANTERN_POSITIONS.map((pos, i) => (
        <div
          key={`lantern-${i}`}
          className="lantern"
          style={{
            ...pos,
            position: 'absolute'
          }}
        />
      ))}
      
      {/* Crescent Moon */}
      <div 
        className="crescent"
        style={{
          position: 'absolute',
          right: '10%',
          top: '15%',
          width: '200px',
          height: '200px'
        }}
      />
    </div>
  )
} 