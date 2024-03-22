from django.urls import path, include
from .views import SignupView, GetCSRFToken, LoginView, LogoutView, CheckAuthenticatedView, DeleteAccountView, GetUsersView
urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('register', SignupView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view())
    #only for testing
    # path('get_users', GetUsersView.as_view()),
]