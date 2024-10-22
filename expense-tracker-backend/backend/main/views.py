from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ExpenseSerializer 
from .models import Expense
# Create your views here.


class ExpenseView(APIView):
    def get(self,request):
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        
    def post(self, request):
        amount = request.data.get('amount')
        description = request.data.get('desc')
        dataa = {
            amount:amount,
            description:description
        }
        serializer = ExpenseSerializer(data=dataa)
        if serializer.is_valid:
            Expense.objects.create(amount=amount,description=description)
            return Response({'msg':'created Successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        
    def delete(self,request,id):
        expense = Expense.objects.get(id=id)
        if expense:
            expense.delete()
            return Response({'msg','Deletion Successfull'}, status=status.HTTP_204_NO_CONTENT)
        return Response({'msg':'Something Went Wrong!'}, status=status.HTTP_400_BAD_REQUEST)