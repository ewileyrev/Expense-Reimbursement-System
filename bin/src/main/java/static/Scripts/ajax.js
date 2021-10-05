/*
    We will be using AJAX to make asynchronous HTTP requests for resources that we have exposed. For instance, one resource that I have exposed is an endpoint for grabbing all of the existing recipes in my DB. I want to have access to that data on the frontend so that I can display this information for my end users.
*/

function getAllRecipes(){
    let url = 'http://localhost:8000/recipe/all';

    // Using the ready states of an XMLHttpRequest can guide your AJAX workflow.
    let xhr = new XMLHttpRequest(); //readyState is 0


    //While the readyState is 3 or 4, we're just waiting around for the response. As such, we need to determine what will happen when we do receive a response.

    /*
        Each time the readyState changes, this callback we define will be invoked.
    */
    xhr.onreadystatechange = function(){
        // If the readyState is 4 and the HTTP status code is 200, I have access to the data I requested when I sent the HTTP request.
        if(xhr.readyState === 4 && xhr.status === 200){
            // My first order of business is to access the data itself. Note that the data comes to us as JSON but that we want to be able to use the data as a JavaScript object.
            let recipes = JSON.parse(xhr.response);

            console.log(recipes);
            
            /*
                We need to iterate over this array of recipe objects in order to make a div for each recipe. We can use a for loop to accomplish this.

                Here we have used an enhanced for loop syntax. Please note that you can also us the "in" keyword in a JS loop, but that "in" is used to iterate over the properties of an object.
            */

            for(let recipe of recipes){
                // The first step is to decide where you want to add a new element. In our case, we want to add a new recipe_div to the element which has the id "recipe_container". That means that we want to isolate the recipe_container div.

            let recipe_container = document.getElementById('recipe_container');

            // In order to add a new recipe_div to the DOM, we have to create it. Fortunately, there is a JS function which allows us to create a new element. You just pass in the name of the element that you'd like to create:

            let new_div = document.createElement('div');
            new_div.className = "recipe_div";

            // Unfortunately, you are going to have to set the content for h3, p and of course the needed attributes for elements that require them (e.g. img have "src" attributes).

            // Since the innerText and src should be dynamically provided by the user, we are going to refactor this code to pull that information from the input boxes the users put this information inside of. In order to do that, we have to isolate/grab the input boxes in order to grab the data that has been entered.

            let new_h3 = document.createElement('h3');
            new_h3.innerText = recipe.recipe_name;

            let new_para = document.createElement('p');
            new_para.innerText = recipe.recipe_description;

            let new_img = document.createElement('img');
            new_img.src = recipe.image_url;

            let new_list = document.createElement('ol');

            let new_list_item = document.createElement('li');
            new_list_item.innerText = recipe.recipe_step;

            // Note that you need to create relationships between the elements that you've created. In other words, you need to specify, for instance, that the new_list_item is a child element of the new_list.

            new_list.appendChild(new_list_item);

            // We should also specify that the h3, p, img, and ol are children of the new div we're creating:

            new_div.appendChild(new_h3);
            new_div.appendChild(new_para);
            new_div.appendChild(new_img);
            new_div.appendChild(new_list);

            // Now that we've created that div and all of its child elements, let's FINALLY append the new div we've created to the existing recipe_container on our web page.

            recipe_container.appendChild(new_div);
            }


        }
    }

    // Now let's open our HTTP request. We need to specify an HTTP verb and the URL.
    xhr.open('GET', url); //readyState is 1

    // Now let's send our HTTP request.
    xhr.send(); //readyState is 2
}

// Any function you call here is going to be invoked as soon as the window loads.
window.onload = function(){
    this.getAllRecipes();
}