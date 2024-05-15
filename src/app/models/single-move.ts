import { SingleFieldStatus } from "./single-field-status";

export interface SingleMove{
    playTableId: number;
    singleFieldPosition: number;
    singleFieldStatus: SingleFieldStatus;
}