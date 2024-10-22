from django.urls import path
from . import views

urlpatterns = [
    path('track/',views.ExpenseView.as_view()),
    path('track/<int:id>/',views.ExpenseView.as_view()),
]
