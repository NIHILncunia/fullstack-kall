import React from 'react';

interface ICommunityLayoutProps {
  children: React.ReactNode;
}

export function CommunityLayout({ children, }: ICommunityLayoutProps) {
  return (
    <>
      <div className='sidebar'>
        사이드바
      </div>
      <div className='content'>
        {children}
      </div>
    </>
  );
}
