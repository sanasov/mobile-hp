import {NgModule} from '@angular/core';
import {CapitalizeFirstPipe} from "./capitalizefirst.pipe";

@NgModule({
    declarations: [CapitalizeFirstPipe],
    imports: [],
    exports: [CapitalizeFirstPipe]
})
export class PipesModule {
}
