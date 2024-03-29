import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {DisplayComponent} from './utilities/display.component';
import {ElevationComponent} from './utilities/elevation.component';
import {FlexboxComponent} from './utilities/flexbox.component';
import {GridComponent} from './utilities/grid.component';
import {IconsComponent} from './utilities/icons.component';
import {WidgetsComponent} from './utilities/widgets.component';
import {SpacingComponent} from './utilities/spacing.component';
import {TypographyComponent} from './utilities/typography.component';
import {TextComponent} from './utilities/text.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {CourseComponent} from './course/course.component';
import {DetailsComponent} from './course/details/details.component';
import {AddCourseComponent} from './course/add-course/add-course.component';
import {ForumComponent} from './forum/forum.component';
import {ComplaintComponent} from './complaint/complaint.component';
import {AddComplaintComponent} from './complaint/add-complaint/add-complaint.component';
import {RegisterComponent} from './user/register/register.component';
import {LoginComponent} from './user/login/login.component';
import {HomeComponent} from './user/home/home.component';
import {FrontLandingComponent} from './user/front-landing/front-landing.component';
import {ProfilComponent} from './user/profil/profil.component';
import {ForgotPasswordComponent} from './user/forgot-password/forgot-password.component';
import {NewPasswordComponent} from './user/new-password/new-password.component';
import {EventComponent} from './event/event.component';
import {OffreComponent} from './pages/offre/offre.component';
import {AddOfferComponent} from './pages/offre/add-offer/add-offer.component';
import {QuizComponent} from './course/quiz/quiz.component';
import {EventFrontComponent} from './event/event-front/event-front.component';
import {DonationComponent} from './event/donation/donation.component';
import {UserPostsComponent} from './forum/user-posts/user-posts.component';
import {DetailEventComponent} from './event/event-front/detail-event/detail-event.component';
import {AddEventComponent} from './event/event-front/add-event/add-event.component';
import {MapComponent} from './event/event-front/map/map.component';
import {PaymentDonationComponent} from './event/event-front/payment-donation/payment-donation.component';
import {UserDetailsComponent} from './user/user-details/user-details.component';
import {ChatPriveComponent} from './forum/chat-prive/chat-prive.component';
import {CourseBackHomeComponent} from './backOffice/course/course-back-home/course-back-home.component';
import {PostDetailsComponent} from './forum/post-details/post-details.component';
import {ChatboxComponent} from './chatbox/chatbox.component';
import {ChatComponent} from './forum/chat/chat.component';
import {SubscriptionComponent} from './user/subscription/subscription.component';
import {MyCandidacyComponent} from './pages/offre/my-candidacy/my-candidacy.component';
import {CandidacyAreaComponent} from './pages/offre/candidacy-area/candidacy-area.component';
import {AuthGuard} from './guards/auth.guard';
import {Role} from './models/role.enum';
import {Auth2Guard} from './guards/auth2.guard';
import {AdminDashboardBackofficeComponent} from './user/admin-dashboard-backoffice/admin-dashboard-backoffice.component';
import {ForumBackComponent} from './forum-back/forum-back.component';
import {AddServicesComponent} from './services/add-services/add-services.component';
import {ServicesComponent} from './services/services.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: HomeComponent,
                children: [
                    {path: '', component: FrontLandingComponent},
                    {path: 'profil', component: ProfilComponent, canActivate: [Auth2Guard]},
                    {path: 'cour', component: CourseComponent, canActivate: [Auth2Guard]},
                    {path: 'forum', component: ForumComponent, canActivate: [Auth2Guard]},
                    {path: 'details/:id', component : DetailsComponent, canActivate: [Auth2Guard]},
                    {path: 'addcourse', component : AddCourseComponent, canActivate: [Auth2Guard]},
                    {path: 'quiz/:id', component : QuizComponent, canActivate: [Auth2Guard]},
                    {path: 'eventFront', component: EventFrontComponent, canActivate: [Auth2Guard]},
                    {path: 'offre', component : OffreComponent, canActivate: [Auth2Guard]},
                    {path: 'addoffer', component : AddOfferComponent, canActivate: [Auth2Guard]},
                    {path: 'eventFront', component: EventFrontComponent, canActivate: [Auth2Guard]},
                    {path: 'detailEvent/:id', component: DetailEventComponent, canActivate: [Auth2Guard]},
                    {path: 'addEvent', component: AddEventComponent, canActivate: [Auth2Guard]},
                    {path: 'payment/:id', component: PaymentDonationComponent, canActivate: [Auth2Guard]},
                    {path: 'profil/:id', component: UserDetailsComponent, canActivate: [Auth2Guard]},
                    {path: 'eventFront', component: EventFrontComponent, canActivate: [Auth2Guard]},
                    {path: 'subscribe', component: SubscriptionComponent, canActivate: [Auth2Guard]},
                    {path: 'cour', component: CourseComponent, canActivate: [Auth2Guard]},
                    {path: 'forum', component: ForumComponent, canActivate: [Auth2Guard]},
                    {path: 'post-detais/:id', component: PostDetailsComponent, canActivate: [Auth2Guard]},
                    {path: 'details/:id', component : DetailsComponent, canActivate: [Auth2Guard]},
                    {path: 'addcourse', component : AddCourseComponent, canActivate: [Auth2Guard]},
                    {path: 'quiz', component : QuizComponent, canActivate: [Auth2Guard]},
                    {path: 'eventFront', component: EventFrontComponent, canActivate: [Auth2Guard]},
                    {path: 'user-post', component: UserPostsComponent},
                    {path: 'pages/map', component: MapComponent},
                    {path: 'chat', component: ChatboxComponent},
                    {path: 'chatP', component: ChatPriveComponent},
                    {path: 'addC', component: AddComplaintComponent},
                    {path: 'addS', component: AddServicesComponent},
                    {path: 'Service', component: ServicesComponent},
                    {path: 'mycandidacy', component: MyCandidacyComponent}



                ]
            },

            {
                path: 'admin', component: AppMainComponent, canActivate: [AuthGuard], data: {roles: [Role.ADMIN]},
                children: [
                    {path: '', component: AdminDashboardBackofficeComponent},
                    {path: 'complaint', component: ComplaintComponent},
                    {path: 'addcomplaint', component: AddComplaintComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', component: MenusDemoComponent},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/display', component: DisplayComponent},
                    {path: 'utilities/elevation', component: ElevationComponent},
                    {path: 'utilities/flexbox', component: FlexboxComponent},
                    {path: 'utilities/grid', component: GridComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'utilities/widgets', component: WidgetsComponent},
                    {path: 'utilities/spacing', component: SpacingComponent},
                    {path: 'utilities/typography', component: TypographyComponent},
                    {path: 'utilities/text', component: TextComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'pages/event', component: EventComponent},
                    {path: 'event', component: EventComponent},
                    {path: 'pages/donation', component: DonationComponent},
                    {path: 'pages/cour', component: CourseBackHomeComponent},
                    {path: 'candidacyarea', component: CandidacyAreaComponent},
                    {path: 'cour', component: CourseBackHomeComponent},
                    {path: 'forumb', component: ForumBackComponent},
                    {path: 'complaint', component: ComplaintComponent},

                ]
            },

            {
                path: 'user', component: HomeComponent,
                children: [
                    {path: 'landing', component: FrontLandingComponent},
                    {path: 'profil', component: ProfilComponent},
                    {path: 'profil/:id', component: UserDetailsComponent},
                    {path: 'eventFront', component: EventFrontComponent},
                    {path: 'cour', component: CourseComponent},
                    {path: 'forum', component: ForumComponent},
                    {path: 'post-detais/:id', component: PostDetailsComponent},
                    {path: 'details/:id', component : DetailsComponent},
                    {path: 'addcourse', component : AddCourseComponent},
                    {path: 'quiz', component : QuizComponent},
                    {path: 'eventFront', component: EventFrontComponent},
                    {path: 'offre', component: OffreComponent},

                    {
                        path: 'user-post',
                        component: UserPostsComponent,
                    },
                    {
                        path: 'chat',
                        component: ChatboxComponent,
                    },



                    {path: 'pages/map', component: MapComponent},

                ]
            },

            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'register', component: RegisterComponent},
            {path: 'reset-password', component: ForgotPasswordComponent},
            {path: 'new-password', component: NewPasswordComponent},
            {path: 'login', component: LoginComponent},
            {path: '**', redirectTo: '/notfound'},
        ])
    ],
    exports: [RouterModule]
}
)
export class AppRoutingModule {
}
