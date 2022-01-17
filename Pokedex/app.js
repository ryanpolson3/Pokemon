const fetchPokemon = () => {
   
    for (let i = 1; i <= 150; i++) {

        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;

        // Fetches data from server
        fetch(url) 
            .then( res => {
                // Returns the json file with the data
                return res.json(); 
            })
            .then( data => {
                // Consols the data in the browser
                console.log(data);
                // Creates an object 
                const pokemon = {
                    name: data.name,
                    id: data.id,
                    image: data.sprites['front_default'],
                    type: data.types.map((type) => type.type.name).join(', ')
                }; 
                // Grabs pokemon name
                // pokemon['name'] = data.name 
                // Grabs pokemon id
                // pokemon['id'] = data.id; 
                // Grabs pokemon image
                // pokemon['image'] = data.sprites['front_default']; 
                // Grabs pokemon types
                // pokemon['type'] = data.types 
                //     Maps types down to individual type names
                //     .map((type) => type.type.name) 
                //     .join(', '); 

                console.log(pokemon); 
             });
    }
};

fetchPokemon();