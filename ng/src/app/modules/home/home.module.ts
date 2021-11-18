import {NgModule} from '@angular/core';

import {HomeComponent} from './pages/home/home.component';
import {HomeRoutingModule} from './home-routing.module';

@NgModule({
    declarations: [HomeComponent],
    exports: [HomeComponent],
    imports: [
        HomeRoutingModule
    ]
})

export class HomeModule {
}
