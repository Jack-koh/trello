import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './GnbLayout.scss';

import GnbLoading from './gnbLoading/GnbLoading';
import GnbLeft from './gnbLeft/GnbLeft';
import GnbRight from './gnbRight/GnbRight';

const GnbLayout = (props) => {
  const history = useHistory();
  const { children } = props;
  const [background, setBackground] = useState({ background: '#026aa7' });

  useEffect(() => {
    console.log(history);
    const main = history.location.pathname.substring(1).split('/')[0];
    main !== 'main'
      ? setBackground({ background: 'rgba(0,0,0,.15)' })
      : setBackground({ background: '#026aa7' });
  }, [location]);

  return (
    <>
      <header className="header-wrapper" style={background}>
        <GnbLeft />
        <GnbLoading />
        <GnbRight />
      </header>
      {children}
    </>
  );
};

export default GnbLayout;
