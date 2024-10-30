import {initializeApp,getApp,getApps ,App,cert } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"

const servicekey = require("@/service_key.json")

let app: App;
app = getApps().length === 0 ? initializeApp({
    credential:cert(servicekey),
}) : getApp();

const admindb = getFirestore(app);

export { app as adminapp, admindb };