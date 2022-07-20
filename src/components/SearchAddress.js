import React, { useState } from 'react';
import getPlaces from '../lib/getPlaces';
import { debounce } from 'lodash';

const SearchAddress = () => {
    const [displaySuggestion, setDisplaySuggestion] = useState(false);
    const [placeSuggestions, setPlaceSuggestions] = useState(null);

    const handleAddress = (e, place) => {
        setDisplaySuggestion(false);

        let search_address = document.getElementById('search_address');
        search_address.value =
            place.properties.address_line1 +
            ' ' +
            place.properties.address_line2;
    };

    const suggestPlaces = debounce(async () => {
        let place = document.getElementById('search_address').value;

        const suggestions = await getPlaces(place);
        setPlaceSuggestions(suggestions);

        console.log(suggestions);
    }, 500);

    return (
        <div className="relative">
            <input
                type="text"
                id="search_address"
                placeholder="&#128269;Search For Address..."
                onChange={suggestPlaces}
                onFocus={() => {
                    setDisplaySuggestion(true);
                }}
                className="w-[100%]"
            />
            <div
                id="address_suggestion"
                className="absolute bg-white shadow w-[100%] "
            >
                {displaySuggestion &&
                    (placeSuggestions && placeSuggestions.length ? (
                        placeSuggestions.map((place, i) => {
                            return (
                                <div
                                    key={i}
                                    className="hover:bg-slate-300 cursor-pointer border border-y-grey px-2 py-1"
                                    onClick={(e) => handleAddress(e, place)}
                                >
                                    {place.properties.address_line1 +
                                        ' ' +
                                        place.properties.address_line2}
                                </div>
                            );
                        })
                    ) : (
                        <div>No Results Found</div>
                    ))}
            </div>
        </div>
    );
};

export default SearchAddress;
