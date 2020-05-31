"use babel";
import { ipcRenderer, remote } from "electron"
const doSyncIfNecessary = () => {
    console.info("start to sync");
    ipcRenderer.send("command", "application:sync-db", {})
}
const onShow = () => {
    const { db } = inkdrop.store.getState()
    if (db.isSyncing) {
        console.info("inkdrop-sync-db-on-show: already syncing");
        return;
    }
    doSyncIfNecessary();
}
module.exports = {
    activate() {
        remote.getCurrentWindow().on("show", onShow)
    },
    deactivate() {
        remote.getCurrentWindow().off("show", onShow);
    }
};
