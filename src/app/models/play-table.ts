import { PlaySide } from "./play-side";
import { SingleField } from "./single-field";

export class PlayTable {
    playTableId: number;
    cpuSide: PlaySide;
    winningRowSize: number;
    singleFields: SingleField[];
}