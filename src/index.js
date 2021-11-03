import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
//toast
import 'react-toastify/dist/ReactToastify.css';
//import meta image
import './assets/images/metaImage.jpg';
// required for babel polyfills
import 'regenerator-runtime/runtime';
//root component
import App from './App';
//styles
import './scss/global.scss';
//constants
import { history } from './js/constants/AppConstants';

ReactDOM.render(
	<Router history={history}>
		<App />
	</Router>,
	document.getElementById('root')
);
