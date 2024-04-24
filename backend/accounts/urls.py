from django.urls import path

from .views import (CheckAuthenticatedView, DeleteAccountView, GetCSRFToken,
                    LoginView, LogoutView, SignupView)

urlpatterns = [
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('login', LoginView.as_view()),
    path('logout', LogoutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('register', SignupView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view())
]