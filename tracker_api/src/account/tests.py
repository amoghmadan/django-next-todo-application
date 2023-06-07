from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status, test
from rest_framework.authtoken.models import Token

from account.apps import AccountConfig

User = get_user_model()


class TestAllowAnyAPI(test.APITestCase):
    """Test Allow Any APIs"""

    @classmethod
    def setUpClass(cls):
        """Create user here."""
        super().setUpClass()
        cls.user = User.objects.create_user(username="tester", password="foo")

    @classmethod
    def tearDownClass(cls):
        """Destroy the user."""
        cls.user.delete()
        super().tearDownClass()

    def test_login_api(self):
        """Test the login API and see if we can get the token."""
        name = ":".join([AccountConfig.name, "login"])
        url = reverse(name)
        response = self.client.post(url, {"username": "tester", "password": "foo"})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestIsAuthenticatedAPI(test.APITestCase):
    """Test Is Authenticated API"""

    @classmethod
    def setUpClass(cls):
        """Create user here."""
        super().setUpClass()
        cls.user = User.objects.create_user(username="tester", password="foo")
        cls.token = Token.objects.create(user=cls.user)

    @classmethod
    def tearDownClass(cls):
        """Destroy the user."""
        cls.token.delete()
        cls.user.delete()
        super().tearDownClass()

    def setUp(self):
        """Add token to headers."""
        super().setUp()
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_detail_api(self):
        """Get user detail."""
        name = ":".join([AccountConfig.name, "detail"])
        url = reverse(name)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_logout_api(self):
        """Logout user."""
        name = ":".join([AccountConfig.name, "logout"])
        url = reverse(name)
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
