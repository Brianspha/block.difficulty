export declare type ActionType = 'move' | 'rotate' | 'name' | 'shoot';
export declare type GameState = 'waiting' | 'lobby' | 'game';
export declare type GameMode = 'score attack' | 'deathmatch' | 'team deathmatch';
export declare type Teams = 'Red' | 'Blue';
export declare type MessageType = 'waiting' | 'start' | 'stop' | 'joined' | 'killed' | 'won' | 'left' | 'timeout';
export declare type PropType = 'potion-red';
export declare type WallCollisionType = 'full' | 'none';
/**
 * Represent the initial parameters of a Player
 */
export interface IPlayerOptions {
    playerName?: string;
}
/**
 * Represent the initial parameters of a Room
 */
export interface IRoomOptions {
    playerName?: string;
    roomName: string;
    roomMap: string;
    roomMaxPlayers: number;
    mode: GameMode;
    tournamentId?: string;
}
/**
 * Represent an action performed by a Player
 */
export interface IAction {
    playerId?: string;
    ts?: number;
    type: ActionType;
    value: any;
}
