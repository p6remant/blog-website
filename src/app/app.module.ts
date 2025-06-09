import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { AppComponent } from './app.component';
import { PostsModule } from './pages/posts/posts.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationsModule } from './pages/notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { RouterOutlet } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    PostsModule,
    NotificationsModule,
    AuthModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent],
})
export class AppModule {}
