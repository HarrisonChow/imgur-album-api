import React from 'react';
import { render } from 'react-dom';
import ImageComponent from './components/ImageComponent.jsx';

require('./styles/styles.css');
require('./index.html');

render(<ImageComponent />, document.getElementById('container'));
