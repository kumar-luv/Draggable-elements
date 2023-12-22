## GitHub Repository

Find the repository for this project at [Repository Name](https://github.com/your-username/your-repo-name)

## Live Demo

Check out the live demo [here](https://your-live-demo-link.com)


## Instructions to run the code

- clone this repository.
- Open folder and do `npm install` to install all the necessary dependencies
- Do `npm start`  inside project directory to start the application. The application will start on [http://localhost:3000](http://localhost:3000)


## Layout of the application
The application is using flexbox as its layout. Board component has a position of relative this is because items which will be rendered on board and they will be positioned relative to the board.


## Sidebar.js

- Sidebar Component contains a list of items that are rendered. 
- Each item has draggable property set on it. 
- When dragging is started to drag start event and we attach the inner text of dragged element as data onto this event. 
`e.dataTransfer.setData("text/plain",e.target.lastChild.innerText)`
- In this way we understand which component was dragged onto the canvas.

## Board.js

`State`
- elementsOnCanvas - is an array of element objects which will be rendered on board
- isModalOpen - to identify whether modal is opened or closed
- modalProps - properties to pass inside modal
- selectedElement - to signify which component is currently selected.

## Element.js

This is a dynamic component which takes couple of props.
`Props`
- eleType - identifies what component to be rendered
- x - initial X value
- y - initial Y value
- fontWeight, fontSize are self explanatory

`State`
- initialX, initialY - where user clicked for first time to initiate mouse move event
- offsetX, offsetY - when mouse up occurs the final position of the element
- currentX, currentY - when mouse move happens currentX and currentY change

The component has `onFocus` (sets selectedElement state to id of component in board Component) and `onBlur` (sets selectedElement to null ) event which signifies if the element is selected or not.

The component is positioned using 
`transform: translate3d(currentX,currentY,0)` CSS rule.


### When Item is dropped on Canvas for first time
- When items from sidebar are dropped onto board Component, `handleOnDrop` function invokes,  we retrieve the type of element that was dropped on Canvas 
`const elType = e.dataTransfer.getData('text/plain').toLowerCase()`
We then open the modal by passing it initial props i.e element Type and also x and y coordinates where the drop event had occurred.
- When we submit Modal closeModal function is invoked it checks if item that we adding to Board is already present or not if present then update the details if not then add it in elementOnBoard

### When Modal is closed
When modal is closed we check the object returned by modal if it has an id of undefined that means component is rendered for first time so an id is given and element is added to `elementsOnBoard` array. Else we update only the component that was changed.


## Modal.js
When modal is opened for the first time it is populated with x and y coordinates where drop event had occurred. 
Here user can change fontweight and fontsize and add text.
When modal is closed it constructs a object and it is returned to Board component