import React from 'react';
import moment from 'moment';

const Footer = () => (
	<div className="has-text-light footer-bottom">Made with <span role="img" aria-label="Heart">❤️</span> by Aseem Lalfakawma - { moment().format('YYYY') }</div>
);

export default Footer;