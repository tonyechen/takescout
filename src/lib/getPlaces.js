export default async function getPlaces(place) {
    return await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&apiKey=${process.env.REACT_APP_GEOAPIFY_API_KEY}`,
        { method: 'GET' }
    )
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data.features;
        })
        .catch((err) => console.log(err));
}
