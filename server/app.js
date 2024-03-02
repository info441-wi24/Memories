import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import models from './models.js';
import sessions from 'express-session'

import usersRouter from './routes/users.js';
import apiRouter from './routes/api.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import WebAppAuthProvider from 'msal-node-wrapper'

const authConfig = {
	auth: {
		clientId: "a89e730b-bb1a-4200-9de8-e4948d22ae7d",
        authority: "https://login.microsoftonline.com/f6b6dd5b-f02f-441a-99a0-162ac5060bd2",
        clientSecret: "_uE8Q~wW9jLorrtpKaH-f660gLdAEpe9sPwRBa.7",
        redirectUri: "/redirect"//"http://localhost:3000/redirect"
	},
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.enable('trust proxy'); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "this is a secret key: aeraewojroajerojajewor",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}))

const authProvider = await WebAppAuthProvider.WebAppAuthProvider.initialize(authConfig);
app.use(authProvider.authenticate());


app.use((req, res, next) => {
    req.models = models;
    next();
})

app.use('/api', apiRouter);

app.get(
	'/signin',
	(req, res, next) => {
		return req.authContext.login({
			postLoginRedirectUri: "http://localhost:3000/", // redirect here after login... change to "https://yourmemories.azurewebsites.net/" later
		})
        (req, res, next);
	}
);

app.get(
	'/signout',
	(req, res, next) => {
		return req.authContext.logout({
			postLogoutRedirectUri: "http://localhost:3000/", // redirect here after logout... change to "https://yourmemories.azurewebsites.net/" later
		})(req, res, next);
	}
);

app.use(authProvider.interactionErrorHandler());


export default app;
