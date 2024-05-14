import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PlayTable } from "../models/play-table";
import { ApiPaths } from "src/environments/api-paths";
import { SingleMove } from "../models/single-move";
import { SingleField } from "../models/single-field";
import { PlayTableForCreation } from "../models/play-table-for-creation";

@Injectable({
    providedIn: "root"
})
export class PlayTableService {
    constructor(private http: HttpClient) { }

    private baseUrl = environment.baseUrl;

    getPlayTable(playTableId: number): Observable<PlayTable> {
        return this.http.get<PlayTable>(`${this.baseUrl}/${ApiPaths.tables}/${playTableId}`)
    }

    createTable(playTableForCreation: PlayTableForCreation): Observable<PlayTable>{
        return this.http.post<PlayTable>(`${this.baseUrl}/${ApiPaths.tables}/create`, playTableForCreation)
    }

    makeMove(singleMove: SingleMove): Observable<SingleField[]>{
        return this.http.put<SingleField[]>(`${this.baseUrl}/${ApiPaths.tables}/move`, singleMove)
    }
}