import React from 'react';
import moment from 'moment';

const Footer = () => (
	<div className="has-text-light animated fadeIn footer-bottom">Made with <span role="img" aria-label="Heart">❤️</span> by <a href="https://alalfakawma.in" rel="noopener noreferrer nofollow" target="_blank" style={{color: '#fff'}}>Aseem Lalfakawma</a> - { moment().format('YYYY') }</div>
);

export default Footer;