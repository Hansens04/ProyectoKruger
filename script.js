// script.js
document.addEventListener('DOMContentLoaded', function() {
    const listingGrid = document.querySelector('.listing-grid');
  
    // Simulate fetching data from an API
    const listings = [
      {
        id: 1,
        title: 'Cozy Apartment in the Heart of the City',
        image: 'listing1.jpg',
        description: 'Experience the vibrant city life in this charming apartment.'
      },
      {
        id: 2,
        title: 'Beachfront Getaway with Stunning Views',
        image: 'listing2.jpg',
        description: 'Relax and unwind in this serene beach house.'
      },
      {
        id: 3,
        title: 'Rustic Cabin in the Woods',
        image: 'listing3.jpg',
        description: 'Escape the hustle and bustle in this secluded cabin.'
      },
      // Add more listings as needed
    ];
  
    listings.forEach(function(listing) {
      const listingItem = document.createElement('div');
      listingItem.classList.add('listing-item');
  
      const img = document.createElement('img');
      img.src = listing.image;
      img.alt = listing.title;
  
      const title = document.createElement('h3');
      title.textContent = listing.title;
  
      const description = document.createElement('p');
      description.textContent = listing.description;
  
      listingItem.appendChild(img);
      listingItem.appendChild(title);
      listingItem.appendChild(description);
  
      listingGrid.appendChild(listingItem);
    });
  });