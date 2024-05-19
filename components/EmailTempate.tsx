export default function EmailTemplate() {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      <h1 style={{ color: '#5D6D7E', textAlign: 'center' }}>
        Welcome, My Friend!
      </h1>
      <p>Dear Subscriber,</p>
      <p>
        Thank you for subscribing to Hand Drawn AI! We truly appreciate your
        support.
      </p>
      <p>
        We are excited to share that our website is currently under development,
        and we are working hard to bring it to you as soon as possible.
      </p>
      <p>
        {/* eslint-disable react/no-unescaped-entities */}
        Stay tuned for updates, and we can't wait to show you the amazing things
        we've been working on. Your patience and enthusiasm mean the world to
        us!
      </p>
      <p>
        Best regards,
        <br />
        The Hand Drawn AI Team
      </p>
    </div>
  )
}
