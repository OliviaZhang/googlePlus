from rest_framework import serializers

from authentication.models import Account

from django.contrib.auth import update_session_auth_hash

class AccountSerializer(serializers.ModelSerializer):
    # these 2 lines on the top because we don't want the password to be updated unless they provide a new one
    # write only makes sure the pwd is not visible in AJAX response
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'created_at', 'updated_at', 'first_name', 'last_name', 'tagline', 'password', 'confirm_password',)
        read_only_fields = ('created_at', 'updated_at', )

        def create(self, validated_data):
            return Account.objects.create(**validated_data)

        def update(self, instance, validated_data):
            instance.username = validated_data.get('ussername', instance.username)
            instance.tagline = validated_data.get('tagline', instance.tagline)

            instance.save()

            password = validated_data.get('password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if password and confirm_password and password == confirm_password:
                instance.set_password(password)
                instance.save()

            update_session_auth_hash(self.context.get('request'), instance)

            return instance

