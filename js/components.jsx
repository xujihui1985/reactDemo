var app = app || {};

app.components = app.components || {};

(function() {
   'use strict';

   app.retrieveData = function() {
      return [
         {val: 'hello', completed: true},
         {val: 'world', completed: false}
      ]
   };

   var TodoApp = app.components.TodoApp = React.createClass({

      getInitialState: function() {
         return {
            todos: [],
            username: ''
         };
      },
       componentDidMount: function() {
           var data = app.retrieveData();
           var self = this;
           this.setState({todos: data});
           this.setState({username: 'sean'});
           //this.forceUpdate(function() {
           //   console.log(self.state);
           //});
       },
      componentWillMount: function() {

      },
       updateVal: function(val, index) {
           var state = this.state;
           state.todos[index].val = val;
           this.setState(state);
       },
       updateStatus: function(index) {
           var state = this.state;
           state.todos[index].completed = !state.todos[index].completed;
           this.setState(state);
       },
       deleteTodo: function(index) {
           var state = this.state;
           state.todos.splice(index, 1);
           this.setState(state);
       },
       createNewTodo: function(newValue) {
           var state = this.state;
           state.todos.unshift({val:newValue, completed:false});
           this.setState(state);
       },
      render: function() {
         return (
             <div className="outer-container">
                {this.state.username}
                <NewTodo
                    createNewTodo={this.createNewTodo}
                />
                <TodoList
                    todos={this.state.todos}
                    updateVal={this.updateVal}
                    updateStatus={this.updateStatus}
                    deleteTodo={this.deleteTodo}

                />
             </div>
            //<div></div>  we cannot create two root element in one component, there can only be one root element
         );
      }
   });


   var NewTodo = app.components.NewTodo = React.createClass({

       mixins:[React.addons.LinkedStateMixin],

       getInitialState: function() {
           return {
               newValue: ''
           };
       },
       createNew: function() {
           //var newTodoDom = React.findDOMNode(this.refs.newTodo);
           // same as this.refs.newTodo.getDOMNode().value
           //this.props.createNewTodo(newTodoDom.value);
           this.setState({newValue: ''});
           this.props.createNewTodo(this.state.newValue);
           //newTodoDom.value = '';
           //newTodoDom.focus();
       },
      render: function() {
          // <input ref="newTodo" type="text" />
          // act like two way binding, this link the state with the virtual dom
         return (
             <div>
                <h1>New Todo</h1>
                 <input valueLink={this.linkState('newValue')} placeholder="New Todo" type="text" />
                <button
                    className="new-todo"
                    onClick={this.createNew}>New</button>
             </div>
         );
      }
   });

   var TodoList = app.components.TodoList = React.createClass({

      render: function() {
         return (
             <div className="todos">
                <h1>Todo List</h1>
             {this.props.todos.map(function(el, index) {
                return (
                    <TodoItem
                        todo={el}
                        index={index}
                        updateVal={this.props.updateVal} //this here by default refer to the element, so we need to bind this to this element
                        updateStatus={this.props.updateStatus} //this here by default refer to the element, so we need to bind this to this element
                        deleteTodo={this.props.deleteTodo}
                        dangerous="<strong>HELLO</strong>"
                    />
                );
             }.bind(this))}
             </div>
         );
      }
   });

   var TodoItem = app.components.TodoItem = React.createClass({

       _onChecked: function() {
           this.props.updateStatus(this.props.index);
       },
       _onTextChanged: function(e) {
           this.props.updateVal(e.target.value, this.props.index);
       },
       _onDelete: function() {
           this.props.deleteTodo(this.props.index);
       },
      render: function() {
         var inputClassName = "form-control";
         if(this.props.todo.completed) {
            inputClassName += " finished";
         }

         //to unescaping the content use dangerouslySetInnerHTML with double {{}}
         return (
             <div className="input-group input-group-lg">
                 <p dangerouslySetInnerHTML={{__html: this.props.dangerous}}></p>
                 <span
                     style={{backgroundColor: 'red'}}
                     className="input-group-addon">
                    <input
                        checked={this.props.todo.completed}
                        type="checkbox"
                        onChange={this._onChecked}
                    />
                 </span>
                 <input
                     type="text"
                     value={this.props.todo.val}
                     className={inputClassName}
                     onChange={this._onTextChanged}
                 />
                 <span className="input-group-btn">
                     <button
                         onClick={this._onDelete}
                         className="btn btn-danger">
                         <i className="glyphicon glyphicon-remove"></i>
                         delete
                     </button>
                 </span>
             </div>
         );
      }
   });

}());