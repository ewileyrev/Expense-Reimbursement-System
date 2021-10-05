/*
    As a general note, I have not used semi-colons as they are optional in JS. That said, it is good practice to use the readability as they increase readability.

    The general steps for DOM (Document Object Model) manipulation are as follows:

    1. Determine which element we would like to manipulate.
    2. Find a way (e.g. ID, classname, CSS selector) to isolate/select that element using JS.
    3. Once you've isolated the element, decide which properties need to be changed.
*/

// Isolation (finding an element by its ID). Also note that I'm using "let" to declare variables as it's good practice.
let cheesecakeDiv = document.getElementById('cheesecake_div')

// Modify the element's properties as you please! Note that this is not limited to style properties. You can modify any element attributes.
cheesecakeDiv.style.backgroundColor='purple';

/*
    Note that this example isn't exactly dynamic. It does, after all, showcase the color of the element's background changing in response to a user interaction. Ideally, we could make this happen in response to a user's actions on our frontend. That said, let's make it a little more dynamic.

    That said, let's turn the above process into a JS function:
*/

//If you want to swap between colors on mouseover...
let isColorChanged = false

function changeCheesecakeDiv(){
    if(!isColorChanged){
        cheesecakeDiv.style.backgroundColor='green';
    }else{
        cheesecakeDiv.style.backgroundColor='pink';
    }

    isColorChanged = !isColorChanged;
}

/*
    The above steps (1 - 3) are still relevant, but we now have other things to consider. We have to decide when we will change the color of the div's background. In other words, what is the user interaction that we want to respond to? A common event that we respond to is a user click for instance. As such, let's say that when our user clicks the div itself, the background of the div will be modified.

    We can do so by adding an "event listener". There is a nifty function which allows us to easily do this. An event listener "listens" for an event on the frontend and invokes a function (defined by you) in response to that event. The function that is invoked is called a "callback function".
*/

// We add the event listener to the element we expect the user to interact with. In order to do so, we need to locate the div on the DOM.

cheesecakeDiv.addEventListener('mouseenter', changeCheesecakeDiv);

// If you later wish to remove an event listener: COMMENTED OUT BECAUSE I DON'T ACTUALLY WANT TO REMOVE MY EVENT LISTENER
// cheesecakeDiv.removeEventListener('mouseenter', changeCheesecakeDiv);

/*
    We are now going to add event listeners to the steak_div and the h3 contained within the steak_div. The purpose is to highlight the order in which events are dispatched in JS.
*/

// Grab the steak_div element.
let steak_div = document.getElementById('steak_div');

// Add an event listener to the steak_div.
steak_div.addEventListener('click', () => {
    /*
        I don't actually recommend using window.alert() as it does not create a good user experience.

        Please note that the boolean flag that we passed in as the third argument allows us to use capturing rather than bubbling.
    */
    window.alert("You've won a free iPhone by clicking on the div.");
}, true)

// Grab the h3 that is inside of the steak_div. Note that I'm using a CSS selector because I didn't create an ID for the h3 and don't just want all getElementById examples here as it's not practical.

let steak_div_h3 = document.querySelector('#steak_div > h3');

//Add event listener to the h3 inside of the steak_div.
steak_div_h3.addEventListener('click', () => {
    window.alert("You've won a free iPhone by clicking on the h3.");
})

/*
    You should notice that the event on the h3 inside of the div is dispatched first followed by the event on the div itself. This is the default order in which events are dispatched (innermost to outermost). This is called "bubbling".

    Note that there is a way to change this order. Instead of "bubbling", you would use "capturing".
*/

/*
    We can also add elements to the DOM dynamically using JS.

    We'll start by simply adding a new recipe_div to our web page. We'll allow the user to enter some recipe information in the form we have on the page and once they submit the information, it will be displayed in a new recipe_div.
*/

function addNewRecipe(){
    // The first step is to decide where you want to add a new element. In our case, we want to add a new recipe_div to the element which has the id "recipe_container". That means that we want to isolate the recipe_container div.

    let recipe_container = document.getElementById('recipe_container');

    // In order to add a new recipe_div to the DOM, we have to create it. Fortunately, there is a JS function which allows us to create a new element. You just pass in the name of the element that you'd like to create:

    let new_div = document.createElement('div');
    new_div.className = "recipe_div";

    // Unfortunately, you are going to have to set the content for h3, p and of course the needed attributes for elements that require them (e.g. img have "src" attributes).

    // Since the innerText and src should be dynamically provided by the user, we are going to refactor this code to pull that information from the input boxes the users put this information inside of. In order to do that, we have to isolate/grab the input boxes in order to grab the data that has been entered.

    let input_boxes = document.getElementsByTagName('input');

    let new_h3 = document.createElement('h3');
    new_h3.innerText = input_boxes[0].value;

    let new_para = document.createElement('p');
    new_para.innerText = input_boxes[1].value;

    let new_img = document.createElement('img');
    new_img.src = input_boxes[2].value;

    let new_list = document.createElement('ol');

    let new_list_item = document.createElement('li');
    new_list_item.innerText = input_boxes[3].value;

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

/*
    The above example, though it does create a new element and add it to the DOM, it does not do so in response to a user event. As such, we will be creating an event listener to handle this. 

    That said, the default behavior of the "Submit Recipe" button on our form currently refreshes the page; I don't want this behavior, so I'll show you how to disable that behavior.
*/

// In order to prevent the default behavior that occurs when we click a button, we can do the following:

// We should first isolate the button (which is actually an "input" element) first as we can't disable default behavior on the button without doing this.

let submit_button = document.querySelector('[type=submit]');

// Now that I've isolated the input element, I want to add an event listener in order to prevent the default behavior that occurs when the button is clicked:

submit_button.addEventListener('click', (event) => {
    //Technically speaking, we should check that the event is cancelable before we prevent the default behavior:
    if(event.cancelable){
        event.preventDefault();
    }

    // Now let's add our own behavior to the button click. In other words, what should happen when the button is clicked?
    addNewRecipe();
})
