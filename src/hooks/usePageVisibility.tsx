import React, { useState, useEffect } from 'react';

const getIsDocumentHidden = () => {
  if (typeof window !== 'undefined') {
    return !document['hidden'];
  } else {
    return false;
  }
};

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange, false);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  });

  return isVisible;
};
