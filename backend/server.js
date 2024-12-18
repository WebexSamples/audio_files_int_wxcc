import express from 'express';
import { connect } from 'mongoose';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

async function exchangeCodeForTokens(code) {
    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;

    const url = `https://webexapis.com/v1/access_token`;

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        }),
    });

    const data = await response.json();

    return data;
}

app.post('/api/users', async (req, res) => {
    const code = req.body.code;

    if (!code) {
        res.status(400).send('Bad Request');
        return;
    }

    const tokens = exchangeCodeForTokens(code);

    let [aToken, ciCluster, org_Id] = tokens.access_token.split('_');
    const orgId = org_Id;
    const accessToken = tokens.access_token;
    const refreshToken = tokens.refresh_token;
    const scope = tokens.scope;

    const user = new User({
        orgId,
        accessToken,
        refreshToken,
        scope,
    });

    res.send('User created');
});

app.delete('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send('Bad Request');
        return;
    }
    
    try {
        const user = await User.findById(id);

        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        await user.remove();
        res.send('User removed');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send('Bad Request');
        return;
    }

    const user = await User().findById(id);

    if (!user) {
        res.status(404).send('User not found');
        return;
    }

    // Update user

    try {
        await user.save();
        res.send('User updated');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.get('/', (req, res) => {
    res.send('Server is ready');
})

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000");
    console.log("Press Ctrl+C to quit.");
    connectDB();
});