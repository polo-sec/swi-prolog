:- module(pengines_server,
      [ server/1            % ?Port
      ]).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_path)).
:- use_module(library(http/http_authenticate)).
:- use_module(library(http/http_server_files)).

/** <module> Pengines Web Server */



:- prolog_load_context(directory, Dir),
   asserta(user:file_search_path(app, Dir)).

user:file_search_path(www, app(www)).
user:file_search_path(apps, app(apps)).

http:location(apps, root(apps), []).

:- http_handler(apps(.), serve_files_in_directory(apps), [prefix]).
:- http_handler(root(.), serve_files_in_directory(www), [prefix]).

:- http_handler(root(admin),
		http_redirect(moved_temporary, root(admin/'server.html')), []).
:- http_handler(/,
		http_redirect(moved_temporary, root(apps/genealogist/'index.html')), []).



%%    server(?Port) is det.
%
%    Start the web-server on Port.

server(Port) :-
    http_server(http_dispatch,
		[ port(Port),
		  workers(16)
		]).
