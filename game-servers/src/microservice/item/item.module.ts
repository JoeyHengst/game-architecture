import {Module}            from '@nestjs/common';
import {ItemController}    from './item.controller';
import {ItemService}       from './item.service';
import {DATABASE_MODULE}   from "../../lib/database/database.module";
import {TypeOrmModule}     from "@nestjs/typeorm";
import {Inventory}         from "./entities/inventory";
import {InventoryItem}     from "./entities/inventory-item";
import {Item}              from "./entities/item";
import {ItemConfiguration} from "./entities/item-configuration";

@Module({
    imports    : [
        TypeOrmModule.forFeature([Inventory, InventoryItem, Item, ItemConfiguration]),
        TypeOrmModule.forRoot({
            ...DATABASE_MODULE,
            type    : 'mysql',
            database: 'item',
            entities: [__dirname + '/entities/*{.js,.ts}']
        })
    ],
    controllers: [ItemController],
    providers  : [ItemService],
})
export class ItemModule {
}
