// src/pages/api/token.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const authResponse = await axios.post(
            `https://api.app.preset.io/v1/auth/`,
            {
                name: process.env.API_TOKEN,
                secret: process.env.API_SECRET,
            }
        );
        const jwtToken = authResponse.data.payload.access_token;

        const guestTokenResponse = await axios.post(
            `https://api.app.preset.io/v1/teams/${process.env.PRESET_TEAM}/workspaces/${process.env.WORKSPACE_SLUG}/guest-token/`,
            {
                user: {
                    username: "test_user",
                    first_name: "test",
                    last_name: "user"
                },
                resources: [{
                    type: "dashboard",
                    id: process.env.DASHBOARD_ID
                }],
                rls: []
            },
            {
                headers: { Authorization: `Bearer ${jwtToken}` },
            }
        );
        const guestToken = guestTokenResponse.data.payload.token;
        res.status(200).json({ token: guestToken });
    } catch (error) {
        console.error('Error in generating token:', error);
        res.status(500).json({ error: 'Failed to generate token' });
    }
}
