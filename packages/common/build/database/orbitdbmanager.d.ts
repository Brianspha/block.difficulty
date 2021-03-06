import { PlayerProfile } from './playerprofile';
import { GuestConfig } from './guestconfig';
import { DBManager } from './dbmanager';
import { TournamentData } from './tournamentdata';
export declare class OrbitDBManager implements DBManager {
    REPO: string;
    node: any;
    orbitdb: any;
    defaultOptions: any;
    guest: any;
    leaderboardEntries: any;
    user: any;
    tournaments: any;
    tournamentResults: any;
    defaultServerOptions: {
        relay: {
            enabled: boolean;
            hop: {
                enabled: boolean;
                active: boolean;
            };
        };
        EXPERIMENTAL: {
            pubsub: boolean;
        };
        repo: string;
        preload: {
            enabled: boolean;
        };
        config: {
            Addresses: {
                Swarm: string[];
            };
        };
    };
    start(ipfsNode?: any): Promise<void>;
    loadFixtureData(fixtureData: any): Promise<void>;
    initializeData(): Promise<void>;
    refreshClientData(): Promise<void>;
    refreshLeaderboard(): Promise<any>;
    initializeServerData(): Promise<void>;
    getPlayerProfile(walletid: any): Promise<any>;
    getLeaderboard(): Promise<any>;
    savePlayerProfile(playerProfile: PlayerProfile): Promise<any>;
    getTournamentData(tournamentId: any): Promise<any>;
    putTournamentData(tournamentData: TournamentData): Promise<any>;
    getGuestConfig(callback?: any): Promise<void>;
    saveGuestConfig(guestConfig: GuestConfig): Promise<void>;
    localSaveReplay(playerId: string, tournamentId: string, time: number, file: File): Promise<void>;
    getFileFromHash(hash: string): Promise<any>;
    clientSaveTournamentReplay(file: File): Promise<any>;
    serverPutResult(requestBody: any): Promise<{
        result: any;
    }>;
}
