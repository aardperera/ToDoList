             //Model
            //contains all the code that saves and manages data
            
            let todos;
            //retrieve saved data
            const savedTodos = JSON.parse(localStorage.getItem('todos'));
            
            if (Array.isArray(savedTodos)){

                todos = savedTodos;
            
            }else{
            
                todos = [{            //create objects using {} which group different values that related
                    title:'Get Groceries',
                    dueDate:'2023-04-01',
                    id:'id1'
                },{
                    title:'Wash Car',
                    dueDate:'2023-04-02',
                    id:'id2'
                },{
                    title:'Make Dinner',
                    dueDate:'2023-04-05',
                    id:'id3'
                },{
                    title:'Do laundry',
                    dueDate:'2023-04-04',
                    id:'id4'
                }];
            
            }

            render();
            //creates a todo
            
            function createTodo(title, dueDate){
                const id = ''+ new Date().getTime();

                todos.push({
                    title: title,
                    dueDate: dueDate,
                    id: id
                });

                saveTodos();
            }
            
            //deletes a todo

            function removeTodo(idToDelete){
                todos = todos.filter(function(todo){
                    if(todo.id === idToDelete){
                        return false;
                    }else{
                        return true;
                    }
                });

                saveTodos();
            }

            //save todos

            function saveTodos(){
                localStorage.setItem('todos',JSON.stringify(todos));
            }

            //controller
            //Connects model and view together.
            //1. Responds to events from the view.
            //2. Tells the model to update its data
            function addTodo(){

                const textbox = document.getElementById("todo-title");
                const title = textbox.value;

                const datePicker = document.getElementById("date-picker");
                const dueDate = datePicker.value;

                createTodo(title,dueDate);
                render();
            }
           

            function deleteTodo(event){
                const deleteButton = event.target;
                const idToDelete = deleteButton.id;

                removeTodo(idToDelete);                
                render();
            }

            //view
            //Contains all the code that manages visuals. Renders visuals using data in the model. 
            function render(){

                document.getElementById('todo-list').innerHTML = ''; // reset the list
                
                todos.forEach(function(todo){
                    const element = document.createElement('div');
                    element.innerText = todo.title + ' ' + todo.dueDate;

                    const deleteButton = document.createElement('button');
                    deleteButton.innerText = 'Delete';
                    deleteButton.style = 'margin-left: 12px;';
                    deleteButton.onclick = deleteTodo;
                    deleteButton.id = todo.id;
                    element.appendChild(deleteButton);

                    const todoList = document.getElementById('todo-list');
                    todoList.appendChild(element);
                });

            }
            
            //MVC allows each section to do only one thing.