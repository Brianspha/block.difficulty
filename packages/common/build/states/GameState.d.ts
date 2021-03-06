import { ArraySchema, MapSchema, Schema } from '@colyseus/schema';
import { Types } from '..';
import { Bullet, Game, Message, Monster, Player, Prop } from '../entities';
export declare class GameState extends Schema {
    game: Game;
    players: MapSchema<Player>;
    monsters: MapSchema<Monster>;
    props: ArraySchema<Prop>;
    bullets: ArraySchema<Bullet>;
    private map;
    private walls;
    private spawners;
    private actions;
    private onMessage;
    constructor(mapName: string, maxPlayers: number, mode: Types.GameMode, onMessage: (message: Message) => void);
    initializeMap: (mapName: string) => void;
    update(): void;
    private updateGame;
    private updatePlayers;
    private updateMonsters;
    private updateBullets;
    private handleWaitingStart;
    private handleLobbyStart;
    private handleGameStart;
    private handleGameEnd;
    playerAdd(id: string, name: string): void;
    playerPushAction(action: Types.IAction): void;
    private playerName;
    private playerMove;
    private playerRotate;
    private playerShoot;
    private playerUpdateKills;
    playerRemove(id: string): void;
    private setPlayersActive;
    private setPlayersPositionRandomly;
    private getPositionRandomly;
    private setPlayersTeamsRandomly;
    private getSpawnerRandomly;
    private monstersAdd;
    private monsterUpdate;
    private monsterRemove;
    private monstersClear;
    private bulletUpdate;
    private propsAdd;
    private propsClear;
}
