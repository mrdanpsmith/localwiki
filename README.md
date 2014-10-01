# localwiki #

## goal ##
The goal of this project is to allow someone to create a local documentation system without a server.  It is most useful inside of a [revision control system](http://en.wikipedia.org/wiki/Revision_control) and the files should be editable with a text editor due to the syntax.

## syntax ##
The wiki uses [markdown syntax](http://daringfireball.net/projects/markdown/syntax) and local AJAX calls in order to chain together a locally working, minimally invasive wiki system.

## configuration ##
In order to change the configuration for this wiki, take a look at the example <a class="do-not-override" href="config.js">config.js</a> file provided with the source.  If you want to store your configuration file outside of the localwiki home directory, simply make sure the file is loaded before the <a class="do-not-override" href="script/main.js">main.js</a> in the index.html.

## notes ##
### google chrome ###
Unforunately, Google Chrome does not by default allow local AJAX requests to take place from the filesystem.  This is an understandable security decision.  If you want to view pages stored on localwiki without using a server, launch Google Chrome using one of the launching scripts provided.  These scripts have been tested in Windows 7 and Ubuntu Linux.

### firefox ###
Firefox allows the above, but does not allow you to go higher in the filesystem than the current directory.  That means your wiki's base directory should be above the directory containing the index.html.

## links ##
1. [Github](https://github.com/mrdanpsmith/localwiki)
2. [MIT-Style License](LICENSE)