import { PlaySide } from "./play-side";
import { SingleField } from "./single-field";

export interface PlayTable {
    playTableId: number;
    cpuSide: PlaySide;
    winningRowSize: number;
    singleFields: SingleField[];
}