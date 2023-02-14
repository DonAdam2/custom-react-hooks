import { useEffect, useState } from 'react';

function useMobileDetect() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent,
      mobile = Boolean(
        userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
      );
    setMobile(mobile);
  }, []);

  return { isMobile };
}

export default useMobileDetect;
