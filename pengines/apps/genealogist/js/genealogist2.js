/* JavaScript for the Genealogist application */

var subjectObject = {
    "Front-end": {
      "HTML": ["Links", "Images", "Tables", "Lists"],
      "CSS": ["Borders", "Margins", "Backgrounds", "Float"],
      "JavaScript": ["Variables", "Operators", "Functions", "Conditions"]
    },
    "Back-end": {
      "PHP": ["Variables", "Strings", "Arrays"],
      "SQL": ["SELECT", "UPDATE", "DELETE"]
    },
  }

  window.onload = function() {
    var subjectSel = document.getElementById("starter");
    var topicSel = document.getElementById("sex");
    var chapterSel = document.getElementById("offspring");

    for (var x in subjectObject) {
      subjectSel.options[subjectSel.options.length] = new Option(x, x);
    }

    subjectSel.onchange = function() {
      //empty Chapters- and Topics- dropdowns
      chapterSel.length = 1;
      topicSel.length = 1;
      //display correct values
      for (var y in subjectObject[this.value]) {
        topicSel.options[topicSel.options.length] = new Option(y, y);
      }
    }
    topicSel.onchange = function() {
      //empty Chapters dropdown
      chapterSel.length = 1;
      //display correct values
      var z = subjectObject[subjectSel.value][this.value];
      for (var i = 0; i < z.length; i++) {
        chapterSel.options[chapterSel.options.length] = new Option(z[i], z[i]);
      }
    }
  }
  
var pengine;

function ask() {
    var query = $("#query").val();
    if (query) {
        pengine = new Pengine({
            application: 'genealogist',
            ask: query,
            onsuccess: function() {
                writeln(JSON.stringify(this.data));
                if (this.more) {
                    disableButtons(true, false, false, false);
                } else {
                    writeln("No more solutions");
                    disableButtons(false, true, true, true);                        
                }
            },
            onfailure: function() {
                writeln("Failure");
                disableButtons(false, true, true, true);
            },
            onstop: function() {
                writeln("Stopped");
                disableButtons(false, true, true, true);
            },
            onabort: function() {
                writeln("Aborted");
                disableButtons(false, true, true, true);
            },
            onerror: function() {
                writeln("Error: " + this.data);
                disableButtons(false, true, true, true);
            }
        });
    }
}

function dropdownOne() {
    var query = "ancestor_descendant(X, Y)";
    var queryResult = {}
    if (query) {
        pengine = new Pengine({
            application: 'genealogist',
            ask: query,
        onsuccess: function() {
          document.write((JSON.stringify(this.data)));
        }   
    })
    }
}