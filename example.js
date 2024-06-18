// Function to fetch all users from the API
async function getAllUsers() {
    try {
        const response = await fetch('http://r640.concor.me:33065/api/users');
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Print the results to the console
        console.log('Fetched User:', data);
    } catch (error) {
        // Print any errors to the console
        console.error('Error fetching users:', error);
    }
}


async function getUserById(id) {
    try {
        const response = await fetch('http://r640.concor.me:33065/api/user/' + id);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Print the results to the console
        console.log('Fetched User:', data);
    } catch (error) {
        // Print any errors to the console
        console.error('Error fetching users:', error);
    }
}


async function getUserRolById(id) {
    try {
        const response = await fetch('http://r640.concor.me:33065/api/user/rol' + id);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Print the results to the console
        console.log('Fetched User:', data);
    } catch (error) {
        // Print any errors to the console
        console.error('Error fetching users:', error);
    }
}

async function getUserPasswordById(id) {
    try {
        const response = await fetch('http://r640.concor.me:33065/api/user/password/' + id);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Print the results to the console
        console.log('Fetched User:', data);
    } catch (error) {
        // Print any errors to the console
        console.error('Error fetching users:', error);
    }
}