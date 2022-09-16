from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import resolve, reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

User = get_user_model()

USER_NAME = {"first_name": "User", "last_name": "Test"}
USER_CRED = {"email": "user@test.com", "password": "#1Tester"}


class TestTemplate(TestCase):
    """Test the 'home' template"""

    def test_home(self):
        """Check URL mapping"""
        self.assertEqual(resolve(reverse("home")).view_name, "home")


class TestAllowAnyAPIs(APITestCase):
    """Test Allow Any APIs"""

    def test_register(self):
        """Test user registration API"""
        payload = {
            "confirm_password": USER_CRED["password"],
            **USER_NAME,
            **USER_CRED,
        }
        response = self.client.post(reverse("register"), payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login(self):
        """Test user login API"""
        self.test_register()  # Run to create a user for testing login
        payload = USER_CRED.copy()
        response = self.client.post(reverse("login"), payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestIsAuthenticatedAPIs(APITestCase):
    """Test Authenticated APIs"""

    def setUp(self):
        """Set-up common things"""
        email = USER_CRED.get("email")
        password = USER_CRED.get("password")
        self.user = User.objects.create_user(email, email, password, **USER_NAME)
        token, _ = Token.objects.get_or_create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)

    def tearDown(self):
        """Remove user"""
        self.user.delete()

    def test_detail(self):
        """Test the detail API"""
        response = self.client.get(reverse("detail"))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout(self):
        """Test logout API"""
        response = self.client.delete(reverse("logout"))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
