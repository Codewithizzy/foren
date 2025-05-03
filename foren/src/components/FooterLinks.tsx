import React from 'react';

const FooterLinks: React.FC = () => {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      <li><a href="/privacy">Privacy Policy</a></li>
      <li><a href="/terms">Terms of Service</a></li>
    </ul>
  );
};

export default FooterLinks;
