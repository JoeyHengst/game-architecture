import {NgModule}            from '@angular/core';
import {ServerListComponent} from './server-list.component';
import {MatListModule}       from "@angular/material/list";
import {CommonModule}        from "@angular/common";
import {ConnectionModule}    from "../connection/connection.module";
import {MatIconModule}       from "@angular/material/icon";


@NgModule({
    declarations: [ServerListComponent],
    imports: [
        MatListModule,
        CommonModule,
        ConnectionModule,
        MatIconModule
    ],
    exports     : [ServerListComponent]
})
export class ServerListModule {
}
