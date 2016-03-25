
import json

from rest_framework import permissions, viewsets

from authentication.models import Account
from authentication.permissions import IsAccountOwner
from authentication.serializers import AccountSerializer

from django.views.generic.base import TemplateView
from rest_framework import status, views
from rest_framework.response import Response
from django.contrib.auth import authenticate, login

class IndexView(TemplateView):
    template_name = '../templates/index.html'
class AccountViewSet(viewsets.ModelViewSet):
    lookup_field = 'username'                 # override the default look up field id
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(), IsAccountOwner(), )

    # overriding create() for this viewset to create the Account object
    def create(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)

            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)

        return Response({
            'status': 'Bad request',
            'message': 'Account could not be created with received data.'
        }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request, format=None):
        data = json.loads(request.body)

        email = data.get('emails', None)
        password = data.get('password', None)

        account = authenticate(email=email, password=password)

        if account is not None:
            if account.is_active:
                login(request, account)

                serialized = AccountSerializer(account)

                return Response(serialized.data)

            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': 'This account has been disabled'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'massage': 'Username/password combination invalid'
            }, status=status.HTTP_401_UNAUTHORIZED)