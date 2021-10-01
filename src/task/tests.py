####################
# Standard Imports #
####################

########################
# Non-Standard Imports #
########################
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import resolve, reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

#########################
# Project Level Imports #
#########################
from task.models import Item

User = get_user_model()

USER_NAME = {"first_name": "User", "last_name": "Test"}
USER_CRED = {"email": "user@test.com", "password": "#1Tester"}


class TestTemplate(TestCase):
    """Test 'dashboard' template"""

    def test_dashboard(self):
        """Test the template mapping"""

        self.assertEqual(resolve(reverse("dashboard")).view_name, "dashboard")


class TestItemViewSet(APITestCase):
    """Test Item View Set"""

    item_list = reverse("item-list")

    def setUp(self):
        """Set-up common things"""

        email = USER_CRED.get("email")
        password = USER_CRED.get("password")
        self.user = User.objects.create_user(email, email, password, **USER_NAME)
        token, _ = Token.objects.get_or_create(user=self.user)
        item = Item.objects.create(user=self.user, description="Test Set Up")
        self.client.credentials(HTTP_AUTHORIZATION="Token " + token.key)
        self.item_detail = reverse("item-detail", args=[item.pk])

    def tearDown(self):
        """Delete user from DB"""

        self.user.delete()

    def test_list(self):
        """Test list API"""

        response = self.client.get(self.item_list)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create(self):
        """Test create API"""

        payload = {"description": "Item Create"}
        response = self.client.post(self.item_list, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve(self):
        """Test retrieve API"""

        response = self.client.get(self.item_detail)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update(self):
        """Test update API"""

        payload = {"description": "Item Update", "status": Item.Status.DONE}
        response = self.client.put(self.item_detail, payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_partial_update(self):
        """Test partial update API"""

        payload = {"status": Item.Status.DONE}
        response = self.client.patch(self.item_detail, payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_destroy(self):
        """Test destroy API"""

        response = self.client.delete(self.item_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
