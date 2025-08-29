# 🎵 Spotify Album Finder

A React application that lets you search for your favourite artists and explore their albums using the [Spotify Web API](https://developer.spotify.com/documentation/web-api/)

## 📹 Demo

[![Video Demo](spotifymusicfinder.mov)

## 🚀 Features

- Search for artists using the Spotify API  
- Display matching albums in real time with details like album cover, album name, release date and link to open in Spotify
- Clean UI built with React + Bootstrap  
- Dark theme with black background styling  

## ⚙️ Setup & Installation

1. Clone the Repository
```bash
git clone https://github.com/your-username/spotify-album-finder.git
cd spotify-album-finder
```

2. Install Dependencies
```bash
npm install
```
3. Create a Spotify App
- Go to the Spotify Developer Dashboard
- Click Create App
- Set a name (e.g., Album Finder) and description
- Add a redirect URI → http://127.0.0.1:8888/callback (⚠️ localhost is not allowed, use 127.0.0.1 or an explicit loopback address)

4. Add Environment Variables

- Create a .env file in the root of your project (make sure that .env is present in .gitignore so that your API keys are not public):
```python
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id_here
REACT_APP_SPOTIFY_CLIENT_SECRET=your_client_secret_here
```

5. Run the App
```bash
npm start
```
