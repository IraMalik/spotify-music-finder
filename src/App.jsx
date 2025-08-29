import './App.css'
import { FormControl, InputGroup, Container, Button, Row, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };
  
    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function search() {
    if (!searchInput.trim()) return;

    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
  
    // Get Artist
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        if (!data.artists.items.length) return null;
        return data.artists.items[0].id;
      });

    if (!artistID) {
      setAlbums([]);
      return;
    }

    // Get Artist Albums
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items);
      });
  }

  return (
    <>
    {/* App Heading */}
    <Container className="text-center mt-4 mb-4">
      <h1 style={{
        fontWeight: "bold",
        fontSize: "2.5rem",
        color: "#1DB954", // Spotify green
        letterSpacing: "1px",
      }}>
        🎵 Spotify Music Finder
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#B2BEB5" }}>
        Search for your favorite artists and explore their albums!
      </p>
    </Container>

    {/* Search Bar */}
    <Container>
      <InputGroup>
        <FormControl
          placeholder="Search for an Artist..."
          type="input"
          aria-label="Search for an Artist"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") search();
          }}
          style={{
            width: "300px", height: "35px", borderWidth: "0px", borderStyle: "solid", borderRadius: "5px", marginRight: "10px", paddingLeft: "10px",
          }}
        />
        <Button 
          onClick={search} 
          style={{
            backgroundColor: "#1DB954",
            height: "35px",
            borderWidth: "0px",
            borderRadius: "5px",
            padding: "5px",
            fontSize: "14px"
          }}>
          Search
        </Button>
      </InputGroup>
    </Container>

    {/* Album Cards */}
    <Container>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
        }} 
      >
        {albums.map((album) => (
          <Card
            key={album.id}
            style={{
              backgroundColor: "white",
              margin: "15px",
              borderRadius: "10px",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
              width: "240px",
              transition: "transform 0.2s ease-in-out",
            }}
            className="hover-card"
          >
            <Card.Img
              variant="top"
              src={album.images[0]?.url}
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                height: "240px",
                objectFit: "cover",
              }}
            />
            <Card.Body style={{ textAlign: "center" }}>
              <Card.Title
                style={{
                  fontWeight: "bold",
                  fontSize: "17px",
            marginBottom: "10px",
            color: "#111",
            whiteSpace: "normal",   // allows wrapping
            overflow: "visible",    // prevents clipping
            wordWrap: "break-word", // breaks long words
            minHeight: "50px",      // keeps card heights consistent
                }}
              >
                {album.name}
              </Card.Title>

              <Card.Text style={{ fontSize: "14px", color: "#555" }}>
                Release Date: {album.release_date}
              </Card.Text>

              <Button
                href={album.external_urls.spotify}
                target="_blank"
                style={{
                  backgroundColor: "#1DB954",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "14px",
                  border: "none",
                  borderRadius: "6px",
                  padding: "8px 15px",
                }}
              >
                Open in Spotify
              </Button>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
    </>
  )
}

export default App;
