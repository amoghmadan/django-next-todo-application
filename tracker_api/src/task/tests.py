from django.contrib.auth import get_user_model
from django.urls import reverse
from rest_framework import status, test
from rest_framework.authtoken.models import Token

from task.apps import TaskConfig
from task.models import Item

User = get_user_model()


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
        """Add token to client."""
        super().setUp()
        self.client.credentials(HTTP_AUTHORIZATION="Token " + self.token.key)

    def test_item_list_api(self):
        """List all Items."""
        name = ":".join([TaskConfig.name, "item-list"])
        url = reverse(name)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_item_create_api(self):
        """Create new Item."""
        name = ":".join([TaskConfig.name, "item-list"])
        url = reverse(name)
        payload = {"text": "Test create"}
        response = self.client.post(url, payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_item_retrieve_api(self):
        """Retrieve Item by ID."""
        item = Item.objects.create(text="Test retrieve", user=self.user)
        name = ":".join([TaskConfig.name, "item-detail"])
        url = reverse(name, args=[item.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_item_update_api(self):
        """Update Item by ID."""
        item = Item.objects.create(text="Test update", user=self.user)
        name = ":".join([TaskConfig.name, "item-detail"])
        url = reverse(name, args=[item.id])
        payload = {"text": "Test update"}
        response = self.client.put(url, payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_item_partial_update_api(self):
        """Partial Update Item by ID."""
        item = Item.objects.create(text="Test partial update", user=self.user)
        name = ":".join([TaskConfig.name, "item-detail"])
        url = reverse(name, args=[item.id])
        payload = {"status": Item.Status.DONE}
        response = self.client.patch(url, payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_item_destroy_api(self):
        """Partial Update Item by ID."""
        item = Item.objects.create(text="Test destroy", user=self.user)
        name = ":".join([TaskConfig.name, "item-detail"])
        url = reverse(name, args=[item.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
