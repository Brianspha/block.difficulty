"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrbitDBManager = void 0;
const IPFS = __importStar(require("ipfs"));
const OrbitDB = require('orbit-db');
const all = require('it-all');
const { Buffer } = IPFS;
class OrbitDBManager {
    constructor() {
        this.REPO = './ipfs';
        this.node = null;
        this.orbitdb = null;
        this.defaultOptions = null;
        //db tables
        this.guest = null;
        this.leaderboardEntries = null;
        this.user = null;
        this.tournaments = null;
        this.tournamentResults = null;
        this.defaultServerOptions = {
            relay: { enabled: true, hop: { enabled: true, active: true } },
            EXPERIMENTAL: { pubsub: true },
            repo: this.REPO,
            preload: { enabled: false },
            config: {
                Addresses: {
                    Swarm: [
                        '/ip4/0.0.0.0/tcp/4002',
                        // '/ip4/127.0.0.1/tcp/4003/ws',
                        // '/dns4/ws-star.discovery.libp2p.io/tcp/443/wss/p2p-websocket-star',
                        // '/dns4/star-signal.cloud.ipfs.team/tcp/443/wss/p2p-webrtc-star'
                        '/dns4/opg-signal.herokuapp.com/tcp/443/wss/p2p-webrtc-star'
                    ]
                }
            }
        };
    }
    // we have to pass in the IPFS node differently from client or server
    // due to how web workers work. might revisit when there's a more
    // isomorphic solution
    start(ipfsNode) {
        return __awaiter(this, void 0, void 0, function* () {
            this.node = ipfsNode;
            if (!this.node) {
                this.node = yield IPFS.create(this.defaultServerOptions);
            }
            this.orbitdb = yield OrbitDB.createInstance(this.node);
            this.defaultOptions = { accessController: { write: [this.orbitdb.identity.id] } };
            yield this.initializeData();
        });
    }
    loadFixtureData(fixtureData) {
        return __awaiter(this, void 0, void 0, function* () {
            const fixtureKeys = Object.keys(fixtureData);
            for (let i in fixtureKeys) {
                let key = fixtureKeys[i];
                if (!this.user.get(key))
                    yield this.user.set(key, fixtureData[key]);
            }
        });
    }
    initializeData() {
        return __awaiter(this, void 0, void 0, function* () {
            const docStoreOptions = Object.assign(Object.assign({}, this.defaultOptions), { indexBy: 'id' });
            this.guest = yield this.orbitdb.kvstore('guest', this.defaultOptions);
            yield this.guest.load();
            this.user = yield this.orbitdb.kvstore('user', this.defaultOptions);
            yield this.user.load();
            this.leaderboardEntries = yield this.orbitdb.docstore('leaderboardEntries', docStoreOptions);
            yield this.leaderboardEntries.load();
            this.tournaments = yield this.orbitdb.kvstore('tournaments', this.defaultOptions);
            yield this.tournaments.load();
        });
    }
    refreshClientData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leaderboardEntries.load();
        });
    }
    refreshLeaderboard() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.leaderboardEntries) {
                return yield this.leaderboardEntries.query((doc) => doc.id != null);
            }
            else
                return null;
        });
    }
    initializeServerData() {
        return __awaiter(this, void 0, void 0, function* () {
            const docStoreOptions = Object.assign(Object.assign({}, this.defaultOptions), { indexBy: 'id' });
            this.user = yield this.orbitdb.kvstore('user', this.defaultOptions);
            this.tournaments = yield this.orbitdb.docstore('tournaments', docStoreOptions);
            this.tournamentResults = yield this.orbitdb.docstore('tournamentResults', docStoreOptions);
            yield this.user.load();
        });
    }
    getPlayerProfile(walletid) {
        return __awaiter(this, void 0, void 0, function* () {
            const playerProfile = yield this.user.get(walletid);
            return playerProfile;
        });
    }
    getLeaderboard() {
        return __awaiter(this, void 0, void 0, function* () {
            const lb = yield this.user.all;
            return lb;
        });
    }
    savePlayerProfile(playerProfile) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = playerProfile.walletid;
            delete playerProfile.walletid;
            const result = yield this.user.set(id, playerProfile);
            const savedUser = yield this.user.get(id);
            return savedUser;
        });
    }
    getTournamentData(tournamentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.user.get(tournamentId);
            return data;
        });
    }
    putTournamentData(tournamentData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = tournamentData.id;
            const result = yield this.user.set(id, tournamentData);
            return result;
        });
    }
    getGuestConfig(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const guestAccount = yield this.guest.all;
            if (Object.keys(guestAccount).length === 0 && guestAccount.constructor === Object)
                callback(null);
            else
                callback(guestAccount);
        });
    }
    saveGuestConfig(guestConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            this.guest.set("id", guestConfig.id);
        });
    }
    localSaveReplay(playerId, tournamentId, time, file) {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            try {
                for (var _b = __asyncValues(this.node.add({
                    path: file.name,
                    content: file
                })), _c; _c = yield _b.next(), !_c.done;) {
                    const saveResult = _c.value;
                    const hash = saveResult.cid.string;
                    const entry = {
                        id: file.name,
                        tournamentId,
                        time,
                        hash,
                    };
                    yield this.leaderboardEntries.put(entry);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    getFileFromHash(hash) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            result = null;
            try {
                for (var _b = __asyncValues(this.node.get(hash)), _c; _c = yield _b.next(), !_c.done;) {
                    const file = _c.value;
                    console.log(file);
                    if (file.content) {
                        const content = Buffer.concat(yield all(file.content));
                        result = new File([content], hash + ".webm", { type: 'video/webm' });
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            console.log(result);
            return result;
        });
    }
    clientSaveTournamentReplay(file) {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log(file);
            try {
                for (var _b = __asyncValues(this.node.add({
                    path: file.name,
                    content: file
                })), _c; _c = yield _b.next(), !_c.done;) {
                    const saveResult = _c.value;
                    return saveResult.cid.string;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        });
    }
    serverPutResult(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('serverPutResult');
            const { tournamentId, resultId, fileHash } = requestBody;
            const id = `${tournamentId}-${resultId}`;
            const entry = {
                id,
                tournamentId,
                fileHash,
            };
            console.log(entry);
            const result = yield this.tournamentResults.put(entry);
            return { result };
        });
    }
}
exports.OrbitDBManager = OrbitDBManager;
//# sourceMappingURL=orbitdbmanager.js.map