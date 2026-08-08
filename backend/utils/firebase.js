import admin from 'firebase-admin'

let initialized = false

export function getFirebaseAdmin() {
    if (!initialized) {
        const base64 = process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
        if (!base64) throw new Error('FIREBASE_SERVICE_ACCOUNT_BASE64 not set')

        const serviceAccount = JSON.parse(Buffer.from(base64, 'base64').toString('utf-8'))
        admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
        initialized = true
    }
    return admin
}