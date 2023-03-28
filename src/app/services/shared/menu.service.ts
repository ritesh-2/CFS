import { Injectable } from '@angular/core'

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    {state:'dashboard',name:'Dahsboard',icon:'dashboard',role:''},
    {state:'category',name:'Category',icon:'category',role:'admin'},
    {state:'product',name:'Product',icon:'inventory',role:'admin'},
    {state:'order',name:'Order',icon:'list_alt',role:''},
    {state:'bill',name:'Bill',icon:'import_contacts',role:''},
    {state:'user',name:'View USer',icon:'people',role:'admin'}
];

@Injectable()
export class MenuService{
    getMenuItem(): Menu[]{
        return MENUITEMS;
    }
}