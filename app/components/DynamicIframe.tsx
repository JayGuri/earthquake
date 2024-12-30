import React from 'react';

interface DynamicIframeProps {
  src: string;
  title: string;
}

const DynamicIframe: React.FC<DynamicIframeProps> = ({ src, title }) => {
  return (
    <iframe 
      title={title}
      width="100%" 
      height="600" 
      src={src}
      frameBorder="0" 
      allowFullScreen
      className="rounded-md"
    />
  );
};

export default React.memo(DynamicIframe);

