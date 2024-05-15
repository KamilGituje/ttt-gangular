import { PlaySide } from "./play-side";

export interface PlayTableForCreation{
    edgeSize: number;
    cpuSide: PlaySide;
    winningRowSize: number;
}