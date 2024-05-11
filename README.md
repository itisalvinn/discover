# Discover

A Web app created with **React** and **TypeScript**, retrieving data through Spotify's Web API. 

## Getting Started

### 0. Prerequisites : 

To run on local, add `.env` variables with ``REACT_APP_SPOTIFY_CLIENT_ID`` and ``REACT_APP_SPOTIFY_REDIRECT_URI``

Specific steps to set up your environment variables can be found on Spotify's [documentation page](https://developer.spotify.com/documentation/web-api). \
The access token can be found on your [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). 

### 1. App Start : 

```
git clone https://github.com/itisalvinn/discover.git
cd discover
npm install
npm start
```

### 2. Clean Start :

There may be some errors regarding incompatible libraries, please clean up node_modules and try a fresh start. 

```
cd discover
rm -rf node_modules package-lock.json && npm install && npm start
```


*Note:* This is a WIP!
