import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Blend Pilot - Digital Innovation & Web Development Solutions'
export const size = {
  width: 1200,
  height: 600,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Background Pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(0, 123, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 123, 255, 0.1) 0%, transparent 50%)',
          }}
        />
        
        {/* Logo and Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '15px',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                fontFamily: 'system-ui',
              }}
            >
              BP
            </span>
          </div>
          <span
            style={{
              color: 'white',
              fontSize: '36px',
              fontWeight: 'bold',
              fontFamily: 'system-ui',
            }}
          >
            Blend Pilot
          </span>
        </div>
        
        {/* Main Title */}
        <h1
          style={{
            color: 'white',
            fontSize: '42px',
            fontWeight: 'bold',
            textAlign: 'center',
            margin: '0 0 15px 0',
            fontFamily: 'system-ui',
            lineHeight: '1.2',
          }}
        >
          Digital Innovation & Web Development
        </h1>
        
        {/* Subtitle */}
        <p
          style={{
            color: '#B0B0B0',
            fontSize: '18px',
            textAlign: 'center',
            margin: '0 0 30px 0',
            fontFamily: 'system-ui',
            maxWidth: '600px',
          }}
        >
          Transform your digital presence with expert solutions
        </p>
        
        {/* CTA Button */}
        <div
          style={{
            background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
            padding: '12px 24px',
            borderRadius: '8px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            fontFamily: 'system-ui',
          }}
        >
          Get Started Today
        </div>
        
        {/* Decorative Elements */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
            borderRadius: '50%',
            opacity: 0.1,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '30px',
            width: '50px',
            height: '50px',
            background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
            borderRadius: '50%',
            opacity: 0.1,
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
