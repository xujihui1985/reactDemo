var app = app || {};

(function() {
    'use strict';

    app.init = function() {
        var TodoApp = app.components.TodoApp;

        React.render(
            <TodoApp />,
            document.getElementById('app')
        );
    };

    app.init();

}());
