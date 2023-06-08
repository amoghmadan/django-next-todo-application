# Tracker Web UI

The UI development setup.

## Technology

- Node
- Next

## Prerequisites

You need Node and npm installed.

## How to?

### Setup?

Steps to setup.

```bash
cd tracker_webui
npm ci --location=project
```

### Run?

Steps to run.

```bash
npm run dev
```

## Environment Setup

Creating a .env.local with the following varibales should help run it quickly.

```env
NEXT_PUBLIC_ROOT_URL=http://127.0.0.1:8000/
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/v1/
NEXT_PUBLIC_DEBUG=true
```

**Note**: -

```
In production you can use the IP or domain in the urls and set NEXT_PUBLIC_DEBUG=false. Instead of http://127.0.0.1:8000 use https://<YOUR_IP_OR_DOMAIN>.
```

## CORS Problem?

Start Browser without CORS (in development).

Chrome: -

```bash
chrome.exe --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
```
