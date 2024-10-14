const SECONDS_API = import.meta.env.VITE_API_URL;

// fetch all dish ratings
export async function fetchAllDishRatingsByDishId(dish_id) {
  try {
    const res = await fetch(`${SECONDS_API}/dishes/${dish_id}/ratings`);
    const ratings = await res.json();
    return ratings;
  } catch (error) {
    throw error;
  }
}

// fetch dish rating by user id
export async function fetchDishRatingByUserId(dish_id, user_id) {
  try {
    const res = await fetch(`${SECONDS_API}/dishes/${dish_id}/ratings/user_rating?user_id=${user_id}`);
    const rating = await res.json();
    return rating;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

// update dish rating by user id
export async function updateDishRatingByUserId(dish_id, user_id, rating, comment) {
  console.log("update args", dish_id, user_id, rating, comment)
  try {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, rating, comment })
    };
    const res = await fetch(`${SECONDS_API}/dishes/${dish_id}/ratings/user_rating`, options);
    const ratings = await res.json();
    return ratings;
  } catch (error) {
    throw error;
  }
}

// create dish rating
export async function createDishRating(dish_id, user_id, rating, comment) {
  console.log("create args", dish_id, user_id, rating, comment)
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id, rating, comment })
    };
    const res = await fetch(`${SECONDS_API}/dishes/${dish_id}/ratings`, options);
    const ratings = await res.json();
    return ratings;
  } catch (error) {
    throw error;
  }
}


// export async function fetchAllShoes() {
// 	try {
// 		const res = await fetch(NIKEDAS_API);
// 		const shoes = await res.json();
// 		return shoes;
// 	} catch (error) {
// 		throw error;
// 	}
// }

// export async function fetchShoeById(id) {
// 	try {
// 		const res = await fetch(`${NIKEDAS_API}/${id}`);
// 		const shoe = await res.json();
// 		return shoe;
// 	} catch (error) {
// 		throw error;
// 	}
// }

// export async function deleteListing(id) {
// 	try {
// 		const res = await fetch(`${NIKEDAS_API}/${id}`, {
// 			method: "DELETE",
// 		});
// 		if (!res.ok) {
// 			throw new Error(`Failed to delete listing with status: ${res.status}`);
// 		}
// 		const shoe = await res.json();
// 		return shoe;
// 	} catch (error) {
// 		throw error;
// 	}
// }
// export async function createShoe(listing) {
// 	try {
// 		const options = {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(listing),
// 		};

// 		const res = await fetch(`${NIKEDAS_API}`, options);
// 		const shoe = await res.json();
// 		return shoe;
// 	} catch (error) {
// 		throw error;
// 	}
// }

// export async function updateShoe(id, listing) {
// 	try {
// 		const options = {
// 			method: "PUT",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify(listing),
// 		};

// 		const res = await fetch(`${NIKEDAS_API}/${id}`, options);
// 		const shoe = await res.json();
// 		return shoe;
// 	} catch (error) {
// 		throw error;
// 	}
// }

// export async function fetchShoesBySellerId(id) {
//   try {
//     const res = await fetch(`${NIKEDAS_API}/seller/${id}`)
//     const sellerShoes = await res.json();
//     return sellerShoes;
//   } catch(error) {
//       throw error;
//   }
// }
