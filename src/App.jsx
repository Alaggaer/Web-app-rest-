import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const App = () => {
  const [location, setLocation] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchRestaurants = async () => {
    setLoading(true);
    setError(null);
    setRestaurants([]);

    try {
      if (!location) {
        setError('Please enter a location.');
        setLoading(false);
        return;
      }

      const apiKey = ''; // Replace with your Google Places API key
      const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=1000&type=restaurant&key=${apiKey}`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.status === 'OK') {
        setRestaurants(data.results);
      } else {
        setError(`Error fetching restaurants: ${data.status}`);
      }
    } catch (err) {
      setError('Failed to fetch restaurants.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurant Finder</h1>
      <div className="flex space-x-2 mb-4">
        <TextField
          label="Enter Location (e.g., latitude,longitude or city name)"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button variant="contained" onClick={searchRestaurants} disabled={loading}>
          Search
        </Button>
      </div>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {loading ? (
        <div className="flex justify-center"><CircularProgress /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
          ))}
        </div>
      )}
    </div>
  );
};

const RestaurantCard = ({ restaurant }) => {
  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h5" component="div">
          {restaurant.name}
        </Typography>
        <Typography color="text.secondary">
          Rating: {restaurant.rating || 'No rating'}
        </Typography>
        <Typography color="text.secondary">
          Types: {restaurant.types?.join(', ') || 'No types'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default App;
```
  <boltAction type="start">
npm run dev
